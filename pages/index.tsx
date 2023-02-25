import type { GetStaticProps } from 'next';
import { ArticleList } from '../components/ArticleList';
import { CommonHead } from '../components/Head';
import { Layout } from '../components/Layout';
import { client } from '../libs/client';
import { Article, Category, PublishedAt } from '../types/common';
import { groupBy } from '../utils/groupByUtil';

type HomeProps = {
  articles: Array<Article>;
  categoryList: Array<Category>;
  publishedAt: Array<PublishedAt>;
};

export default function Home({ articles, categoryList, publishedAt }: HomeProps) {
  console.log(groupBy(publishedAt));
  return (
    <Layout
      articles={articles}
      categoryList={categoryList}
      publishedAt={publishedAt}
      title={'記事一覧'}>
      <CommonHead title="Pe.log" />
      <ArticleList articles={articles} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const data = await client.get({
    endpoint: 'blogs',
  });
  const categoryData = await client.get({ endpoint: 'categories' });
    const publishedAt = await client.get({
      endpoint: 'blogs',
      queries: { fields: ['id', 'publishedAt'] },
    });

  return {
    props: {
      articles: data.contents,
      categoryList: categoryData.contents,
      publishedAt: publishedAt.contents,
    },
  };
};

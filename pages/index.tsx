import type { GetStaticProps } from 'next';
import { ArticleList } from '../components/ArticleList';
import { CommonHead } from '../components/Head';
import { Layout } from '../components/Layout';
import { client } from '../libs/client';
import { Article, Category } from '../types/common';

type HomeProps = {
  articles: Array<Article>;
  categoryList: Array<Category>;
};

export default function Home({ articles, categoryList }: HomeProps) {
  return (
    <Layout articles={articles} categoryList={categoryList}>
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

  return {
    props: {
      articles: data.contents,
      categoryList: categoryData.contents,
    },
  };
};

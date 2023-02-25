import { GetStaticProps } from 'next';
import { ArticleList } from '../../components/ArticleList';
import { CommonHead } from '../../components/Head';
import { Layout } from '../../components/Layout';
import { client } from '../../libs/client';
import { Article, Category, PublishedAt } from '../../types/common';

type Props = {
  selectCategoryArticles: Array<Article>;
  articles: Array<Article>;
  categoryList: Array<Category>;
  selectCategoryName: string;
  publishedAt: Array<PublishedAt>;
};

export default function CategoryId({
  selectCategoryArticles,
  articles,
  categoryList,
  selectCategoryName,
  publishedAt,
}: Props) {
  if (selectCategoryArticles.length === 0) {
    return <div>ブログコンテンツがありません</div>;
  }
  return (
    <Layout
      articles={articles}
      categoryList={categoryList}
      publishedAt={publishedAt}
      title={selectCategoryName}>
      <CommonHead title={`Pe.log / ${selectCategoryName}`} />
      <ArticleList articles={selectCategoryArticles} />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'categories' });

  const paths = data.contents.map((content: Article) => `/category/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async context => {
  const id = context.params?.id;
  const articles = await client.get({
    endpoint: 'blogs',
  });
  const selectCategoryArticles = await client.get({
    endpoint: 'blogs',
    queries: { filters: `category[contains]${id}` },
  });
  const categoryData = await client.get({ endpoint: 'categories' });
  const selectCategoryName = await client.get({
    endpoint: 'categories',
    queries: { limit: 1, filters: `id[equals]${id}` },
  });
  const publishedAt = await client.get({
    endpoint: 'blogs',
    queries: { fields: 'publishedAt' },
  });

  return {
    props: {
      selectCategoryArticles: selectCategoryArticles.contents,
      articles: articles.contents,
      categoryList: categoryData.contents,
      selectCategoryName: selectCategoryName.contents[0].name,
      publishedAt: publishedAt.contents,
    },
  };
};

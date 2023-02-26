import { GetStaticProps } from 'next';
import { ArticleList } from '../../components/ArticleList';
import { CommonHead } from '../../components/Head';
import { Layout } from '../../components/Layout';
import { client } from '../../libs/client';
import { Article, Category, PublishedAt } from '../../types/common';
import { groupByCreatedAt } from '../../utils/groupByUtil';

type Props = {
  selectArchiveArticles: Array<Article>;
  articles: Array<Article>;
  selectDate: string;
  categoryList: Array<Category>;
  publishedAt: Array<PublishedAt>;
};

export default function Archive({
  selectArchiveArticles,
  articles,
  selectDate,
  categoryList,
  publishedAt,
}: Props) {
  return (
    <Layout
      articles={articles}
      categoryList={categoryList}
      publishedAt={publishedAt}
      title={selectDate}>
      <CommonHead title="Pe.log" />
      <ArticleList articles={selectArchiveArticles} />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blogs' });
  const createdAt = groupByCreatedAt(data.contents);

  const paths = Object.keys(createdAt).map(index => `/archive/${index}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async context => {
  const date = context.params?.data;
  const year = String(date).split('-')[0];
  const month = String(date).split('-')[1];

  const startOfMonthTmp = new Date(Number(year), Number(month) - 1, 1);
  const startOfMonth = new Date(startOfMonthTmp.getTime() - 1);
  const endOfMonth = new Date(Number(year), Number(month), 0);

  const filters = `publishedAt[greater_than]${startOfMonth.toISOString()}[and]publishedAt[less_than]${endOfMonth.toISOString()}`;

  const selectArchiveArticles = await client.get({
    endpoint: 'blogs',
    queries: {
      filters: filters,
    },
  });
  const articles = await client.get({
    endpoint: 'blogs',
  });
  const categoryData = await client.get({ endpoint: 'categories' });
  const publishedAt = await client.get({
    endpoint: 'blogs',
    queries: { fields: 'publishedAt' },
  });

  return {
    props: {
      selectArchiveArticles: selectArchiveArticles.contents,
      articles: articles.contents,
      selectDate: `${year}年${month}月`,
      categoryList: categoryData.contents,
      publishedAt: publishedAt.contents,
    },
  };
};

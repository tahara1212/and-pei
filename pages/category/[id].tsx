import { GetStaticProps } from 'next';
import { ArticleList } from '../../components/ArticleList';
import { CommonHead } from '../../components/Head';
import { Layout } from '../../components/Layout';
import { client } from '../../libs/client';
import { Article, Category } from '../../types/common';

type Props = {
  categorySelectArticles: Array<Article>;
  articles: Array<Article>;
  categoryList: Array<Category>;
};

export default function CategoryId({ categorySelectArticles, articles, categoryList }: Props) {
  if (categorySelectArticles.length === 0) {
    return <div>ブログコンテンツがありません</div>;
  }
  return (
    <Layout articles={articles} categoryList={categoryList}>
      <CommonHead title="Pe.log2" />
      <ArticleList articles={categorySelectArticles} />
    </Layout>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'categories' });

  const paths = data.contents.map((content: Article) => `/category/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps = async context => {
  const id = context.params?.id;
  const articles = await client.get({
    endpoint: 'blogs',
  });
  const categorySelectArticles = await client.get({
    endpoint: 'blogs',
    queries: { filters: `category[contains]${id}` },
  });
  const categoryData = await client.get({ endpoint: 'categories' });

  return {
    props: {
      categorySelectArticles: categorySelectArticles.contents,
      articles: articles.contents,
      categoryList: categoryData.contents,
    },
  };
};

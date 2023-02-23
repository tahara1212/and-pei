import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CommonHead } from '../components/Head';
import { Layout } from '../components/Layout';
import { client } from '../libs/client';
import { Article } from '../types/common';
import { formatDate } from '../utils/formatUtil';

type HomeProps = {
  articles: Array<Article>;
};

export default function Home({ articles }: HomeProps) {
  const router = useRouter();

  const onClickCard = (id: string) => {
    router.push(`/article/${id}`);
  }

  return (
    <Layout>
      <CommonHead title="Pe.log" />
      {/* <h1 className="mx-auto pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        記事一覧
      </h1> */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-10 ">
        {articles.map(article => (
          <div
            className="rounded group overflow-hidden shadow-lg cursor-pointer"
            key={article.id}
            onClick={() => onClickCard(article.id)}>
            <div className="flex justify-center items-center overflow-hidden h-48">
              <img
                className="w-full object-center group-hover:scale-110 group-hover:opacity-60 transition duration-300"
                src={article.eyecatch.url}
                alt={article.title}
              />
            </div>
            <div className="p-6">
              <div className="text-time text-xs">
                {formatDate(article.createdAt)}
              </div>
              <div className="pt-2 line-clamp-2">{article.title}</div>
              <div className="pt-4">
                {article.category.map(category => (
                  // <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  <span className="px-2 py-1 ml-2 text-xs bg-category">
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  console.log(client);
  const data = await client.get({
    endpoint: 'blogs',
  });
  return {
    props: {
      articles: data.contents,
    },
  };
};

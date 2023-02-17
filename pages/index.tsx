import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';
import { client } from '../libs/client';
import { Article } from '../types/article';

type HomeProps = {
  articles: Array<Article>;
};

export default function Home({ articles }: HomeProps) {
  const router = useRouter();

  return (
    <Layout>
      {/* <h1 className="mx-auto pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        記事一覧
      </h1> */}
      <div className="container mx-auto mt-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 grid-rows-3 gap-10 ">
        {articles.map(article => (
          <div
            className="rounded group overflow-hidden shadow-lg cursor-pointer"
            key={article.id}>
            <div className="overflow-hidden">
              <img
                className="w-full group-hover:scale-110 group-hover:opacity-60 transition duration-300"
                src={article.eyecatch.url}
                alt="Sunset in the mountains"
              />
            </div>
            <div className="p-6">
              <div className="line-clamp-2">{article.title}</div>
              <div className="pt-6">
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

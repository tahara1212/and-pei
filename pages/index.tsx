import type { GetStaticProps, NextPage } from 'next'
import { client } from '../libs/client';
import { Article } from '../types/article';

type HomeProps = {
  articles: Array<Article>;
};

export default function Home({ articles }: HomeProps) {
  return (
    <>
      <h1 className="container mx-auto px-10 pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        記事一覧
      </h1>
      <div className="container mx-auto p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {articles.map(article => (
          <div className="rounded overflow-hidden shadow-lg" key={article.id}>
            {/* <img
              className="w-full"
              src={article.eye_catch.url}
              alt="Sunset in the mountains"
            /> */}
            <div className="px-6 py-4">{article.title}</div>
            <div className="px-6 pt-4 pb-2">
              {article.tag && (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{article.tag}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

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

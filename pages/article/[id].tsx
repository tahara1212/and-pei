import { GetServerSideProps } from 'next';
import type { Article } from '../../types/article';
import { client } from '../../libs/client';
import { Layout } from '../../components/Layout';
import { formatDate } from '../../utils/formatUtil';

type Props = {
  article: Article;
};

export default function Article({ article }: Props) {
  return (
    <Layout>
      <div className="mt-20 shadow-lg">
        <div className="px-10 py-6 mx-auto">
          <div className="max-w-6xl px-10 py-6 mx-auto">
            {/* <img
              className="object-cover w-full shadow-sm h-full"
              src={article.eyecatch.url}
            /> */}
            <div className="mt-2">
              <div className="sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl font-bold gray">
                {article.title}
              </div>
            </div>
            <div className="flex items-center justify-start pb-4 mt-4 mb-4 border-b border-subGray">
              <time
                className="text-time text-xs"
                dateTime={formatDate(article.createdAt)}>
                {formatDate(article.createdAt)}
              </time>
              {article.category && (
                <div className="px-2 py-1 ml-2 text-xs bg-category">
                  {article.category.name}
                </div>
              )}
            </div>

            <div className="mt-2">
              <div className="text-2xl text-gray-700 mt-4 rounded ">
                {article.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const id = ctx.params?.id;
  const idExceptArray = id instanceof Array ? id[0] : id;
  const data = await client.get({
    endpoint: 'blogs',
    contentId: idExceptArray,
  });

  return {
    props: {
      article: data,
    },
  };
};

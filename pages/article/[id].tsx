import { GetStaticProps } from 'next';
import { load } from 'cheerio';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import type { Article, Category, PublishedAt } from '../../types/common';
import { client } from '../../libs/client';
import { Layout } from '../../components/Layout';
import { formatDate } from '../../utils/formatUtil';
import { Button } from '../../components/Button';
import { CommonHead } from '../../components/Head';

import 'highlight.js/styles/atom-one-dark.css';

hljs.registerLanguage('javascript', javascript);

type Props = {
  article: Article;
  articles: Array<Article>;
  categoryList: Array<Category>;
  publishedAt: Array<PublishedAt>
};

export default function Article({ article, articles, categoryList, publishedAt }: Props) {
  return (
    <Layout
      articles={articles}
      categoryList={categoryList}
      publishedAt={publishedAt}>
      <CommonHead title={article.title} />
      <div className="mt-1 md:mt-20 shadow-lg">
        <div className="px-6 md:px-20 py-6 mx-auto">
          <div className="max-w-6xl py-6 mx-auto">
            <div className="mt-2">
              <div className="text-2xl md:text-3xl font-bold break-words whitespace-pre-wrap gray">
                {article.title}
              </div>
            </div>
            <div className="flex items-center justify-start pb-4 mt-4 mb-4 border-b border-lightgray">
              <time
                className="text-time text-xs"
                dateTime={formatDate(article.createdAt)}>
                {formatDate(article.createdAt)}
              </time>
              {article.category.map(category => (
                <div className="px-2 py-1 ml-2 text-xs bg-category">
                  {category.name}
                </div>
              ))}
            </div>

            <div className="content mt-2">
              <div
                dangerouslySetInnerHTML={{
                  __html: `${article.content}`,
                }}
                className="text-2xl text-gray-700 mt-4 rounded"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <Button buttonText={'Back'} linkUrl={'/'} />
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({
    endpoint: 'blogs',
    queries: { offset: 0, limit: 100 },
  });
  const paths = data.contents.map((content: Article) => `/article/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const idExceptArray = id instanceof Array ? id[0] : id;
  const articles = await client.get({
    endpoint: 'blogs',
  });
  const article = await client.get({
    endpoint: 'blogs',
    contentId: idExceptArray,
  });
  const categoryData = await client.get({ endpoint: 'categories' });
  const publishedAt = await client.get({
    endpoint: 'blogs',
    queries: { fields: 'publishedAt'},
  });

  const $ = load(article.content);
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });
  article.content = $.html();

  return {
    props: {
      article: article,
      articles: articles.contents,
      categoryList: categoryData.contents,
      publishedAt: publishedAt.contents
    },
  };
};

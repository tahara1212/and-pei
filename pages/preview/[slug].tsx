import { GetStaticProps } from 'next';

import type { Article } from '../../types/common';
import { client } from '../../libs/client';

export default function Article({ post, draftKey }: any) {
  return post ? (
    <>
      {/* プレビューモードであるという表示 */}
      {draftKey && <div>現在プレビューモードで閲覧中です。</div>}
      　　　{/* 記事本文 */}
      <div>{post}</div>
    </>
  ) : (
    <div>no content</div>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({
    endpoint: 'blogs',
    queries: { offset: 0, limit: 100 },
  });
  const paths = data.contents.map(
    (content: Article) => `/preview/${content.id}`,
  );
  return { paths, fallback: false };
};

/* pages/post/[slug].tsx */
export const getStaticProps: GetStaticProps = async context => {
  const { params, previewData } = context;
  if (!params?.slug) {
    throw new Error('Error: ID not found');
  }

  /* draftKeyの存在チェック関数 */
  type Draft = {
    draftKey: string;
  };

  const isDraft = (arg: any): arg is Draft => {
    if (!arg?.draftKey) {
      return false;
    }
    return typeof arg.draftKey === 'string';
  };

  const slug = String(params.slug);
  /* requestのクエリパラメータを生成*/
  const draftKey = isDraft(previewData)
    ? { draftKey: previewData.draftKey }
    : {};

  /* draftKeyを付与してリクエストを投げる */
  try {
    const data = await client.getListDetail<Article>({
      endpoint: 'blogs',
      contentId: slug,
      queries: draftKey,
    });
    return {
      props: {
        post: data,
        ...draftKey,
      },
    };
  } catch (e) {
    /* 失敗したら404 */
    return { notFound: true };
  }
};

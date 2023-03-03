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
  return { paths, fallback: true };
};

export const getStaticProps: any = async (context: any) => {
  const slug = context.params?.slug;
  const draftKey = context.previewData?.draftKey;
  const content = await fetch(
    `https://xxxxxx.microcms.io/api/v1/blog/${slug}${
      draftKey !== undefined ? `?draftKey=${draftKey}` : ''
    }`,
    {
      headers: {
        'jSnYp1fzPPGiKP2ZBa8Pv2eKkKy5jnWhpjut': process.env.apiKey || '',
      },
    },
  ).then(res => res.json());
  return {
    props: {
      content,
    },
  };
};
import fetch from 'node-fetch';

export default async (req: any, res: any) => {
  if (!req.query.slug) {
    return res.status(404).end();
  }
  const content: any = await fetch(
    `https://xxxxxx.microcms.io/api/v1/blog/${req.query.slug}?fields=id&draftKey=${req.query.draftKey}`,
    {
      headers: {
        jSnYp1fzPPGiKP2ZBa8Pv2eKkKy5jnWhpjut: process.env.apiKey || '',
      },
    },
  )
    .then(res => res.json())
    .catch(error => null);

  if (!content) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  res.setPreviewData({
    slug: content.id,
    draftKey: req.query.draftKey,
  });
  res.writeHead(307, { Location: `/${content.id}` });
  res.end('Preview mode enabled');
};

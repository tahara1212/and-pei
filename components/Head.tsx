import Head from "next/head";

type Props = {
  children?: React.ReactNode;
  title: string;
}

export const CommonHead = ({ children, title }: Props) => (
  <Head>
    <title>{title}</title>
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1.0,maximum-scale=1.0"
    />
    {children}
  </Head>
);
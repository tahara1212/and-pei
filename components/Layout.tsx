import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <div className="container w-[860px] mx-auto">{children}</div>
    </>
  );
};
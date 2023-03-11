import Link from 'next/link';

export default function Header() {
  return (
    <header className="body-font border-b-2 border-mist">
      <div className="container max-w-[860px] h-14 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-center md:justify-start">
        <Link href={'/'} passHref>
          <span className="flex title-font font-medium items-center text-gray">
            <span className="text-xl">Pe.</span>
          </span>
        </Link>
      </div>
    </header>
  );
}

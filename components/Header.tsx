import Link from 'next/link';

export default function Header() {
  return (
    <header className="body-font border-b-2 border-mainGray">
      <div className="container w-[860px] h-14 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <Link href={'/'} passHref>
          <span className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="text-xl">Pe.</span>
          </span>
        </Link>
      </div>
    </header>
  );
}

import Link from 'next/link';
import { ButtonText } from '../types/common';

export const Button = ({ buttonText, linkUrl }: ButtonText) => {
  return (
    <Link href={'/'} passHref>
      <div className="group flex w-36 items-center justify-left cursor-pointer border-b hover:opacity-60 transition">
        <div className="py-2 before:content-[''] before:inline-block before:w-2 before:h-2 before:border-t-2 before:border-r-2 before:mr-4 before:rotate-45 before:translate-y-[-1px] before:group-hover:translate-x-1 before:transition">
          {buttonText}
        </div>
      </div>
    </Link>
  );
};

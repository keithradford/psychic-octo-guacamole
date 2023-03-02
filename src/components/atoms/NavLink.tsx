import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface NavLinkProps {
  text: string;
  link: string;
}

export const NavLink = ({ text, link }: NavLinkProps) => {
  const { pathname } = useRouter();

  return (
    <Link
      href={link}
      className={classNames(
        pathname === link && 'underline',
        'px-4 py-2 font-semibold text-primary hover:underline',
      )}
    >
      {text}
    </Link>
  );
};

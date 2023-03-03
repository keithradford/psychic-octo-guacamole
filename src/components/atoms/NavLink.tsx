import Link from 'next/link';
import React from 'react';

interface NavLinkProps {
  text: string;
  link: string;
}

export const NavLink = ({ text, link }: NavLinkProps) => {
  return (
    <Link
      href={link}
      className="px-4 py-2 font-semibold text-primary hover:underline"
    >
      {text}
    </Link>
  );
};

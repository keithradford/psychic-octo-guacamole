import Link from 'next/link';
import React from 'react';

interface LogoProps {
  showAppName?: boolean;
}

export const Logo = ({ showAppName }: LogoProps) => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <img src="./uvic-logo.svg" className="w-44 h-28" />
      {showAppName && (
        <div className="flex space-x-2">
          <div className="border-l border-gray-500" />
          <div className="flex flex-col text-sm font-extralight">
            <h1>University</h1>
            <h1>Management</h1>
            <h1>System</h1>
          </div>
        </div>
      )}
    </Link>
  );
};

import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

interface ButtonProps {
  theme?: 'filled' | 'outline';
  onClick: () => void;
}

export const Button = ({
  children,
  theme,
  onClick,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={classNames(
        'px-3 py-1 rounded-lg',
        theme === 'filled' || !theme
          ? 'border border-white bg-primary text-white transition-colors hover:bg-opacity-90 active:bg-opacity-100'
          : 'border border-primary border-opacity-50 text-primary transition-colors hover:bg-primary hover:bg-opacity-10 active:bg-opacity-50',
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

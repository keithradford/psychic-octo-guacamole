import classNames from "classnames";
import React, { useMemo } from "react";

interface PercentBarProps {
  title: string;
  max: number;
  current: number;
  onClick?: () => void;
}

export const PercentBar = ({
  title,
  max,
  current,
  onClick,
}: PercentBarProps) => {
  const percentWidth = useMemo(
    () => `${(current / max) * 100}%`,
    [current, max]
  );

  return (
    <div
      onClick={onClick}
      className="flex flex-col w-full space-y-2 hover:cursor-pointer"
    >
      <div className="flex items-end justify-between">
        <h1 className="text-lg">{title}</h1>
        <h2 className="text-sm font-light">
          ${current} of ${max}
        </h2>
      </div>
      <div className="w-full h-4 border border-gray-400 rounded-md">
        <div
          data-testid="percent-bar"
          style={{ width: percentWidth }}
          className={"bg-green-300 h-full rounded-md"}
        ></div>
      </div>
    </div>
  );
};

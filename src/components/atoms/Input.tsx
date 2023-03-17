import React from "react";

interface InputProps {
  title: string;
  value: string | number;
  setValue: (newVal: string) => void;
}

export const Input = ({ title, value, setValue }: InputProps) => {
  return (
    <div className="flex flex-col w-full">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {title}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </div>
  );
};

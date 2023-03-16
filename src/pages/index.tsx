import { trpc } from "@/utils/trpc";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [count, setCount] = useState(0);
  const hello = trpc.getHellos.useQuery();
  const { mutateAsync } = trpc.createHello.useMutation({});

  const onClick = async () => {
    await mutateAsync({ message: `hello ${count}` });
    setCount((c) => c + 1);
  };

  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>UVic Finance System</p>
      <button
        onClick={onClick}
        className="bg-red-500
      hover:bg-red-700 text-white font-bold py-2 px-4 rounded
      focus:outline-none focus:shadow-outline
      transition duration-500 ease-in-out
      transform hover:-translate-y-1 hover:scale-110
      active:scale-95
      "
      >
        Create Hello {count}
      </button>
      <p>{JSON.stringify(hello.data?.notes)}</p>
    </div>
  );
}

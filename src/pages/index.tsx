import useLocalStorage from "@/utils/hooks/useLocalStorage";
import Link from "next/link";

export default function Home() {
  const [session, _] = useLocalStorage<{ username: string } | null>(
    "session",
    null
  );
  if (!session) return;
  return (
    <div className="flex flex-col items-center justify-center w-full h-[80vh]">
      <div className="grid grid-cols-2 grid-rows-2 w-full h-full px-10 py-10">
        {/* yellow square */}
        <div className="bg-yellow-300 mr-5 mb-5 rounded-2xl">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-2xl font-bold">
              Welcome back, {session.username}!
            </h1>
          </div>
        </div>
        {/* blue square */}
        <div className="bg-blue-300 ml-5 mb-5 rounded-2xl">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1
              className="text-2xl font-light
              underline
              hover:text-green-800
            "
            >
              <Link href="/financial">View your financial statements</Link>
            </h1>
          </div>
        </div>
        {/* green square */}
        <div className="bg-green-300 mr-5 rounded-2xl">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1
              className="text-2xl font-light
              underline
              hover:text-blue-800
            "
            >
              <Link href="/budget">View your budget</Link>
            </h1>
          </div>
        </div>
        {/* red square */}
        <div className="bg-red-300 ml-5 rounded-2xl">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1
              className="text-2xl font-light
              underline
              hover:text-blue-800
            "
            >
              <Link href="/reporting">View reporting and analysis</Link>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

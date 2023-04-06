import useLocalStorage from "../utils/hooks/useLocalStorage";
import Link from "next/link";

export default function Home() {
  const [session, _] = useLocalStorage<{ username: string } | null>(
    "session",
    null
  );
  if (!session) return <div></div>;
  return (
    <div className="flex flex-col items-center justify-center w-full h-[80vh]">
      <div className="grid w-full h-full grid-cols-2 grid-rows-2 px-10 py-10">
        {/* yellow square */}
        <div
          style={{
            backgroundImage:
              'url("https://www.uvic.ca/_assets/images/landing-heros/naming-ceremony-1800x1012.jpg")',
            backgroundSize: "cover",
          }}
          className="mb-5 mr-5 bg-yellow-300 rounded-2xl"
        >
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="p-2 text-2xl font-bold text-gray-800 bg-white bg-opacity-90 rounded-xl">
              Welcome back, {session.username}!
            </h1>
          </div>
        </div>
        {/* blue square */}
        <Link
          style={{
            backgroundImage:
              'url("https://www.uvic.ca/_assets/images/landing-heros/co-op-jumbo-karl-hare1-1800x1012.jpg")',
            backgroundSize: "cover",
          }}
          className="mb-5 ml-5 bg-blue-300 rounded-2xl hover:cursor-pointer"
          href="/financial"
        >
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="p-2 text-2xl font-bold text-gray-800 bg-white bg-opacity-90 rounded-xl">
              View your financial statements
            </h1>
          </div>
        </Link>
        {/* green square */}
        <Link
          style={{
            backgroundImage:
              'url("https://www.uvic.ca/_assets/images/landing-heros/pooja-parmar-jumbotron-1800x1012.jpg")',
            backgroundSize: "cover",
          }}
          className="mr-5 bg-green-300 rounded-2xl hover:cursor-pointer"
          href="/budget"
        >
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="p-2 text-2xl font-bold text-gray-800 bg-white bg-opacity-90 rounded-xl">
              View your budget
            </h1>
          </div>
        </Link>
        {/* red square */}
        <Link
          style={{
            backgroundImage:
              'url("https://www.uvic.ca/_assets/images/landing-heros/vikes-presidents-cup-jumbo-1800x1012.jpg")',
            backgroundSize: "cover",
          }}
          className="ml-5 bg-red-300 rounded-2xl hover:cursor-pointer"
          href="/reporting"
        >
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="p-2 text-2xl font-bold text-gray-800 bg-white bg-opacity-90 rounded-xl">
              View reporting and analysis
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
}

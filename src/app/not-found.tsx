import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center flex-1 h-dvh mx-auto select-none">
      <div className="flex flex-col items-center">
        <span className="tracking-[1rem] text-6xl font-medium">404</span>

        <p className="text-2xl mt-2 text-orange-500 font-bold">
          Page Not Found
        </p>
      </div>

      <div className="mt-6 text-primary">
        <Link href="/">
          <span className="text-lg underline hover:text-primary-dark">
            Return To Home Page
          </span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

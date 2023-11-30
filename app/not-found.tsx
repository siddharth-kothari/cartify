import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[75vh] gap-y-5 px-5">
      <h2 className="font-abril text-3xl md:text-4xl">404</h2>
      <p className="font-bold text-3xl md:text-5xl text-center">
        Uh oh. his page doesn't exists.
      </p>
      <Link href="/" className="button">
        Back to home
      </Link>
    </div>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        {/* Welcome Message */}
        <section className="flex flex-col items-center space-y-10 w-full py-28">
          <div className="text-3xl sm:text-3xl sm:px-10 text-center">
            Welcome to Athawda Bazaar!
          </div>
          <div className="text-3xl sm:text-2xl sm:px-10 text-center opacity-90 tracking-wide">
            Discover. Rate. Shop - all in one Bazaar!
          </div>
          {/* <div className="flex flex-col text-center italic text-2xl opacity-60 tracking-wide">
            <span>Stalk all shops and their products </span>
            <span> as you stalk your crush.</span>
          </div> */}
          <Link
            href="/shops"
            aria-label="About Us"
            className="px-6 py-4 text-xl leading-tight tracking-widest normalButton text-gray-300 hover:text-gray-100 rounded-lg"
          >
            Explore Shops
          </Link>
        </section>
      </main>
    </>
  );
}

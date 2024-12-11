import Line from "@/components/Line";
import ShopCard from "@/components/ShopCard";
import { connectToDatabase } from "@/lib/mongoDB";
import { Shops } from "@/models/Shop";
import Link from "next/link";

export default async function Home() {
  const downward = (
    <svg viewBox="0 0 330 330" className="fill-white w-4 h-4">
      <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"></path>
    </svg>
  );
  await connectToDatabase();
  const ShopsDetails = await Shops.find();

  return (
    <>
      <main>
        {/* Welcome Message */}
        <section className="flex flex-col items-center justify-center space-y-10 w-full min-h-[90vh]">
          <div className="text-5xl sm:text-3xl sm:px-10 text-center">
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
            href="#shops"
            aria-label="About Us"
            className="normalButton flex items-center space-x-2 px-6 py-4 text-xl leading-tight tracking-widest text-gray-300 hover:text-gray-100 rounded-lg"
          >
            <span>Explore Shops</span>
            <span>{downward}</span>
          </Link>
        </section>
        <Line />
        {/* All Shops */}
        <section
          id="shops"
          className="flex flex-col items-center space-y-8 w-full py-24"
        >
          <div className="text-5xl text-center w-[50%] md:w-[70%] sm:w-[95%] sm:text-3xl sm:px-10">
            Browse Shops
          </div>
          <div>
            {(await ShopsDetails).map(
              (
                item: {
                  name: string;
                  category: string;
                  slug: string;
                  imageURL: string;
                  rating: number;
                },
                index
              ) => (
                <ShopCard
                  key={index}
                  title={item.name}
                  category={item.category}
                  image={item.imageURL}
                  url={item.slug}
                  rating={item.rating}
                />
              )
            )}
          </div>
        </section>
        <Line />
        {/* What is Athawda Bazaar */}
        <section className="flex flex-col items-center space-y-8 w-full py-24">
          <div className="text-4xl text-center w-[50%] md:w-[70%] sm:w-full sm:text-3xl sm:px-10">
            What is Athawda Bazaar?
          </div>
          <Link
            href="/about"
            className="normalButton px-6 py-4 text-xl leading-tight tracking-widest text-gray-300 hover:text-gray-100 rounded-lg sm:text-lg"
          >
            Know more About us!
          </Link>
        </section>
      </main>
    </>
  );
}

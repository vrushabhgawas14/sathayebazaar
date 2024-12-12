"use client";
import ShopCard from "@/components/ShopCard";
import { useEffect, useState } from "react";
// import { InsertShopDetails } from "@/constants/InsertShopDetails";
// import { connectToDatabase } from "@/lib/mongoDB";

export default function Shop() {
  // await connectToDatabase();

  // Inserting / Creating Shop Details
  // InsertShopDetails.map(async (item) => {
  //   const isShopPresent = await Shops.findOne({ slug: item.slug });
  //   if (!isShopPresent) {
  //     const newShop = new Shops({
  //       name: item.name,
  //       category: item.category,
  //       slug: item.slug,
  //       imageURL: item.imageURL,
  //       rating: item.rating,
  //       products: item.products,
  //       startDate: item.startDate,
  //       endDate: item.endDate,
  //     });

  //     await newShop.save();
  //   }
  // });

  // Deleting Shop Details
  //   await Shops.deleteMany({ slug: "shop4" });
  //   await Shops.deleteOne({ slug: "shop4" });

  const [ShopsDetails, setShopsDetails] = useState([]);

  useEffect(() => {
    async function fetchShops() {
      try {
        const response = await fetch("api/shops?isTopRated=true");

        const data = await response.json();

        if (response.status === 500) {
          // Failed to Fetch Current Shops
          console.log(data.message);
        }

        setShopsDetails(data);

        // eslint-disable-next-line
      } catch (err: any) {
        // Something might went wrong with fetching json or else.
        console.error("Error from homepage:= " + err.message);
      }
    }

    fetchShops();
  }, []);

  return (
    <>
      <main>
        {/* Sorted According to Ratings */}
        <section className="flex flex-col items-center justify-center w-full min-h-[90vh]">
          <div className="text-5xl sm:text-3xl pt-10 sm:px-10 text-center">
            Top Rated Shops.
          </div>
          <div>
            {ShopsDetails.map(
              (
                item: {
                  name: string;
                  category: string;
                  slug: string;
                  imageURL: string;
                  rating: number;
                  startDate: number;
                  endDate: number;
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
                  startDate={item.startDate}
                  endDate={item.endDate}
                />
              )
            )}
          </div>
        </section>
      </main>
    </>
  );
}

"use client";
import ShopCard from "@/components/ShopCard";
import { useEffect, useState } from "react";

export default function Shop() {
  const [ShopsDetails, setShopsDetails] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchShops = async () => {
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
  };

  useEffect(() => {
    fetchShops();
  }, []);

  // fetchShops();
  useEffect(() => {
    if (isSubmitting) {
      setTimeout(() => {
        fetchShops().then(() => setIsSubmitting(false));
      }, 3000);
    }
  }, [isSubmitting]);

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
                  ratedUsers: string[];
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
                  setIsSubmitting={setIsSubmitting}
                  numberOfRatings={item.ratedUsers.length}
                  isShopPage={true}
                />
              )
            )}
          </div>
        </section>
      </main>
    </>
  );
}

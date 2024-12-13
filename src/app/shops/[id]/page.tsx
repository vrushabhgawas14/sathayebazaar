"use client";
import Line from "@/components/Line";
import ProductsCard from "@/components/ProductsCard";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ShopProfile() {
  // eslint-disable-next-line
  const [ShopDetails, setShopDetails] = useState<any>();
  const [loading, setLoading] = useState(true);
  const requestedPath = usePathname();
  const slugURL = requestedPath?.replace("/shops/", "");

  useEffect(() => {
    async function fetchShops() {
      try {
        const res = await fetch("../api/singleShop", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slugURL,
          }),
        });

        const data = await res.json();

        if (res.status === 400) {
          // Shop Not Found, Invalid Slug
          setLoading(false);
        }

        if (res.status === 500) {
          // Failed to Fetch Current Shops
          console.log(data.message);
        }

        setShopDetails(data);

        // eslint-disable-next-line
      } catch (err: any) {
        // Something might went wrong with fetching json or else.
        console.error("Error from homepage:= " + err.message);
      }
    }

    fetchShops();
  }, [slugURL]);

  if (!ShopDetails || ShopDetails?.message === "No Shop Found.") {
    return (
      <div className="text-center text-3xl py-20">
        {loading ? "Loading..." : "Shop not found."}
      </div>
    );
  }

  return (
    <>
      <main className="py-10">
        <section className="flex flex-col items-center justify-center text-center w-full pb-10">
          <Image
            src={
              ShopDetails?.imageURL ||
              "https://drive.google.com/uc?id=1UIwtetmDame05BlPjt7R6Zf_dxKAUJ-v"
            }
            height={400}
            width={400}
            alt="Shop Banner"
            className="h-[50vh] w-[50vw] md:h-[40vh] md:w-[80vw] sm:h-[30vh] sm:w-[80vw] border-2 border-background-start rounded-xl"
          />
          <div className="text-5xl sm:text-3xl font-bold p-4 sm:px-10 text-center">
            {ShopDetails?.name}
          </div>
          <div className="text-2xl sm:text-xl sm:px-10 space-y-5">
            <div>
              <p className="normalButton text-white px-4 py-1 rounded-lg">
                {ShopDetails?.category || "Category"}
              </p>
              <p className="text-lg py-2">
                {ShopDetails?.startDate || "14"}
                <sup>th</sup> to {ShopDetails?.endDate || ""}
                <sup>th</sup> Dec
              </p>
            </div>
            <p className="text-3xl sm:text-2xl">
              Rating : {ShopDetails?.rating} / 10
            </p>
          </div>
        </section>
        <Line />
        {/* Products of this Shop */}
        <div className="flex flex-col items-center justify-center space-y-10 py-10 w-full">
          <p className="text-5xl sm:text-3xl sm:px-10 text-center">Products:</p>
          <div className="flex flex-wrap items-center justify-center p-8 h-auto w-full sm:flex-col">
            {ShopDetails?.products?.map(
              (
                item: { name: string; productImage: string; price: number },
                index: number
              ) => (
                <ProductsCard
                  key={index}
                  title={item.name}
                  image={item.productImage}
                  price={item.price}
                />
              )
            )}
          </div>
        </div>
      </main>
    </>
  );
}

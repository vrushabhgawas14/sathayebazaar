"use client";
import Line from "@/components/Line";
import ShopCard from "@/components/ShopCard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [ShopsDetails, setShopsDetails] = useState([]);
  // const [PastShopsDetails, setPastShopsDetails] = useState([]);

  const [errorCurrPage, setErrorCurrPage] = useState("");
  // const [errorPastPage, setErrorPastPage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(true);

  const fetchShops = async () => {
    try {
      const currResponse = await fetch("api/shops");
      const currData = await currResponse.json();

      if (currResponse.status === 500) {
        // Failed to Fetch Current Shops
        await setErrorCurrPage(currData.message);
      }
      setShopsDetails(currData);

      // Past Shops
      //  const pastResonse = await fetch("api/pastShops");
      //  const pastData = await pastResonse.json();

      //    if (pastResonse.status === 500) {
      // Failed to Fetch Past Shops
      //       await setErrorPastPage(pastData.message);
      //      }
      //    setPastShopsDetails(pastData);

      // eslint-disable-next-line
    } catch (err: any) {
      // Something might went wrong with fetching json or else.
      setErrorCurrPage("Error from homepage:= " + err.message);
      //     setErrorPastPage("Past Error from homepage:= " + err.message);
    }
  };

  // fetchShops();
  useEffect(() => {
    if (isSubmitting) {
      fetchShops().then(() => setIsSubmitting(false));
    }
  }, [isSubmitting]);

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
            href="/shops"
            className="normalButton flex items-center space-x-2 px-6 py-4 text-xl leading-tight tracking-widest text-gray-300 hover:text-gray-100 rounded-lg border-2 border-slate-950"
          >
            <span>View Top Rated Shops</span>
            {/* <span>{downward}</span> */}
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
          {ShopsDetails.length === 0 && (
            <p className="text-black flex justify-center py-10 text-2xl px-10 text-center">
              Loading...
            </p>
          )}
          {errorCurrPage && (
            <p className="flex justify-center py-10 text-2xl px-10 text-center">
              Error: {errorCurrPage}
            </p>
          )}
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
                />
              )
            )}
          </div>
        </section>
        <Line />

        {/* Past Shops */}
        {/*
        {PastShopsDetails.length >= 1 && (
          <>
            <section className="flex flex-col items-center space-y-8 w-full py-24">
              <div className="text-5xl text-center w-[50%] md:w-[70%] sm:w-[95%] sm:text-3xl sm:px-10">
                Past Shops
              </div>
              {errorPastPage && (
                <p className="flex justify-center py-10 text-2xl px-10 text-center">
                  Error: {errorPastPage}
                </p>
              )}
              <div>
                {PastShopsDetails.map(
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
                    />
                  )
                )}
              </div>
            </section>
            <Line />
          </>
        )}
        */}
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

"use client";
import Line from "@/components/Line";
import ShopCard from "@/components/ShopCard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const downward = (
    <svg viewBox="0 0 330 330" className="fill-white w-4 h-4">
      <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"></path>
    </svg>
  );

  const [ShopsDetails, setShopsDetails] = useState([]);
  const [PastShopsDetails, setPastShopsDetails] = useState([]);

  const [errorCurrPage, setErrorCurrPage] = useState("");
  const [errorPastPage, setErrorPastPage] = useState("");

  const [ratingError, setRatingError] = useState("");
  const [ratingGreenError, setRatingGreenError] = useState("");

  useEffect(() => {
    async function fetchShops() {
      try {
        const currResponse = await fetch("api/shops");
        const pastResonse = await fetch("api/pastShops");

        const currData = await currResponse.json();
        const pastData = await pastResonse.json();

        if (currResponse.status === 500) {
          // Failed to Fetch Current Shops
          await setErrorCurrPage(currData.message);
        }

        if (pastResonse.status === 500) {
          // Failed to Fetch Past Shops
          await setErrorPastPage(pastData.message);
        }

        setShopsDetails(currData);
        setPastShopsDetails(pastData);

        // eslint-disable-next-line
      } catch (err: any) {
        // Something might went wrong with fetching json or else.
        setErrorCurrPage("Error from homepage:= " + err.message);
        setErrorPastPage("Past Error from homepage:= " + err.message);
      }
    }

    fetchShops();
  }, [ratingError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const inputRating = formData.get("inputRating");
      const inputSlug = formData.get("inputSlug");

      const res = await fetch("api/shops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputRating,
          inputSlug,
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        // Rated Successfully
        await setRatingError(data.message);
        setRatingGreenError(data.message);
      }

      if (res.status === 400 || res.status === 500) {
        // Failed to rate the shop. || Shop not found
        await setRatingError(data.message);
      }

      // eslint-disable-next-line
    } catch (err: any) {
      // Something might went wrong with fetching json or else.
      setRatingError("Error of Rating := " + err.message);
    }
  };

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
            className="normalButton flex items-center space-x-2 px-6 py-4 text-xl leading-tight tracking-widest text-gray-300 hover:text-gray-100 rounded-lg border-2 border-slate-950"
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
                  handleSubmit={handleSubmit}
                  ratingError={ratingError}
                  ratingGreenError={ratingGreenError}
                />
              )
            )}
          </div>
        </section>
        <Line />

        {/* Past Shops */}
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
                      handleSubmit={handleSubmit}
                      ratingError={ratingError}
                      ratingGreenError={ratingGreenError}
                    />
                  )
                )}
              </div>
            </section>
            <Line />
          </>
        )}
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

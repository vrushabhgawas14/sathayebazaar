"use client";
import Image from "next/image";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type CardDetails = {
  image: string;
  title: string;
  category: string;
  url: string;
  rating?: number;
  startDate: number;
  endDate: number;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  numberOfRatings: number;
};

export default function ShopCard({
  image,
  title,
  category,
  url,
  rating,
  startDate,
  endDate,
  setIsSubmitting,
  numberOfRatings,
}: CardDetails) {
  const downward = (
    <svg viewBox="0 0 330 330" className="fill-white w-3 h-3">
      <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"></path>
    </svg>
  );

  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [ratingError, setRatingError] = useState("");
  const [ratingGreenError, setRatingGreenError] = useState("");

  const { data: session } = useSession();

  // Successfull Rating Timeout
  useEffect(() => {
    if (ratingError) {
      const timer = setTimeout(() => {
        setRatingError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [ratingError]);

  // Closing RatingForm After Submit
  function closeRatingForm() {
    const timer = setTimeout(() => {
      setIsRatingOpen(false);
    }, 3000);
    return () => clearTimeout(timer);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const inputRating = formData.get("inputRating");
      const inputSlug = formData.get("inputSlug");
      const ratedUser = formData.get("ratedUser");

      const res = await fetch("api/shops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputRating,
          inputSlug,
          ratedUser,
        }),
      });

      if (res.ok) {
        setIsSubmitting(true);
      }

      const data = await res.json();

      if (res.status === 400) {
        // User Already Rated them.
        await setRatingError(data.message);
      }

      if (res.status === 201) {
        // Rated Successfully
        await setRatingError(data.message);
        setRatingGreenError(data.message);
      }

      if (res.status === 500) {
        // Failed to rate the shop. || Shop not found
        await setRatingError(data.message);
      }

      closeRatingForm();

      // eslint-disable-next-line
    } catch (err: any) {
      // Something might went wrong with fetching json or else.
      setRatingError("Error of Rating := " + err.message);
    }
  };

  const isSuccessfull = ratingError === ratingGreenError; // Just for green text

  return (
    <>
      <div className="gradientShopComponent my-14 sm:my-10 pt-2 pb-6 px-2 m-4 rounded-xl text-white">
        <div className="relative h-[50vh] md:h-[40vh] sm:h-[30vh]">
          <Image
            src={image}
            width="400"
            height="400"
            sizes="100vw"
            loading="lazy"
            quality={90}
            alt={title}
            className="lg:h-[50vh] rounded-lg lg:w-[60vw] h-full w-[80vw]"
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-5xl sm:text-2xl w-full text-center pt-3 sm:pt-1 gradientShopComponentEffect bg-opacity-50">
            {title}
          </div>
        </div>
        <div className="flex sm:flex-col justify-between px-4">
          <div className="text-center py-2 text-xl sm:text-lg">
            Category : {category}
          </div>
          <div className="text-center font-bold py-2">
            <p>Rating: {rating}/10</p>
            <p className="text-sm opacity-80">
              (Based on {numberOfRatings} ratings)
            </p>
          </div>
        </div>
        <div className="px-4 text-center sm:pt-2">
          <span>Duration: </span>
          <span className="italic">
            {startDate}
            <sup> th</sup> to {endDate}
            <sup> th</sup> Dec 2024
          </span>
        </div>
        <div className="flex items-center justify-center text-center space-x-4 pt-6">
          <button
            className="bg-background-start flex items-center justify-center space-x-2 px-4 py-1 text-base text-red-100 border-2 border-red-100 border-opacity-90 rounded-xl ease-in duration-200 hover:bg-opacity-50"
            onClick={() => setIsRatingOpen(!isRatingOpen)}
          >
            <span>Rate Us !</span>
            <span>{downward}</span>
          </button>
          <Button text="View Details" url={`shops/${url}`} small={true} />
        </div>
        {isRatingOpen && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 pt-10 items-center"
          >
            {session ? (
              // Logged In User
              <div className="space-x-2">
                <input
                  type="number"
                  id="inputRating"
                  name="inputRating"
                  placeholder="Enter Rating (1 to 10)"
                  min={1}
                  max={10}
                  step={0.1}
                  className={`text-black w-48 outline-none px-2 pl-4 py-1 rounded-xl`}
                  required
                />
                <input
                  type="text"
                  name="inputSlug"
                  value={url}
                  className="hidden"
                  readOnly
                />
                <input
                  type="text"
                  name="ratedUser"
                  value={session?.user?.email || ""}
                  className="hidden"
                  readOnly
                />
                <button
                  type="submit"
                  className={`bg-background-start px-4 py-1 text-base text-red-100 border-2 border-red-100 border-opacity-90 rounded-xl ease-in duration-200 hover:bg-background-mid`}
                >
                  Submit
                </button>
              </div>
            ) : (
              // Normal User
              <>
                <div className="space-x-2">
                  <input
                    type="number"
                    placeholder="Enter Rating (1 to 10)"
                    className={`text-black w-48 outline-none px-2 pl-4 py-1 rounded-xl`}
                    disabled
                  />
                  <button
                    type="submit"
                    className={`bg-background-start px-4 py-1 text-base text-red-100 border-2 border-red-100 border-opacity-90 rounded-xl ease-in duration-200 hover:bg-background-mid ${
                      !session && "opacity-40"
                    }`}
                    disabled
                  >
                    Submit
                  </button>
                </div>
                <div className="italic text-center flex flex-wrap">
                  (User needs to be Logged in to Rate.)
                </div>
                <Button text="Login" url="/login" />
              </>
            )}

            <div>
              {ratingError && (
                <p
                  className={`text-center bg-gray-200 px-2 py-1 rounded-2xl line-clamp-4 ${
                    isSuccessfull ? "text-green-700" : "text-red-600"
                  }`}
                >
                  {ratingError}
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </>
  );
}

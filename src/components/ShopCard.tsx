import Image from "next/image";
import Button from "./Button";

type CardDetails = {
  image: string;
  title: string;
  category: string;
  url: string;
  rating?: number;
  startDate: number;
  endDate: number;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  ratingError?: string;
  ratingGreenError?: string;
};

export default function ShopCard({
  image,
  title,
  category,
  url,
  rating,
  startDate,
  endDate,
  handleSubmit,
  ratingError,
  ratingGreenError,
}: CardDetails) {
  const isSuccessfull = ratingError === ratingGreenError; // Just for green text color
  return (
    <>
      <div className="gradientShopComponent my-14 sm:my-10 pt-2 pb-6 px-2 m-4 rounded-xl text-white">
        <div className="relative h-[50vh] md:h-[40vh] sm:h-[30vh]">
          <Image
            src={image}
            width="0"
            height="0"
            sizes="100vw"
            loading="lazy"
            quality={70}
            alt={title}
            className="h-full rounded-lg object-cover lg:w-[60vw] w-[80vw]"
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-5xl sm:text-2xl w-full text-center pt-3 sm:pt-1 gradientShopComponentEffect bg-opacity-50">
            {title}
          </div>
        </div>
        <div className="flex sm:flex-col justify-between items-center px-4">
          <div className="text-center py-2 text-xl sm:text-lg">
            Category : {category}
          </div>
          <div className="text-center font-bold py-2">Rating: {rating}/10</div>
        </div>
        <div className="px-4">
          <span>Duration: </span>
          <span className="italic">
            {startDate}
            <sup> th</sup> to {endDate}
            <sup> th</sup> Dec 2024
          </span>
        </div>
        <div className="text-center pt-8">
          <Button text="View Details" url={`shops/${url}`} small={true} />
        </div>
        <div className="flex pt-10 items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-2 items-center"
          >
            <label htmlFor="inputRating">Enter Rating (1 to 10): </label>
            <input
              type="number"
              id="inputRating"
              name="inputRating"
              placeholder="Enter rating"
              min={1}
              max={10}
              className="text-black w-40 outline-none px-2 py-1"
              required
            />
            <input
              type="text"
              name="inputSlug"
              value={url}
              className="hidden"
              readOnly
            />
            <button type="submit" className="bg-red-800">
              Submit
            </button>
            {ratingError && (
              <p
                className={`text-center bg-gray-200 px-2 py-1 rounded-2xl line-clamp-4 ${
                  isSuccessfull ? "text-green-700" : "text-red-600"
                }`}
              >
                {ratingError}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

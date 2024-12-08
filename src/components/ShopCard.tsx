import Image from "next/image";
import Button from "./Button";

type CardDetails = {
  image: string;
  title: string;
  category: string;
  url: string;
  rating: number;
};

export default function ShopCard({
  image,
  title,
  category,
  url,
  rating,
}: CardDetails) {
  return (
    <>
      <div className="pt-2 pb-6 px-2 m-4 bg-background-mid rounded-xl text-white">
        <div className="relative h-[60vh] md:h-[40vh] sm:h-[30vh]">
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
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-5xl sm:text-2xl w-full text-center pt-3 sm:pt-1 gradientShop bg-opacity-50">
            {title}
          </div>
        </div>
        <div className="flex sm:flex-col justify-between items-center px-4">
          <div className="text-center py-2 text-xl sm:text-lg">
            Category : {category}
          </div>
          <div className="text-center py-2">Rating: {rating}/10</div>
        </div>
        <div className="text-center pt-4">
          <Button text="View Details" url={url} small={true} />
        </div>
      </div>
    </>
  );
}

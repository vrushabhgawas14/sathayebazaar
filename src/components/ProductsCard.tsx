import Image from "next/image";

type CardDetails = {
  title: string;
  image: string;
  price: number;
};

export default function ProductsCard({ title, image, price }: CardDetails) {
  return (
    <>
      <div className="py-4 px-2 m-4 gradientShopComponent rounded-xl text-white">
        <div className="relative h-full">
          <Image
            src={image}
            width="100"
            height="100"
            sizes="100vw"
            loading="lazy"
            quality={70}
            alt="Plan Images"
            className="h-64 sm:w-72 md:w-80 w-60"
          />
        </div>
        <div className="text-center py-2 text-xl font-bold w-60 md:w-80 sm:w-72">
          {title}
        </div>
        <div className="text-center text-lg">Price: {price} ₹</div>
      </div>
    </>
  );
}

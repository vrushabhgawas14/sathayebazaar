import Line from "@/components/Line";
import ProductsCard from "@/components/ProductsCard";
import { connectToDatabase } from "@/lib/mongoDB";
import { Shops } from "@/models/Shop";
import Image from "next/image";

// eslint-disable-next-line
export default async function ShopProfile({ params }: any) {
  await connectToDatabase();
  const slugParam = await params;
  const slugURL = slugParam.id;

  const ShopDetails = await Shops.findOne({ slug: slugURL });

  if (!ShopDetails) {
    return <div className="text-center text-3xl py-20">Shop not found.</div>;
  }
  return (
    <>
      <main className="py-10">
        <section className="flex flex-col items-center justify-center text-center w-full pb-10">
          <Image
            src={ShopDetails.imageURL}
            height={400}
            width={400}
            alt="Shop Banner"
            className="h-[50vh] w-[50vw] md:h-[40vh] md:w-[80vw] sm:h-[30vh] sm:w-[80vw] border-2 border-background-start rounded-xl"
          />
          <div className="text-5xl sm:text-3xl p-4 sm:px-10 text-center">
            {ShopDetails.name}
          </div>
          <div className="text-2xl sm:text-xl sm:px-10 space-y-5">
            <p>{ShopDetails.category}</p>
            <p className="text-3xl sm:text-2xl">
              Rating: {ShopDetails.rating} / 10
            </p>
          </div>
        </section>
        <Line />
        {/* Products of this Shop */}
        <div className="flex flex-col items-center justify-center space-y-10 py-10 w-full">
          <p className="text-5xl sm:text-3xl sm:px-10 text-center">Products:</p>
          <div className="flex flex-wrap items-center justify-center p-8 h-auto w-full sm:flex-col">
            {(await ShopDetails).products.map(
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

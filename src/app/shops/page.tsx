import { connectToDatabase } from "@/lib/mongoDB";
import { Shops } from "@/models/Shop";
// import { InsertShopDetails } from "@/constants/InsertShopDetails";
import ShopCard from "@/components/ShopCard";

export const metadata = {
  title: "Shops",
};

export default async function Shop() {
  let ShopsDetails;
  try {
    await connectToDatabase();

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
    //     });

    //     await newShop.save();
    //   }
    // });

    // Deleting Shop Details
    //   await Shops.deleteMany({ slug: "shop4" });
    //   await Shops.deleteOne({ slug: "shop4" });

    const ShopsDetailsTemp = await Shops.find().sort({ rating: -1 });
    ShopsDetails = ShopsDetailsTemp;
  } catch {
    return (
      <div className="flex justify-center py-20 text-2xl px-10 text-center">
        Check your internet connection and try again!
      </div>
    );
  }

  return (
    <>
      <main>
        {/* Sorted According to Ratings */}
        <section className="flex flex-col items-center justify-center w-full min-h-[90vh]">
          <div className="text-5xl sm:text-3xl pt-10 sm:px-10 text-center">
            Top Rated Shops.
          </div>
          <div>
            {(await ShopsDetails).map(
              (
                item: {
                  name: string;
                  category: string;
                  slug: string;
                  imageURL: string;
                  rating: number;
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
                />
              )
            )}
          </div>
        </section>
      </main>
    </>
  );
}
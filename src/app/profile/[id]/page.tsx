// import { InsertShopDetails } from "@/constants/InsertShopDetails";
// import { connectToDatabase } from "@/lib/mongoDB";
// import { Shops } from "@/models/Shop";

// eslint-disable-next-line
export default async function UserProfile({ params }: any) {
  // await connectToDatabase();

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
  //       startDate: item.startDate,
  //       endDate: item.endDate,
  //       ratedUsers: item.ratedUsers,
  //       ratingsArray: item.ratingsArray,
  //     });

  //     await newShop.save();
  //   }
  // });

  // Update
  // InsertShopDetails.map(async (item) => {
  //   await Shops.updateOne(
  //     { slug: item.slug },
  //     { $set: { ratingsArray: item.ratingsArray } }
  //   );
  // });

  // Deleting Shop Details
  // await Shops.deleteMany({ slug: "shop4" });
  // await Shops.deleteOne({ slug: "shop4" });

  return (
    <>
      <main className="text-center py-20">Welcome {params.id}</main>
    </>
  );
}

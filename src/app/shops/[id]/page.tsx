import { connectToDatabase } from "@/lib/mongoDB";
import { Shops } from "@/models/Shop";

// eslint-disable-next-line
export default async function ShopProfile({ params }: any) {
  await connectToDatabase();
  const ShopDetails = await Shops.findOne({ slug: params.id });
  return (
    <>
      <main className="text-center py-20">Welcome {ShopDetails.name}</main>
    </>
  );
}

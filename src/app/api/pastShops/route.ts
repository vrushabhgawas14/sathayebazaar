import { connectToDatabase } from "@/lib/mongoDB";
import { Shops } from "@/models/Shop";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDatabase();

    const today = new Date();
    const todaysDate = today.getDate();

    const shops = await Shops.find({
      endDate: { $lt: todaysDate },
    });

    return NextResponse.json(shops);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch past shops" },
      { status: 500 }
    );
  }
};

import { connectToDatabase } from "@/lib/mongoDB";
import { Shops } from "@/models/Shop";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { slugURL } = await request.json();
    await connectToDatabase();

    const shops = await Shops.findOne({ slug: slugURL });

    return NextResponse.json(shops);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch past shops" },
      { status: 500 }
    );
  }
};

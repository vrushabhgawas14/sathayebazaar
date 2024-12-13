import { connectToDatabase } from "@/lib/mongoDB";
import { Shops } from "@/models/Shop";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { slugURL } = await request.json();
    await connectToDatabase();

    const shops = await Shops.findOne({ slug: slugURL });

    if (shops === null) {
      return NextResponse.json({ message: "No Shop Found." }, { status: 400 });
    }

    return NextResponse.json(shops);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch personal shop" },
      { status: 500 }
    );
  }
};

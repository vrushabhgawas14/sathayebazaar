import { connectToDatabase } from "@/lib/mongoDB";
import { Shops } from "@/models/Shop";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await connectToDatabase();

    const url = new URL(request.url);
    const isTopShops = url.searchParams.get("isTopRated");

    let shops;
    const today = new Date();
    const todaysDate = today.getDate();

    if (isTopShops === "true") {
      shops = await Shops.find({
        endDate: { $gte: todaysDate },
      }).sort({ rating: -1 });
    } else {
      shops = await Shops.find({
        endDate: { $gte: todaysDate },
      });
    }

    return NextResponse.json(shops);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch current shops" },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const { inputRating, inputSlug } = await request.json();
    await connectToDatabase();

    const updatedRating = await Shops.updateOne(
      { slug: inputSlug },
      { $set: { rating: inputRating } }
    );

    if (updatedRating.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Shop not found or no changes made" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Rated successfully" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Failed to rate the shop." },
      { status: 500 }
    );
  }
};

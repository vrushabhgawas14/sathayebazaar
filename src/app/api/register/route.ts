import { connectToDatabase } from "@/lib/mongoDB";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();
    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User Already Exits." },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashPassword,
    });

    await newUser.save();
    return NextResponse.json(
      { message: "User Registered Successfully." },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Status : 500 = " + err },
      { status: 500 }
    );
  }
};

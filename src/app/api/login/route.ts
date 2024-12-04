import { connectToDatabase } from "@/lib/mongoDB";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();
    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { message: "User is not Registered." },
        { status: 400 }
      );
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Login Successfull." },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Status : 500 = " + err },
      { status: 500 }
    );
  }
};

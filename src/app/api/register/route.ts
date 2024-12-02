import { connectToDatabase } from "@/lib/mongoDB";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: Request) => {
  const { email, password } = await request.json();
  await connectToDatabase();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "Email is Already Registered." },
      { status: 400 }
    );
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    return NextResponse.json(
      { message: "User Registered Successfully." },
      { status: 200 }
    );
  } catch (err: unknown | null | undefined) {
    return NextResponse.json({ message: err + "" }, { status: 500 });
  }
};

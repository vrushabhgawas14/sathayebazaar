import { connectToDatabase } from "@/lib/mongoDB";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: Request) => {
  const { email, password } = await request.json();
  await connectToDatabase();

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return NextResponse.json(
      { message: "Email is not registered" },
      { status: 400 }
    );
  }

  const isValidPassword = await bcrypt.compare(password, existingUser.password);
  if (!isValidPassword) {
    return NextResponse.json({ message: "Invalid Password" }, { status: 400 });
  }

  try {
    return NextResponse.json(
      { message: "User Login Successfully" },
      { status: 200 }
    );
  } catch (err: unknown | null | undefined) {
    return new NextResponse(err + "", { status: 500 });
  }
};

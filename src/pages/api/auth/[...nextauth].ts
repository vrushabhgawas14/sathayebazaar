import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/lib/mongoDB";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();

          // Validate credentials object
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and Password are required.");
          }

          const existingUser = await User.findOne({ email: credentials.email });
          if (!existingUser) {
            throw new Error("User doesn't exist!");
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );

          if (!isValidPassword) {
            throw new Error("Invalid Password.");
          }

          return {
            id: existingUser._id.toString(),
            name: existingUser.name,
            email: existingUser.email,
          };
          // eslint-disable-next-line
        } catch (err: any) {
          throw new Error("Error = " + err.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

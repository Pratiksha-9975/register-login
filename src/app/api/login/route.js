import { NextResponse } from "next/server";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "../lib/db"; // Import the database connection function

const ADMIN_CREDENTIALS = {
  email: "admin@gmail.com",
  password: "Admin@123", // Store this hashed in production
};
export async function POST(request) {
  try {
    await connectDB(); // Ensure database connection before proceeding

    const { email, password } = await request.json();
   
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const token = jwt.sign({ email }, "secret", { expiresIn: "7D" });
      const response = NextResponse.json(
        { message: "Admin login successful", isAdmin: true },
        { status: 200 }
      );
      response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
      return response;
    }
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check user approval status
    // if (user.status !== "approved") {
    //   return NextResponse.json(
    //     { message: "Your account is not approved yet." },
    //     { status: 403 }
    //   );
    // }

    // Verify password
    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, "secret", {
      expiresIn: "7D",
    });

    // Return response with token and user info
    const response = NextResponse.json(
      { message: "Login successful", user },
      { status: 200 }
    );
    response.cookies.set("Userrr", token); // Set token as a cookie

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}

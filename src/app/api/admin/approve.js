import { NextResponse } from "next/server";
import User from "../models/user";
import connectDB from "../lib/db";

const ADMIN_CREDENTIALS = { email: "admin@gmail.com", name:"admin"}; // Updated for clarity

export async function PUT(request) {
  try {
    await connectDB(); // Ensure database connection

    const { email, name, action, userId } = await request.json();
    console.log(email,name,action,userId);
    

    // Validate admin credentials
    if (
      email !== ADMIN_CREDENTIALS.email ||
      name !== ADMIN_CREDENTIALS.name
    ) {
      return NextResponse.json(
        { message: "Invalid admin credentials" },
        { status: 403 }
      );
    }

    // Validate action
    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { message: "Invalid action. Allowed actions: approve, reject" },
        { status: 400 }
      );
    }

    // Find user by ID and update status
    const user = await User.findById({_id:userId});
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    user.status = action === "approve" ? "approved" : "rejected";
    await user.save();

    return NextResponse.json(
      { message: `User status updated to '${user.status}' successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing PATCH request:", error);
    return NextResponse.json(
      { message: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}

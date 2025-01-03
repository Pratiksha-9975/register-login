import User from "../models/user";

export async function GET(req) {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Return the users in the response
    return new Response(JSON.stringify({ users }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    // Return an error response
    return new Response(
      JSON.stringify({ error: "Failed to fetch users" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

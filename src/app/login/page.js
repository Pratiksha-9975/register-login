"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    const { email, password } = formData;

    if (!email || !password) {
      setError("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(`Welcome ${data.user.name}! ${data.message}`);
        setFormData({ email: "", password: "" });
        
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Your credentials are invalid");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        {error && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 border border-green-200">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Enter your email"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Enter your password"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          New user ?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign-up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;

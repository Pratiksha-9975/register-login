"use client";
import { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle changes to input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for the field on change
    setSuccessMessage(""); // Clear success message
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  // Validate individual field
  const validateField = (name, value) => {
    let errorMessage = "";

    if (name === "name" && !value) {
      errorMessage = "Name is required.";
    } else if (name === "email") {
      if (!value) {
        errorMessage = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorMessage = "Please enter a valid email.";
      }
    }  else if (name === "password") {
      if (!value) {
        errorMessage = "Password is required.";
      } else if (value.length < 6) {
        errorMessage = "Password must be at least 6 characters.";
      } else if (!passwordRegex.test(value)) {
        errorMessage = "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  // Handle blur for each input field to trigger validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    const { name, email, password } = formData;

    // Validate all fields before submitting
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
    });

    // If there are any errors, stop form submission
    if (Object.values(errors).some((error) => error !== "")) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(`Welcome  ${data.user.name} !!! ${data.message}  `);
        setFormData({ name: "", email: "", password: "" });
      } else {
        setErrors({ ...errors, general: data.message || "Something went wrong." });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ ...errors, general: "An unexpected error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>

        {errors.general && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200">
            {errors.general}
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
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-3 py-2 mt-1 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Enter your name"
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

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
              onBlur={handleBlur}
              className="w-full px-3 py-2 mt-1 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Enter your email"
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
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
              onBlur={handleBlur}
              className="w-full px-3 py-2 mt-1 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Enter your password"
              disabled={isSubmitting}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;

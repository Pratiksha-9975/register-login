"use client";

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState({ name: "", email: "" });

  useEffect(() => {
    fetch("/api/users") // Fetch all users
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((err) => console.error(err));
  }, []);

  const handleAction = async (name, email, userId, action) => {
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        action,
        userId,
      }),
    });
    const data = await res.json();
if (res.ok && action === "approve") {
  Swal.fire({
    icon: 'success',
    title: 'Action Successful',
    text: data.message,
  });
  setUsers(
    users.map((user) =>
      user._id === userId ? { ...user, status: "approved" } : user
    )
  );
} else if (res.ok && action === "reject") {
  Swal.fire({
    icon: 'error',
    title: 'Request Rejected',
    text: data.message,
  });
  setUsers(
    users.map((user) =>
      user._id === userId ? { ...user, status: "rejected" } : user
    )
  );
} else {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: data.message || 'An unexpected error occurred. Please try again later.',
  });
}

    
    
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Admin Dashboard</h1>
  
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-100 text-gray-700 text-sm font-medium border-b">
                <th className="px-6 py-3 text-left">Username</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Approval Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-6 py-4 text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 text-gray-800">{user.email}</td>
                  <td className="px-6 py-4 text-gray-800">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : user.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {user.status === "pending" ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            handleAction(admin.name, admin.email, user._id, "approve")
                          }
                          className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleAction(admin.name, admin.email, user._id, "reject")
                          }
                          className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm italic">No Actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

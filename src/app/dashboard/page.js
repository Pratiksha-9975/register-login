"use client";

import { useState, useEffect } from "react";


export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState({ name: "", email: "" });

  useEffect(() => {
    fetch("/api/users") // Fetch all users
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((err) => console.error(err));
  }, []);

  const handleAction = async (name , email, userId, action) => {
    const res = await fetch("/api/admin", {
      
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        action,
        userId,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, status: action === "approve" ? "approved" : "rejected" } : user
        )
      );
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input
        type="text"
        placeholder="Admin Name"
        value={admin.name}
        onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Admin Email"
        value={admin.email}
        onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
      />
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Status: {user.status}</p>
            {user.status === "pending" && (
              <div>
                <button onClick={() => handleAction(user.name , user.email , user._id, "approve")}>Approve</button>
                <button onClick={() => handleAction(user.name, user.email, user._id, "reject")}>Reject</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// pages/index.js
import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">Vendor Dashboard</div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 border rounded-md"
          />
          <img
            src="/profile-placeholder.png"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          {[
            { label: "Orders", count: "23 orders new", icon: "❤️" },
            { label: "System", count: "23 orders new", icon: "⚙️" },
            { label: "Report", count: "23 orders new", icon: "📊" },
            { label: "Notification", count: "23 orders new", icon: "🔔" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-4 flex flex-col items-center space-y-3"
            >
              <div className="text-3xl">{item.icon}</div>
              <div className="font-semibold">{item.label}</div>
              <div className="text-gray-500">{item.count}</div>
            </div>
          ))}
        </div>

        {/* Activity and Profit */}
        <div className="grid grid-cols-3 gap-6">
          {/* Activity Section */}
          <div className="col-span-2 bg-white shadow-md rounded-md p-6">
            <h3 className="text-lg font-bold mb-4">Activity</h3>
            <ul className="space-y-4">
              {[
                {
                  message: "500 USD was added in same space a/c by Rahul",
                  time: "06:00 AM",
                },
                {
                  message: "New customer was added with same space a/c by Rahul",
                  time: "05:40 PM",
                },
                {
                  message:
                    "Payment of 3500 USD was made by Caroline Watson.",
                  time: "01:19 AM",
                },
              ].map((activity, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-3 border-b pb-3"
                >
                  <span className="text-blue-500 text-xl">•</span>
                  <div>
                    <p className="font-semibold">{activity.message}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Profit Section */}
          <div className="bg-white shadow-md rounded-md p-6">
            <h3 className="text-lg font-bold mb-4">Profit</h3>
            <div>
              <p className="text-xl font-semibold text-green-500">$5000</p>
              <p className="text-sm text-gray-500">Very Good</p>
            </div>
            <div className="mt-6">
              {/* Dummy Chart */}
              <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center">
                <p className="text-gray-500">Profit Chart Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

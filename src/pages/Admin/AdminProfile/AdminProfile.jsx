import React, { useState } from "react";

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [adminInfo, setAdminInfo] = useState({
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
    joined: "January 1, 2024",
    phone: "+91 9876543210",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    setIsEditing(false);
    // Optional: Send updated data to server here
    alert("Profile updated successfully!");
  };

  return (
    <div className="bg-white p-8 rounded shadow-md max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-indigo-600 mb-4">Admin Profile</h1>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm text-gray-600">Name</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={adminInfo.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          ) : (
            <p className="text-lg font-medium">{adminInfo.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-600">Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={adminInfo.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          ) : (
            <p className="text-lg font-medium">{adminInfo.email}</p>
          )}
        </div>

        {/* Role (non-editable) */}
        <div>
          <label className="block text-sm text-gray-600">Role</label>
          <p className="text-lg font-medium">{adminInfo.role}</p>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm text-gray-600">Phone</label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={adminInfo.phone}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          ) : (
            <p className="text-lg font-medium">{adminInfo.phone}</p>
          )}
        </div>

        {/* Joined (non-editable) */}
        <div>
          <label className="block text-sm text-gray-600">Joined On</label>
          <p className="text-lg font-medium">{adminInfo.joined}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        {isEditing ? (
          <>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-500"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

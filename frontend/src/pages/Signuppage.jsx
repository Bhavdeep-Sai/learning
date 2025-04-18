import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signuppage = () => {
  const navigate = useNavigate();

  const [userName, setName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userContact, setContact] = useState("");
  const [userGet, setUserGet] = useState([]);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://learning-1-gf05.onrender.com/user/add",
        {
          username: userName,
          email: userEmail,
          password: userPassword,
          contact: userContact,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Signup completed", response.data);
      navigate("/login");
    } catch (error) {
      console.log("Signup Error", error);
    }
    setName("");
    setEmail("");
    setPassword("");
    setContact("");
  };

  const handleUser = async () => {
    try {
      const response = await axios.get("https://learning-1-gf05.onrender.com/user/");
      console.log("All users fetched:", response.data);
      setUserGet(response.data.data);
    } catch (error) {
      console.log("Get All Users Error", error);
    }
  };

  const handleGetUser = async () => {
    try {
      const response = await axios.get(`https://learning-1-gf05.onrender.com/user/${userId}`);
      setUserData(response.data.data);
    } catch (error) {
      console.log("Get User By ID Error", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`https://learning-1-gf05.onrender.com/user/update/${userId}`, {
        username: updatedName,
        email: updatedEmail,
      });
      alert("User updated successfully!");
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`https://learning-1-gf05.onrender.com/user/delete/${userId}`);
      alert("User deleted successfully!");
      setUserData(null);
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Signup Form */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">Create an Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={userPassword}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              placeholder="Contact"
              value={userContact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>

        {/* User Management */}
        <div className="space-y-6">
          {/* Get All Users */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">All Users</h2>
              <button
                onClick={handleUser}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
              >
                Load Users
              </button>
            </div>
            {userGet.length > 0 ? (
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {userGet.map((user, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <p><span className="font-medium">Name:</span> {user.username}</p>
                    <p><span className="font-medium">Email:</span> {user.email}</p>
                    <p><span className="font-medium">Contact:</span> {user.contact}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No user data yet. Click "Load Users".</p>
            )}
          </div>

          {/* Get / Update / Delete */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Manage a User</h2>
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <div className="flex gap-2">
              <button
                onClick={handleGetUser}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-500"
              >
                Get
              </button>
              <button
                onClick={handleDeleteUser}
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-500"
              >
                Delete
              </button>
            </div>

            {userData && (
              <div className="bg-gray-50 p-4 rounded-lg border">
                <p><strong>Name:</strong> {userData.username}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Contact:</strong> {userData.contact}</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="New Name"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="email"
                placeholder="New Email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
              <button
                onClick={handleUpdateUser}
                className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-400"
              >
                Update User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signuppage;

import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Signuppage = () => {
    const navigate = useNavigate();

    const [userName, setName] = useState("");
    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const [userContact, setContact] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://learning-1-gf05.onrender.com/user/add",{
                username: userName,
                email : userEmail,
                password : userPassword,
                contact : userContact,
            },{
                headers:{
                    "Content-Type" : "application/json"
                }
            });
            console.log("signup completed", response.data);
        } catch (error) {
            console.log("Error found", error);
        }

        setName("");
        setEmail("");
        setPassword("");
        setContact("");
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-600 p-5">
            <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
                <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
                    Signup
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                >
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-lg font-medium text-gray-800"
                        >
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Username"
                            value={userName}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-lg font-medium text-gray-800"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={userEmail}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-lg font-medium text-gray-800"
                        >
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={userPassword}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="contact"
                            className="block text-lg font-medium text-gray-800"
                        >
                            Contact no. <span className="text-sm text-red-500">(optional)</span>:
                        </label>
                        <input
                            type="number"
                            id="contact"
                            placeholder="Contact Number"
                            value={userContact}
                            onChange={(e) => setContact(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-500 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
                    <div className="flex gap-2 item-center justify-center mt-2">
                        <h2>Already have an account?</h2>
                        <Link to='/login'><button className="text-blue-500 font-semibold cursor-pointer">Login </button></Link>
                    </div>
            </div>
        </div>
    );
};

export default Signuppage;

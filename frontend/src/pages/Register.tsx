import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface RegisterResponse {
  message?: string;
  error?: string;
}

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate =  useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setMessage("");
    setError("");
    try {
      const res = await axios.post<RegisterResponse>(
        "http://localhost:5000/api/v1/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );
      setMessage(res.data.message || "registered");
      navigate("/verify")
    } catch (error: any) {
      const msg = error.response?.data?.message || "Something went wrong.";
      setError(msg);
    }

   

    console.log(formData)
  };


  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Sign up form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-gray-900 underline hover:text-gray-700"
              >
                Login
              </a>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="m@example.com"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  required
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
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              // onClick={handleSubmit}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Right side - Testimonial */}
      {/* <div className="hidden lg:flex flex-1 bg-white items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md">
          <blockquote className="text-xl font-medium text-gray-900 leading-8">
            "The customer service I received was exceptional. The support team went above and beyond to address my
            concerns."
          </blockquote>
          <div className="mt-6">
            <div className="font-semibold text-gray-900">Jules Winnfield</div>
            <div className="text-gray-600">CEO, Acme Inc</div>
          </div>
        </div>
      </div> */}
      {message && <p className="text-green-600 text-center mt-4">{message}</p>}
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
    </div>
  );
};

export default Register;

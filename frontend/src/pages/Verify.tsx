import React, { useState } from 'react'

const Verify = () => {
    const [formData, setFormData] = useState({
            username: "",
            email: "",
            password: "",
          })
        
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({
              ...formData,
              [e.target.name]: e.target.value,
            })
          }
        
          const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            console.log("Form submitted:", formData)
            // Handle form submission here
          }
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Sign up form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Verify your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Doen't have an account?{" "}
              <a href="/register" className="text-gray-900 underline hover:text-gray-700">
                Signup
              </a>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
             

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  OTP
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
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
      </div>
  )
}

export default Verify
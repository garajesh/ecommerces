import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Contact <span className="text-indigo-600">Us</span>
        </h1>

        <p className="text-center text-gray-600 mb-12">
          We'd love to hear from you. Whether you have a question about a product, order, or anything else —
          our team is ready to help.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Our Address</h2>
              <p className="text-gray-600">123 Exclusive Street, Tech City, India</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Customer Support</h2>
              <p className="text-gray-600">Email: support@exclusive.com</p>
              <p className="text-gray-600">Phone: +91 98765 43210</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Business Hours</h2>
              <p className="text-gray-600">Monday – Saturday: 9 AM – 6 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows="4"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your message..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

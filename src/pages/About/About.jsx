import React from "react";
import {
  ShoppingCart,
  Truck,
  ShieldCheck,
  Headset
} from "lucide-react";


export default function About() {
  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          About <span className="text-indigo-600">Exclusive</span>
        </h1>
        <p className="text-lg text-gray-600 text-center mb-10">
          The future of online shopping – built for convenience, powered by trust.
        </p>

        {/* Intro Section */}
        <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">
          <img
            src="https://source.unsplash.com/600x400/?shopping,online"
            alt="Online Shopping"
            className="rounded-lg shadow-md"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Who We Are</h2>
            <p className="text-gray-600 mb-3">
              Exclusive is a next-generation e-commerce platform designed for modern shoppers. From electronics and fashion to home essentials, we bring quality products from trusted brands directly to your doorstep.
            </p>
            <p className="text-gray-600">
              With a strong focus on user experience, fast delivery, and secure transactions, we’ve quickly grown to become one of the most reliable online stores.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-3">
              To simplify online shopping through innovation, exceptional customer service, and a curated collection of products that meet every need.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">Our Vision</h2>
            <p className="text-gray-600">
              To become the most customer-centric e-commerce brand globally, where people can find anything they need online — easily and affordably.
            </p>
          </div>
          <img
            src="https://source.unsplash.com/600x400/?ecommerce,technology"
            alt="Ecommerce Innovation"
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Core Features */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 text-center">
  <div className="p-4 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
    <ShoppingCart className="mx-auto text-indigo-600 mb-4" size={40} />
    <h3 className="text-lg font-semibold text-gray-700">Wide Product Range</h3>
    <p className="text-sm text-gray-600">Explore thousands of quality items from top categories.</p>
  </div>

  <div className="p-4 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
    <Truck className="mx-auto text-indigo-600 mb-4" size={40} />
    <h3 className="text-lg font-semibold text-gray-700">Fast & Reliable Delivery</h3>
    <p className="text-sm text-gray-600">We deliver across the country within 2–5 working days.</p>
  </div>

  <div className="p-4 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
    <ShieldCheck className="mx-auto text-indigo-600 mb-4" size={40} />
    <h3 className="text-lg font-semibold text-gray-700">Secure Payments</h3>
    <p className="text-sm text-gray-600">Multiple payment options with 100% transaction security.</p>
  </div>

  <div className="p-4 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
    <Headset className="mx-auto text-indigo-600 mb-4" size={40} />
    <h3 className="text-lg font-semibold text-gray-700">24/7 Support</h3>
    <p className="text-sm text-gray-600">Our support team is here to assist you anytime.</p>
  </div>
</div>


        {/* Call to Action */}
        <div className="bg-indigo-600 text-white p-8 rounded-lg text-center shadow-md">
          <h2 className="text-2xl font-bold mb-2">Join Thousands of Happy Customers</h2>
          <p className="mb-4">Start shopping with Exclusive today and discover a better way to buy online.</p>
          <a
            href="/products"
            className="inline-block bg-white text-indigo-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}

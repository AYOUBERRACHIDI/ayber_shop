import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-orange-300 mb-6">Contact Us</h1>
        <p className="text-gray-700 mb-4">
          We'd love to hear from you! Whether you have a question, feedback, or
          just want to say hello, feel free to reach out to us.
        </p>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-orange-300 mb-2">
              Get in Touch
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> ayber@ayber.com
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Phone:</strong> +212 637 056 366
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Address:</strong> Sbata 04
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-orange-300 mb-2">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Your Name"
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
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-orange-300 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
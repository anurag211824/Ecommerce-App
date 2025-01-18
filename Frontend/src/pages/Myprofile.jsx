import React from "react";

const MyProfile = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-gray-800">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-center text-green-600 mb-8">My Profile</h1>
      
      {/* Personal Information */}
      <section className="mb-8 p-6 bg-gray-100 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Personal Information</h2>
        <div className="space-y-2">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john.doe@example.com</p>
          <p><strong>Phone:</strong> +123 456 7890</p>
        </div>
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Edit
        </button>
      </section>
      
      {/* Order History */}
      <section className="mb-8 p-6 bg-gray-100 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Order History</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Order #12345 - Delivered on 15 Jan 2025</li>
          <li>Order #12346 - Shipped on 16 Jan 2025</li>
          <li>Order #12347 - Processing</li>
        </ul>
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          View All Orders
        </button>
      </section>
      
      {/* Saved Addresses */}
      <section className="mb-8 p-6 bg-gray-100 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Saved Addresses</h2>
        <div className="space-y-2">
          <p><strong>Home:</strong> 123 Main Street, City, Country</p>
          <p><strong>Office:</strong> 456 Work Avenue, City, Country</p>
        </div>
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Add New Address
        </button>
      </section>
      
      {/* Account Settings */}
      <section className="p-6 bg-gray-100 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Account Settings</h2>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Change Password
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Logout
          </button>
        </div>
      </section>
    </div>
  );
};

export default MyProfile;

import React from "react";

export default function AdminProfileCard({ currentUser }) {
  return (
    <div className="w-[90%] mt-12 py-12 px-8 rounded-lg shadow-md md:w-2/5 border-2 mx-auto">
      <img
        src="/avatar.png"
        alt="profile icon"
        className="max-w-28 block mx-auto max-h-28   rounded-full object-cover border"
      />

      <div className="mt-4">
        <h1 className="text-center text-lg text-blue-500 font-extrabold">
          Name: {currentUser.name}
        </h1>
        <h1 className="text-center text-lg text-blue-500 font-extrabold">
          Email: {currentUser.email}
        </h1>
        <h1 className="text-center text-lg text-blue-500 font-extrabold">
          College: {currentUser.schoolName}
        </h1>
      </div>
    </div>
  );
}

import React from "react";

export default function StudentProfileCard({ currentUser }) {
  console.log(currentUser);

  const personalInformation = {
    dateOfBirth: "02/05/2000",
    parmanentAddress: "Muradpur, Baizid Bostami, Chattogram, Bangladesh.",
    presentAddress: "Muradpur, Baizid Bostami, Chattogram, Bangladesh.",
    contactNumber: "+88 01234567890",
    email: "example@email.com",
    emergencyNumber: "+088 01234567890",
  };
  return (
    <div className="mx-auto w-[90%] md:w-4/5 mt-12 border-2 p-8 shadow-md">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <img
            src={currentUser.image || "/avatar.png"}
            alt="profile"
            className="w-20 md:w-24 lg:w-28 h-20 md:h-24 lg:h-28 rounded-full"
          />
        </div>

        <div className="col-span-2 mt-4">
          <h1>Full name : {currentUser?.name}</h1>
          <h1>Roll : {currentUser?.rollNum}</h1>
          <h1>Class : {currentUser?.sclassName.sclassName}</h1>
          <h1>Institute : {currentUser?.school.schoolName} </h1>
        </div>
      </div>

    <hr  className="my-4 border"/>
      <div>
        <h1 className="text-2xl font-bold my-4">Personal information</h1>
        <div>
          <h3 className="text-sm md:text-md">
            Email : <span className="font-semibold">{personalInformation.email}</span>
          </h3>
          <h3 className="text-sm md:text-md">
            Contact number : <span className="font-semibold">{personalInformation.contactNumber}</span>
          </h3>
          <h3 className="text-sm md:text-md">
            Emergency number : <span className="font-semibold">{personalInformation.emergencyNumber}</span>
          </h3>
          <h3 className="text-sm md:text-md">
            Parmanent address : <span className="font-semibold">{personalInformation.parmanentAddress}</span>
          </h3>
          <h3 className="text-sm md:text-md">
            Present address : <span className="font-semibold">{personalInformation.presentAddress}</span>
          </h3>
        </div>
      </div>
    </div>
  );
}

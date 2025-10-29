"use client";

import Loading from "@/src/components/ui/Loading";
import { useGetAdminById } from "@/src/hooks/admin.hook";
import { useGetDoctorById } from "@/src/hooks/doctor.hook";
import { useGetPatientById } from "@/src/hooks/patient.hook";
import useUserData from "@/src/hooks/user.hook";
import { TAdmin, TDoctor, TPatient, TUserRole } from "@/src/types/user";
import { Divider } from "@heroui/divider";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FaUserMd,
  FaUser,
  FaShieldAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaStethoscope,
  FaAward,
  FaClock,
  FaCamera,
} from "react-icons/fa";

const mockUser = {
  role: "doctor" as TUserRole,
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@citymed.com",
  phone: "+1 (555) 123-4567",
  avatar: "/doctor-avatar.jpg",
  specialty: "Cardiologist",
  hospital: "City Medical Center",
  experience: "12+ years",
  bio: "Passionate cardiologist dedicated to providing comprehensive heart care with empathy and precision. Specializing in preventive cardiology and advanced cardiac imaging.",
  available: "Mon-Fri, 9 AM – 5 PM",
  // patient
  // dob: '1985-03-12',
  // gender: 'female',
  // admin
  // department: 'IT',
};

export default function ProfilePage() {
  const { user } = useUserData();
  const userRole = user?.role as TUserRole;

  const { data, isPending, isError } =
    userRole === "patient"
      ? useGetPatientById(user?._id || "")
      : userRole === "doctor"
      ? useGetDoctorById(user?._id || "")
      : useGetAdminById(user?._id || "");

  const patientData =
    userRole === "patient" ? (data?.data as TPatient) : undefined;
  const doctorData =
    userRole === "doctor" ? (data?.data as TDoctor) : undefined;
  const adminData = userRole === "admin" ? (data?.data as TAdmin) : undefined;
  const myData = patientData || doctorData || adminData;

  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState(user?.profileImg);

  const role = mockUser.role;
  const RoleIcon =
    role === "doctor" ? FaUserMd : role === "patient" ? FaUser : FaShieldAlt;

  // set profile img
  useEffect(() => {
    setPreview(user?.profileImg);
  }, [user]);

  if (isPending) {
    return <Loading />;
  }

  console.log({ myData, patientData, doctorData, adminData });

  return (
    <div className="min-h-screen p-4">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white flex flex-col md:flex-row items-center gap-8 p-5 rounded-md shadow">
        {/* Avatar */}
        <div className="relative group">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl">
            {preview ? (
              <Image
                src={preview}
                alt={user?.name || "Profile Image"}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-500 to-purple-600 text-4xl font-bold text-white">
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
          </div>

          {isEditing && (
            <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-60 group-hover:opacity-100 transition cursor-pointer rounded-full z-20">
              <FaCamera className="w-8 h-8 text-white" />
              {/* Your custom <Input type="file" /> goes here */}
            </label>
          )}

          <div className="absolute inset-0 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl opacity-70 z-10 animate-pulse" />
        </div>

        {/* Name & Role */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{user?.name}</h1>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <RoleIcon className="w-5 h-5" />
            <span className="capitalize font-medium">{user?.role}</span>
          </div>
        </div>

        {/* Edit Button */}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/30 transition"
          >
            <FaEdit className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>

      <section className="px-4 mt-8">
        <div className="max-w-4xl mx-auto">
          {!isEditing && (
            <div className="space-y-8">
              {/* Personal Info */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Personal Information
                </h2>
                <Divider className="mb-4" />
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-medium">{myData?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium flex items-center gap-2">
                      <FaEnvelope className="w-4 h-4 text-blue-600" />
                      {myData?.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium flex items-center gap-2">
                      <FaPhone className="w-4 h-4 text-green-600" />
                      {myData?.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-medium flex items-center gap-2">
                      {myData?.gender}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">District</p>
                    <p className="font-medium flex items-center gap-2">
                      {myData?.district}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p className="font-medium flex items-center gap-2">
                      {moment(myData?.dateOfBirth).format("MMMM D, YYYY")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Doctor View */}
              {role === "doctor" && (
                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-700 mb-4">
                    <FaStethoscope className="w-5 h-5" />
                    Professional Details
                  </h2>
                  <Divider className="mb-4" />
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600">Specialty</p>
                      <p className="font-medium">{mockUser.specialty}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Hospital</p>
                      <p className="font-medium">{mockUser.hospital}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Experience</p>
                      <p className="font-medium flex items-center gap-2">
                        <FaAward className="w-4 h-4 text-amber-600" />
                        {mockUser.experience}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Availability</p>
                      <p className="font-medium flex items-center gap-2">
                        <FaClock className="w-4 h-4 text-purple-600" />
                        {mockUser.available}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-gray-600">Bio</p>
                    <p className="mt-1 text-gray-800 leading-relaxed">
                      {mockUser.bio}
                    </p>
                  </div>
                </div>
              )}

              {/* Patient View */}
              {role === "patient" && (
                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-green-700 mb-4">
                    <FaUser className="w-5 h-5" />
                    Patient Details
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600">Date of Birth</p>
                      <p className="font-medium">March 12, 1985</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Gender</p>
                      <p className="font-medium">Female</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Admin View */}
              {role === "admin" && (
                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-purple-700 mb-4">
                    <FaShieldAlt className="w-5 h-5" />
                    Admin Details
                  </h2>
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-medium">IT & Systems</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* EDIT MODE – Replace with your <Form> and <Input> */}
          {isEditing && (
            <div className="space-y-8">
              {/* Personal Info */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    {/* Your custom Input */}
                    <input
                      type="text"
                      defaultValue={mockUser.name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={mockUser.email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue={mockUser.phone}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Doctor Edit */}
              {role === "doctor" && (
                <div className="bg-white rounded-xl shadow p-6 space-y-6">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-700">
                    <FaStethoscope className="w-5 h-5" />
                    Professional Details
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specialty
                      </label>
                      <input
                        defaultValue={mockUser.specialty}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hospital
                      </label>
                      <input
                        defaultValue={mockUser.hospital}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Experience
                      </label>
                      <input
                        defaultValue={mockUser.experience}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Availability
                      </label>
                      <input
                        defaultValue={mockUser.available}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      defaultValue={mockUser.bio}
                      rows={4}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Patient Edit */}
              {role === "patient" && (
                <div className="bg-white rounded-xl shadow p-6 space-y-6">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-green-700">
                    <FaUser className="w-5 h-5" />
                    Patient Details
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        defaultValue="1985-03-12"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        defaultValue="female"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Edit */}
              {role === "admin" && (
                <div className="bg-white rounded-xl shadow p-6 space-y-6">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-purple-700">
                    <FaShieldAlt className="w-5 h-5" />
                    Admin Details
                  </h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <input
                      defaultValue="IT & Systems"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <FaTimes className="w-4 h-4" />
                  Cancel
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition">
                  <FaSave className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

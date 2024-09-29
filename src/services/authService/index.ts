"use server";

import axiosInstance from "@/src/lib/axiosInstance";
import { TPatient, TSignin } from "@/src/types/user";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const registerPatient = async (payload: TPatient) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(payload));

  // Append image file if present
  //   if (fileList.length > 0 && fileList[0]?.originFileObj) {
  //     console.log(fileList[0].originFileObj, "fileList[0].originFileObj");
  //     formData.append("file", fileList[0].originFileObj);
  //   }
  try {
    const response = await axiosInstance.post(`/user/create-patient`, formData);
    console.log(response, "response from register patient service");
    return response.data;
  } catch (e: any) {
    console.error(e.response?.data?.message || e.message, "error");
    throw new Error(e.response?.data?.message || e.message);
  }
};

const signinUser = async (payload: TSignin) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, payload);
    if (response.data?.success) {
      cookies().set("DEaccessToken", response?.data?.data?.accessToken);
      cookies().set("DErefreshToken", response?.data?.data?.refreshToken);
    }
    return response.data;
  } catch (e: any) {
    console.error(e.response?.data?.message || e.message, "error");
    throw new Error(e.response?.data?.message || e.message);
  }
};

const signOut = () => {
  cookies().delete("DEaccessToken");
  cookies().delete("DErefreshToken");
};

const getCurrentUser = async () => {
  const accessToken = cookies().get("DEaccessToken")?.value;
  let decodedToken = null;
  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return {
      _id: decodedToken?._id,
      email: decodedToken?.email,
      role: decodedToken?.role,
    };
  }
  return decodedToken;
};

export { registerPatient, signinUser, getCurrentUser, signOut };

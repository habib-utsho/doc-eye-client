"use server";

import axiosInstance from "@/src/lib/axiosInstance";
import { TPatient, TSignin } from "@/src/types/user";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const registerPatient = async (payload: FormData) => {
  // const formData = new FormData();
  // formData.append("data", JSON.stringify(payload));

  // Append image file if present
  //   if (fileList.length > 0 && fileList[0]?.originFileObj) {
  //     console.log(fileList[0].originFileObj, "fileList[0].originFileObj");
  //     formData.append("file", fileList[0].originFileObj);
  //   }
  try {
    const response = await axiosInstance.post(`/user/create-patient`, payload);
    return response.data;
  } catch (e: any) {
    throw new Error(
      `${e?.response?.data?.errorSources?.[0]?.path}: ${e.response?.data?.errorSources?.[0]?.message}` ||
        e?.response?.data ||
        e.message
    );
  }
};
const registerDoctor = async (payload: FormData) => {
  // const formData = new FormData();
  // formData.append("data", JSON.stringify(payload));

  // Append image file if present
  //   if (fileList.length > 0 && fileList[0]?.originFileObj) {
  //     console.log(fileList[0].originFileObj, "fileList[0].originFileObj");
  //     formData.append("file", fileList[0].originFileObj);
  //   }
  try {
    const response = await axiosInstance.post(`/user/create-doctor`, payload);
    return response.data;
  } catch (e: any) {
    throw new Error(
      `${
        e?.response?.data?.errorSources?.[0]?.path &&
        `${e?.response?.data?.errorSources?.[0]?.path}:`
      } ${e.response?.data?.errorSources?.[0]?.message}` ||
        e?.response?.data ||
        e.message ||
        "Failed to register doctor!"
    );
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
    throw new Error(
      `${
        e?.response?.data?.errorSources?.[0]?.path &&
        `${e?.response?.data?.errorSources?.[0]?.path}:`
      } ${e.response?.data?.errorSources?.[0]?.message}` ||
        e?.response?.data ||
        e.message ||
        "Failed to register doctor!"
    );
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

export { registerPatient, registerDoctor, signinUser, getCurrentUser, signOut };

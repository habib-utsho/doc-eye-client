"use server";

import axiosInstance from "@/src/lib/axiosInstance";
import { TPatient, TSignin } from "@/src/types/user";
import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const registerAdmin = async (payload: FormData) => {
  try {
    const response = await axiosInstance.post(`/user/create-admin`, payload);
    revalidateTag("admin");
    return response.data;
  } catch (e: any) {
    throw new Error(
      `${e?.response?.data?.errorSources?.[0]?.path}: ${e.response?.data?.errorSources?.[0]?.message}` ||
      e?.response?.data ||
      e.message ||
      "Failed to register admin!"
    );
  }
};
const registerPatient = async (payload: FormData) => {
  try {
    const response = await axiosInstance.post(`/user/create-patient`, payload);
    revalidateTag("patient");
    return response.data;
  } catch (e: any) {
    throw new Error(
      `${e?.response?.data?.errorSources?.[0]?.path}: ${e.response?.data?.errorSources?.[0]?.message}` ||
      e?.response?.data ||
      e.message ||
      "Failed to register patient!"
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
    revalidateTag("doctor");
    return response.data;
  } catch (e: any) {
    throw new Error(
      `${e?.response?.data?.errorSources?.[0]?.path &&
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
      `${e?.response?.data?.errorSources?.[0]?.path &&
      `${e?.response?.data?.errorSources?.[0]?.path}:`
      } ${e.response?.data?.errorSources?.[0]?.message}` ||
      e?.response?.data ||
      e.message ||
      "Failed to register doctor!"
    );
  }
};

const toggleUserStatus = async (id: string) => {
  try {
    const response = await axiosInstance.patch(`/user/toggle-status/${id}`);
    revalidateTag(response?.data?.data?.role || "user");
    return response.data;
  } catch (e: any) {
    throw new Error(
      `${e?.response?.data?.errorSources?.[0]?.path &&
      `${e?.response?.data?.errorSources?.[0]?.path}:`
      } ${e.response?.data?.errorSources?.[0]?.message}` ||
      e?.response?.data ||
      e.message ||
      "Failed to toggle user status!"
    );
  }
};

const signOut = () => {
  cookies().delete("DEaccessToken");
  cookies().delete("DErefreshToken");
};

const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("DEaccessToken")?.value;
  let decodedToken = null;
  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      userId: decodedToken?.userId,
      _id: decodedToken?._id,
      email: decodedToken?.email,
      role: decodedToken?.role,
      name: decodedToken?.name,
      profileImg: decodedToken?.profileImg,
    };
  }
  return decodedToken;
};

export {
  registerAdmin,
  registerPatient,
  registerDoctor,
  signinUser,
  toggleUserStatus,
  getCurrentUser,
  signOut,
};

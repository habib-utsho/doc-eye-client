"use server";

import axiosInstance from "@/src/lib/axiosInstance";
import { TSignin } from "@/src/types/user";
import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const registerAdmin = async (payload: FormData) => {
  try {
    const response = await axiosInstance.post(`/user/create-admin`, payload);
    revalidateTag("admin");
    return response.data;
  } catch (e: unknown) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to register admin!");
    throw new Error(message);
  }
};
const registerPatient = async (payload: FormData) => {
  try {
    const response = await axiosInstance.post(`/user/create-patient`, payload);
    revalidateTag("patient");
    return response.data;
  } catch (e: unknown) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to register patient!");
    throw new Error(message);
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
  } catch (e: unknown) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to register doctor!");
    throw new Error(message);
  }
};


// Signin user(Not used directly in client components due to cookies handling)
const signinUser = async (payload: TSignin) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, payload);

    if (response.data?.success) {
      const cookieStore = await cookies();
      cookieStore.delete("DEaccessToken");
      cookieStore.delete("DErefreshToken");
      // Set the tokens in cookies
      cookieStore.set("DEaccessToken", response?.data?.data?.accessToken);
      cookieStore.set("DErefreshToken", response?.data?.data?.refreshToken);
    }
    return response.data;
  } catch (e: any) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to register doctor!");
    throw new Error(message);
  }
};

const toggleUserStatus = async (id: string) => {
  try {
    const response = await axiosInstance.patch(`/user/toggle-status/${id}`);
    revalidateTag(response?.data?.data?.role || "user");
    return response.data;
  } catch (e: unknown) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to toggle user status!");
    throw new Error(message);
  }
};

const signOut = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("DEaccessToken");
  cookieStore.delete("DErefreshToken");
};

const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("DEaccessToken")?.value;


  if (!accessToken) return null;
  let decoded = null;
  try {

    decoded = await jwtDecode(accessToken);

    // if expired
    if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
      const refreshed = await refreshToken();
      if (refreshed) {
        const newAccessToken = cookieStore.get("DEaccessToken")?.value;
        if (newAccessToken) {
          decoded = await jwtDecode(newAccessToken);
        }
      } else {
        return null;
      }
    }

    return {
      userId: decoded?.userId,
      _id: decoded?._id,
      email: decoded?.email,
      role: decoded?.role,
      name: decoded?.name,
      profileImg: decoded?.profileImg,
    };
  } catch (e) {
    return null
  }
};

const refreshToken = async () => {
  try {
    const cookieStore = await cookies();
    const DErefreshToken = cookieStore.get("DErefreshToken")?.value;


    if (!DErefreshToken) {
      return null;
    }
    // The refresh token is already in the cookies, so we just call the endpoint.
    const response = await axiosInstance.post(`/auth/refresh-token`, { DErefreshToken }
      // {
      //   // Important: include cookies in the request
      //   withCredentials: true,
      // }
    );

    if (response.data?.success && response.data?.data) {
      const accessToken = response.data?.data?.accessToken;
      const refreshToken = response.data?.data?.refreshToken;

      // Production requires sameSite: "none" for cross-origin cookies
      // Development can use "lax" or "strict"
      // const isProduction = process.env.NODE_ENV === "production";

      // const cookieOptions = {
      //   httpOnly: true,
      //   secure: isProduction,
      //   sameSite: (isProduction ? "none" : "lax") as "none" | "lax",
      // };

      // Store the new tokens in cookies
      const cookieStore = await cookies();
      cookieStore.delete("DEaccessToken");
      cookieStore.delete("DErefreshToken");
      cookieStore.set("DEaccessToken", accessToken);
      cookieStore.set("DErefreshToken", refreshToken);

      return response.data;
    }

    return null;
  } catch {
    const cookieStore = await cookies();
    cookieStore.delete("DEaccessToken");
    cookieStore.delete("DErefreshToken");
    return null;
  }
};


export {
  registerAdmin,
  registerPatient,
  registerDoctor,
  signinUser,
  toggleUserStatus,
  getCurrentUser,
  signOut,
  refreshToken
};

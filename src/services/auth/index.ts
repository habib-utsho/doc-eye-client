"use server";

import axiosInstance from "@/src/lib/axiosInstance";
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


// Signin user (Not used directly in client components due to cookies handling  )
// const signinUser = async (payload: TSignin) => {
//   try {
//     const response = await axiosInstance.post(`/auth/login`, payload, {
//       withCredentials: true,
//     });

//     // if (response.data?.success) {
//     //   cookies().set("DEaccessToken", response?.data?.data?.accessToken);
//     //   cookies().set("DErefreshToken", response?.data?.data?.refreshToken);
//     // }
//     return response.data;
//   } catch (e: any) {
//     throw new Error(
//       `${e?.response?.data?.errorSources?.[0]?.path &&
//       `${e?.response?.data?.errorSources?.[0]?.path}:`
//       } ${e.response?.data?.errorSources?.[0]?.message}` ||
//       e?.response?.data ||
//       e.message ||
//       "Failed to register doctor!"
//     );
//   }
// };

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
      const { accessToken } = response.data?.data;

      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "strict" as const,
      };

      // Store the new tokens in cookies
      const cookieStore = await cookies();
      cookieStore.set("DEaccessToken", accessToken, cookieOptions);

      return response.data;
    }

    return null;
  } catch (error: any) {
    // console.error("❌ Refresh token failed:", error, error?.message);
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
  // signinUser,
  toggleUserStatus,
  getCurrentUser,
  signOut,
  refreshToken
};

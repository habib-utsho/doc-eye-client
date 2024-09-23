"use server";

import axiosInstance from "@/src/lib/axiosInstance";
import { TPatient } from "@/src/types/user";

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

export { registerPatient };

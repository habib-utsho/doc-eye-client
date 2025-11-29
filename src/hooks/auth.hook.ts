import { useMutation } from "@tanstack/react-query";
import { TChangePassword, TDecodedUser, TForgetPassword, TResetPassword, TSignin } from "../types/user";
import {
  changePassword,
  getCurrentUser,
  registerAdmin,
  registerDoctor,
  registerPatient,
  resetPassword,
  signinUser,
  toggleUserStatus,
} from "../services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUserData from "./user.hook";

export const useUserSignin = ({ redirect }: { redirect: string | null }) => {
  const router = useRouter();
  const { setUser } = useUserData();
  return useMutation({
    mutationKey: ["signinUser"],
    mutationFn: async (payload: TSignin) => await signinUser(payload),
    async onSuccess(data) {
      if (data?.success) {
        try {

          const user = (await getCurrentUser()) as TDecodedUser;
          setUser(user);
          router.push(
            redirect ||
            (user?.role === "admin" || user?.role === "doctor"
              ? `dashboard/${user?.role}`
              : "/")
          );
        } catch {
          setUser(null);
          router.push("/signin");
        }
      } else {
        toast.error(data?.message || "Failed to signin user!");
      }
    }
  });
};
export const useChangePassword = () => {
  return useMutation({
    mutationKey: ["changePassword"],
    mutationFn: async (payload: TChangePassword) => await changePassword(payload),
    onSuccess(data) {
      toast.success(data?.message || "Password changed successfully!");
    },
    onError(error: any) {
      toast.error(error?.message || "Failed to change password!");
    }

  });
};
export const useForgetPassword = () => {
  return useMutation({
    mutationKey: ["forgetPassword"],
    mutationFn: async (payload: TForgetPassword) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/forget-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errorSource = errorData?.errorSources?.[0];
        const message = errorSource?.path
          ? `${errorSource.path}: ${errorSource.message}`
          : (errorSource?.message || errorData?.message || "Failed to forget password!");
        throw new Error(message);
      }

      return response.json();
    },

  });
};
export const useResetPassword = () => {
  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: async (payload: TResetPassword) => await resetPassword(payload),
  });
};


export const useUserRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["registerPatient"],
    mutationFn: async (payload: FormData) => await registerPatient(payload),
    onSuccess(data) {
      if (data?.success) {
        // toast.success(data?.message || "User registered successfully!");
        router.push("/signin");
      } else {
        toast.error(data?.message || "Failed to register user!");
      }
    }
  });
};
export const useDoctorRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["registerDoctor"],
    mutationFn: async (payload: FormData) => await registerDoctor(payload),
    onSuccess(data) {
      if (data?.success) {
        // toast.success(
        //   data?.message ||
        //   "Doctor registered successfully. Wait for admin approval!"
        // );
        router.push("/signin");
      } else {
        toast.error(data?.message || "Failed to register doctor!");
      }
    }
  });
};
export const useAdminRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["registerAdmin"],
    mutationFn: async (payload: FormData) => await registerAdmin(payload),
    onSuccess(data) {
      if (data?.success) {
        toast.success(data?.message || "Admin registered successfully!");
        router.push("/signin");
      } else {
        toast.error(data?.message || "Failed to register admin!");
      }
    },
    onError(error: any) {
      toast.error(error?.message || "Failed to register admin!");
    },
  });
};
export const useToggleUserStatus = () => {
  return useMutation({
    mutationKey: ["toggleUserStatus"],
    mutationFn: async (id: string) => await toggleUserStatus(id),
    onSuccess(data) {
      if (data?.success) {
        toast.success(data?.message || `User is toggled successfully!`);
      } else {
        toast.error(data?.message || "Failed to toggled user!");
      }
    },
    onError(error: any) {
      toast.error(error?.message || "Failed to toggled user!");
    },
  });
};



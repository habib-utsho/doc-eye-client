import { useMutation } from "@tanstack/react-query";
import { TDecodedUser, TSignin } from "../types/user";
import {
  getCurrentUser,
  registerAdmin,
  registerDoctor,
  registerPatient,
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



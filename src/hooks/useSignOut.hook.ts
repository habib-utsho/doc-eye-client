import { signOut } from "@/src/services/auth";
import { usePathname, useRouter } from "next/navigation";
import useUserData from "@/src/hooks/user.hook";
import { protectedRoutes } from "@/src/constant";

export const useSignOut = () => {
  const { setUser } = useUserData();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    signOut();
    setUser(null);

    const isMatchProtectedRoute = protectedRoutes?.some((route) => {
      const partial = route?.split("/")?.[1];
      return pathname.match(partial);
    });

    if (isMatchProtectedRoute) {
      router.push(`/signin?redirect=${pathname}`);
    }
  };

  return { handleSignOut };
};

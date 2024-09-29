import SidebarLoading from "@/src/app/(withDashboardLayout)/dashboard/_components/SidebarLoading";
import { GithubIcon, SignOutIcon } from "@/src/assets/img/icons";
import useUserData from "@/src/hooks/user.hook";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";

// Dashboard routes
type TSidebarRoute = {
  name: string;
  path: string;
};
const adminRoutes: TSidebarRoute[] = [
  { name: "Dashboard", path: "/dashboard/admin" },
  { name: "Manage Specialty", path: "/dashboard/admin/specialty" },
  { name: "Manage Users", path: "/dashboard/admin/manage-users" },
  { name: "Appointments", path: "/dashboard/admin/appointments" },
  {
    name: "Consultation History",
    path: "/dashboard/admin/consultation-history",
  },
  { name: "Payment History", path: "/dashboard/payment-history" },
  { name: "Profile", path: "/dashboard/admin/profile" },
  { name: "Change password", path: "/dashboard/admin/change-password" },
];
const doctorRoutes: TSidebarRoute[] = [
  { name: "Dashboard", path: "/dashboard/doctor" },
  { name: "Manage Patient", path: "/dashboard/doctor/manage-patient" },
  { name: "Appointments", path: "/dashboard/doctor/appointments" },
  {
    name: "Consultation History",
    path: "/dashboard/doctor/consultation-history",
  },
  { name: "Payment History", path: "/dashboard/doctor/payment-history" },
  { name: "Profile", path: "/dashboard/doctor/profile" },
  { name: "Change password", path: "/dashboard/doctor/change-password" },
];
const patientRoutes: TSidebarRoute[] = [
  { name: "Dashboard", path: "/dashboard/patient" },
  { name: "Appointments", path: "/dashboard/patient/appointments" },
  {
    name: "Consultation History",
    path: "/dashboard/patient/past-consultation",
  },
  { name: "Specialties", path: "/specialty" },
  { name: "Payment History", path: "/dashboard/patient/payment-history" },
  { name: "Favorite Doctors", path: "/dashboard/patient/favorite-doctors" },
  { name: "Profile", path: "/dashboard/patient/profile" },
  { name: "Change Password", path: "/dashboard/patient/change-password" },
];

const Sidebar = () => {
  const { isLoading, user } = useUserData();

  if (isLoading) return <SidebarLoading />;

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-700 rounded-r-md w-[200px] sticky top-0 left-0 pb-12">
      <Link href={"/"} className="text-lg text-center pt-4 pb-2 block">
        Doc Eye
      </Link>

      <ul className="rounded mt-4 mb-2 px-2">
        {(user?.role === "patient"
          ? patientRoutes
          : user?.role === "doctor"
          ? doctorRoutes
          : adminRoutes
        ).map((route: TSidebarRoute) => (
          <li
            key={route.path}
            className="bg-gray-500 dark:bg-gray-600 hover:bg-primary text-white transition-all duration-500  border-y border-gray-50 dark:border-gray-500 text-sm rounded-md"
          >
            <Link href={route.path} className={"block p-2 px-3"}>
              {route.name}
            </Link>
          </li>
        ))}
      </ul>

      <Button
        startContent={<SignOutIcon className="size-5 " />}
        className="w-full absolute bottom-1 text-red-500"
      >
        Signout
      </Button>
    </div>
  );
};

export default Sidebar;

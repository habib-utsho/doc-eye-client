import SidebarLoading from "@/src/app/(withDashboardLayout)/dashboard/_components/SidebarLoading";
import {
  MenuIcon,
  SignOutIcon,
  UsersIcon,
  XMarkIcon,
} from "@/src/components/ui/icons";
import {
  DashboardOutlined,
  UserOutlined,
  HistoryOutlined,
  SettingOutlined,
  LockOutlined,
  DollarOutlined,
  HeartOutlined,
  BellOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import logo from "@/src/assets/img/logo.png";
import useUserData from "@/src/hooks/user.hook";
import { Button } from "@heroui/button";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar as ReactProSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { signOut } from "@/src/services/auth";
import { protectedRoutes } from "@/src/constant";

// Dashboard routes
type TSidebarRoute = {
  name: string;
  path?: string;
  children?: TSidebarRoute[];
  icon?: JSX.Element;
};

const adminRoutes: TSidebarRoute[] = [
  { name: "Dashboard", path: "/dashboard/admin", icon: <DashboardOutlined /> },
  {
    name: "Manage Specialty",
    path: "/dashboard/admin/specialty",
    icon: <SettingOutlined />,
  },
  {
    name: "Manage Users",
    icon: <UsersIcon />,
    children: [
      {
        name: "Patient",
        path: "/dashboard/admin/patients",
        icon: <UserOutlined />,
      },
      {
        name: "Doctor",
        path: "/dashboard/admin/doctors",
        icon: <UserOutlined />,
      },
      {
        name: "Admin",
        path: "/dashboard/admin/admins",
        icon: <UserOutlined />,
      },
    ],
  },
  {
    name: "Appointments",
    path: "/dashboard/admin/appointments",
    icon: <HistoryOutlined />,
  },
  {
    name: "Consultation History",
    path: "/dashboard/admin/consultation-history",
    icon: <HistoryOutlined />,
  },
  {
    name: "Payment History",
    path: "/dashboard/payment-history",
    icon: <DollarOutlined />,
  },
  { name: "Profile", path: "/dashboard/admin/profile", icon: <UserOutlined /> },
  {
    name: "Change password",
    path: "/dashboard/admin/change-password",
    icon: <LockOutlined />,
  },
];

const doctorRoutes: TSidebarRoute[] = [
  { name: "Dashboard", path: "/dashboard/doctor", icon: <DashboardOutlined /> },
  {
    name: "Manage Patient",
    path: "/dashboard/doctor/manage-patient",
    icon: <UserOutlined />,
  },
  {
    name: "Appointments",
    path: "/dashboard/doctor/appointments",
    icon: <HistoryOutlined />,
  },
  {
    name: "Consultation History",
    path: "/dashboard/doctor/consultation-history",
    icon: <HistoryOutlined />,
  },
  {
    name: "Payment History",
    path: "/dashboard/doctor/payment-history",
    icon: <DollarOutlined />,
  },
  {
    name: "Profile",
    path: "/dashboard/doctor/profile",
    icon: <UserOutlined />,
  },
  {
    name: "Change password",
    path: "/dashboard/doctor/change-password",
    icon: <LockOutlined />,
  },
];

const patientRoutes: TSidebarRoute[] = [
  {
    name: "Dashboard",
    path: "/dashboard/patient",
    icon: <DashboardOutlined />,
  },
  {
    name: "Appointments",
    path: "/dashboard/patient/appointments",
    icon: <HistoryOutlined />,
  },
  {
    name: "Consultation History",
    path: "/dashboard/patient/past-consultation",
    icon: <HistoryOutlined />,
  },
  { name: "Specialties", path: "/specialty", icon: <SettingOutlined /> },
  {
    name: "Payment History",
    path: "/dashboard/patient/payment-history",
    icon: <DollarOutlined />,
  },
  {
    name: "Favorite Doctors",
    path: "/dashboard/patient/favorite-doctors",
    icon: <HeartOutlined />,
  },
  {
    name: "Profile",
    path: "/dashboard/patient/profile",
    icon: <UserOutlined />,
  },
  {
    name: "Change Password",
    path: "/dashboard/patient/change-password",
    icon: <LockOutlined />,
  },
  {
    name: "Settings",
    icon: <SettingOutlined />,
    children: [
      {
        name: "Notification",
        path: "/dashboard/patient/settings/notification",
        icon: <BellOutlined />,
      },
      {
        name: "Language",
        path: "/dashboard/patient/settings/language",
        icon: <GlobalOutlined />,
      },
    ],
  },
];

const Sidebar = () => {
  const { isLoading, user, setUser } = useUserData();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  if (isLoading) return <SidebarLoading />;

  const routes =
    user?.role === "patient"
      ? patientRoutes
      : user?.role === "doctor"
      ? doctorRoutes
      : adminRoutes;

  const renderRoutes = (routes: TSidebarRoute[]) => {
    return routes.map((route) => {
      if (route.children) {
        return (
          <SubMenu key={route.name} label={route.name} icon={route.icon}>
            {renderRoutes(route.children)}
          </SubMenu>
        );
      }
      return (
        <MenuItem
          key={route.path}
          component={<Link href={route.path || "#"} />}
          active={pathname === route.path}
          icon={route.icon}
        >
          {route.name}
        </MenuItem>
      );
    });
  };

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
  // console.log();

  return (
    <ReactProSidebar
      collapsed={collapsed}
      width="230px"
      collapsedWidth="80px"
      rtl={false}
      toggled
      backgroundColor="#f5f5f5"
      breakPoint="md"
      transitionDuration={300}
      className="h-screen bg-gray-100 rounded-r-md w-[200px] sticky top-0 left-0"
      rootStyles={{
        position: "sticky",
        height: "100vh",
        width: "200px",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: "#13395e",
              color: "#b6c8d9",
            },
          },
        }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
            <Image src={logo} height={40} width={40} alt="logo" />
            {!collapsed && <p className="font-bold text-inherit">DocEye</p>}
          </Link>
          <span
            onClick={() => setCollapsed(!collapsed)}
            className="bg-primary text-white rounded-l  cursor-pointer text-[12px] absolute right-0 top-[25px]"
          >
            {collapsed ? <MenuIcon /> : <XMarkIcon />}
          </span>
        </div>

        {/* Dynamic Routes */}
        {renderRoutes(routes)}

        {/* Sign Out Button */}
        <MenuItem className="mt-auto">
          <Button
            className="text-red-500 w-full"
            onPress={handleSignOut}
            startContent={<SignOutIcon className="size-5" />}
            isIconOnly={collapsed ? true : false}
          >
            {collapsed ? "" : "Signout"}
          </Button>
        </MenuItem>
      </Menu>
    </ReactProSidebar>
  );

  // Original return
  return (
    <div className="h-screen bg-white dark:bg-gray-700 border-r w-[200px] sticky top-0 left-0 pb-12">
      <Link className="flex items-center justify-center gap-1 pt-3" href="/">
        <Image src={logo} height={40} width={40} alt="logo" />
        <p className="font-bold text-inherit">DocEye</p>
      </Link>

      <ul className="rounded mt-4 mb-2 px-2 space-y-1">
        {routes.map((route: TSidebarRoute) => {
          const isMatch = pathname === route.path;
          if (!route.path) return null;
          return (
            <li
              key={route.path}
              className={`${
                isMatch ? "bg-[#ededed] dark:bg-gray-600" : ""
              }  hover:bg-[#dadada] dark:hover:bg-gray-500 transition-all duration-500 text-sm rounded-md`}
            >
              <Link href={route.path} className={"block p-2 px-3"}>
                {route.name}
              </Link>
            </li>
          );
        })}
      </ul>

      <Button
        startContent={<SignOutIcon className="size-5 " />}
        className="absolute bottom-1 left-0 right-0 text-red-500 w-[92%] mx-auto"
      >
        Signout
      </Button>
    </div>
  );
};

export default Sidebar;

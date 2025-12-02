import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "./services/auth";
import { TDecodedUser } from "./types/user";

// This function can be marked `async` if using `await` inside
const authRoutes = ["/signin", "/signup"];

type TRole = keyof typeof roleBaseRoutes;

const roleBaseRoutes: Record<string, RegExp[]> = {
  admin: [
    /^\/dashboard\/admin/,
    /^\/dashboard\/admin\/.*/,
  ],
  doctor: [
    /^\/dashboard\/doctor/,
    /^\/dashboard\/doctor\/.*/,
  ],
  patient: [
    /^\/dashboard\/patient/,
    /^\/dashboard\/patient\/.*/,
  ],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = (await getCurrentUser()) as TDecodedUser | null;


  //  Still no user → not authenticated → redirect to signin
  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(
      new URL(`/signin?redirect=${pathname}`, request.url)
    );
  }


  // If authenticated user tries to access auth routes, redirect to home/dashboard
  if (user?.role && roleBaseRoutes[user?.role as TRole]) {
    const roleRoutes = roleBaseRoutes[user?.role as TRole];
    const isMatched = roleRoutes.some((route) => pathname.match(route));
    if (isMatched) {
      return NextResponse.next();
    }
  }

  // return NextResponse.redirect(new URL("/", request.url));
  //  If not allowed ; send to their own dashboard (not home page!)
  return NextResponse.redirect(new URL(getDashboardPath(user?.role), request.url));
}


// Helper: return correct dashboard home
function getDashboardPath(role: string) {
  const map: Record<string, string> = {
    admin: "/dashboard/admin",
    doctor: "/dashboard/doctor",
    patient: "/dashboard/patient",
  };
  return map[role.toLowerCase()] || "/";
}

export const config = {
  matcher: ["/signin", "/signup", "/dashboard/:page*"],
};

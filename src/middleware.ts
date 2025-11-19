import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "./services/auth";
import { TDecodedUser } from "./types/user";

// This function can be marked `async` if using `await` inside
const authRoutes = ["/signin", "/signup"];

type TRole = keyof typeof roleBaseRoutes;

const roleBaseRoutes = {
  admin: ["/admin", /^\/dashboard/], // regex for /dashboard/:id or anything start with dashboard
  doctor: [/^\/dashboard/], // regex for /dashboard/:id or anything start with dashboard
  patient: [/^\/dashboard/], // regex for /dashboard/:id or anything start with dashboard
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  //  Try to get current user
  const user = (await getCurrentUser()) as TDecodedUser | null;
  // console.log({ user });


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

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/signin", "/dashboard/:page*", "/profile/:page*"],
};

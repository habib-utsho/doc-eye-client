import { NextResponse, NextRequest } from "next/server";
import path from "path";

// This function can be marked `async` if using `await` inside
const authRoutes = ["/signin", "/signup"];

type TRole = keyof typeof roleBaseRoutes;

const roleBaseRoutes = {
  admin: ["/admin", "/specialty"],
  user: [/^\/profile/, "/specialty"],
};

type TUser = {
  name: string;
  token: string;
  role: TRole;
} | null;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // const user = {
  //   name: "John Doe",
  //   token: "55AA55343joidfjsdjfoijf",
  //   role: "admin",
  // } as TUser;
  const user = null as TUser;
  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (user?.role && roleBaseRoutes[user?.role as TRole]) {
    const roleRoutes = roleBaseRoutes[user?.role as TRole];
    const isMatched = roleRoutes.some((route) => pathname.match(route));
    if (isMatched) {
      return NextResponse.next();
    }
  }

  //   else {
  //     if (authRoutes.includes(pathname)) {
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }

  //     return NextResponse.next();
  // }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/specialty", "/signin"],
};

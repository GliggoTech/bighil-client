// src/middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const path = req.nextUrl.pathname;

  // Define protected routes with required roles
  const protectedRoutes = {
    "/client": ["ADMIN", "SUB ADMIN", "SUPER ADMIN"],
    "/bighil": ["BIGHIL"],
    "/user": ["user"],
  };

  // Unprotected routes (no middleware applied)
  const unProtectedRoutes = [
    "/user/forgot-password",
    "/user/user-login",
    "/client/client-login",
    "/bighil/bighil-login",
    "/user/user-register",
    "/",
    "/client/forgot-password",
    "/client/request-access",
    "/user/invalid-session",
    "/client/invalid-session",
    "/bighil/forgot-password",
    "/unauthorized",
    "/invalid-session",
  ];

  // Skip middleware for unprotected routes
  if (unProtectedRoutes.includes(path)) {
    return NextResponse.next();
  }

  // Find matching base route (e.g., '/client')
  const basePath = Object.keys(protectedRoutes).find((base) =>
    path.startsWith(base)
  );

  // Skip if not a protected base path
  if (!basePath) {
    return NextResponse.next();
  }

  const token = req.cookies.get("access_token")?.value;

  // Redirect to login if no token found
  if (!token) {
    const loginPath =
      basePath === "/client"
        ? "/client/client-login"
        : basePath === "/bighil"
        ? "/bighil/bighil-login"
        : "/user/user-login";

    return NextResponse.redirect(new URL(loginPath, req.url));
  }

  try {
    // Verify JWT token
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    );

    // Get allowed roles for this route
    const allowedRoles = protectedRoutes[basePath];

    // Check if user has required role
    if (!allowedRoles.includes(payload.role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.redirect(new URL("/invalid-session", req.url));
  }
}

export const config = {
  matcher: [
    "/client/:path*",
    "/bighil/:path*",
    "/user/:path*",
    "/unauthorized",
    "/invalid-session",
  ],
};

// import { NextResponse} from "next/server";
// import type { NextRequest } from "next/server";
// export { default } from "next-auth/middleware"
// import { getToken } from "next-auth/jwt";


// export async function middleware(request:NextRequest) {
//      const token = await getToken({ req: request });
//   const url = request.nextUrl;
 
//     if (token
//          && (
//         url.pathname.startsWith('/sign-in') ||
//         url.pathname.startsWith('/sign-up') ||
//         url.pathname.startsWith('/verify') ||
//         url.pathname.startsWith('/') 
//     )){
//         return NextResponse.redirect(new URL('/dashboard',request.url))
//     }


//     return NextResponse.redirect(new URL('home',request.url))
// }


// export const config= {
//     matcher: [
//         '/signin',
//         '/signup',
//         '/',
//         '/dashboard',
//         '/verify/:path*'

//     ]
// }

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   const url = request.nextUrl;

//   const isAuthPage =
//     url.pathname.startsWith("/sign-in") ||
//     url.pathname.startsWith("/sign-up") ||
//     url.pathname.startsWith("/verify") ||
//     url.pathname.startsWith("/home");

//   // ✅ User logged in → Block Auth Pages → Send to dashboard
//   if (token && isAuthPage) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // ❌ User not logged in → Block Protected Pages → Send to sign-in
//   if (!token && url.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   // ✅ Allow other pages to load normally
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/sign-in",
//     "/sign-up",
//     "/home",
//     "/dashboard",
//     "/verify/:path*",
//   ],
// };


// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   const url = request.nextUrl;

//   const isAuthPage =
//     url.pathname.startsWith("/sign-in") ||
//     url.pathname.startsWith("/sign-up") ||
//     url.pathname.startsWith("/verify");

//   // ✅ If user already logged in → block auth pages
//   if (token && isAuthPage) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // ❌ If user not logged in → block protected pages
//   const isProtectedPage =
//     url.pathname.startsWith("/dashboard") ||
//     url.pathname.startsWith("/");

//   if (!token && isProtectedPage) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/sign-in",
//     "/sign-up",
//     "/verify/:path*",
//     "/dashboard",
//     "/",
//   ],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  const isAuthPage =
    url.pathname.startsWith("/sign-in") ||
    url.pathname.startsWith("/sign-up") ||
    url.pathname.startsWith("/verify") ||
    url.pathname === "/";

  // If logged-in user tries to access auth pages → redirect to dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If NOT logged in and trying to access protected pages → redirect to sign-in
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/",
    "/dashboard",
    "/verify/:path*",
  ],
};

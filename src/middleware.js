import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET
);

export async function middleware(request) {
  const token = request.cookies.get("admin_token")?.value;
  const { pathname } = request.nextUrl;

  let isAuthenticated = false;

  if (token) {
    try {
      await jwtVerify(token, SECRET_KEY);
      isAuthenticated = true;
    } catch (error) {
      isAuthenticated = false;
    }
  }

  // se tentar acessar rotas /admin sem estar autenticado (exceto a página de login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // se já estiver autenticado e tentar ir para a tela de login
  if (pathname === "/admin/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
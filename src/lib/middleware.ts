import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractTokenFromHeader } from "./auth";

export interface ProtectedRequest extends NextRequest {
  user?: {
    userId: string;
    email: string;
    role: "CUSTOMER" | "ADMIN" | "WORKER";
  };
}

export async function authenticateToken(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  const token = extractTokenFromHeader(authHeader || undefined);

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  return payload;
}

export function requireAuth(roles?: string[]) {
  return async (request: NextRequest) => {
    const payload = await authenticateToken(request);

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized - No valid token",
        },
        { status: 401 }
      );
    }

    if (roles && !roles.includes(payload.role)) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden - Insufficient permissions",
        },
        { status: 403 }
      );
    }

    return payload;
  };
}

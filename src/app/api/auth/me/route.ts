import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticateToken } from "@/lib/middleware";
import { createSuccessResponse, createErrorResponse } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const payload = await authenticateToken(request);

    if (!payload) {
      return NextResponse.json(
        createErrorResponse("Unauthorized"),
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        createErrorResponse("User not found"),
        { status: 404 }
      );
    }

    return NextResponse.json(createSuccessResponse("User retrieved successfully", user));
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      createErrorResponse("An error occurred"),
      { status: 500 }
    );
  }
}

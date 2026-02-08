import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticateToken } from "@/lib/middleware";
import { createSuccessResponse, createErrorResponse } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const payload = await authenticateToken(request);

    if (!payload || payload.role !== "ADMIN") {
      return NextResponse.json(
        createErrorResponse("Unauthorized"),
        { status: 403 }
      );
    }

    const users = await db.user.findMany({
      where: { role: "CUSTOMER" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        isActive: true,
        createdAt: true,
        _count: {
          select: { bookings: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(createSuccessResponse("Users retrieved", users));
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json(
      createErrorResponse("An error occurred"),
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const payload = await authenticateToken(request);

    if (!payload || payload.role !== "ADMIN") {
      return NextResponse.json(
        createErrorResponse("Unauthorized"),
        { status: 403 }
      );
    }

    const body = await request.json();
    const { id, isActive } = body;

    if (!id || typeof isActive !== "boolean") {
      return NextResponse.json(
        createErrorResponse("User ID and isActive boolean required"),
        { status: 400 }
      );
    }

    const user = await db.user.update({
      where: { id },
      data: { isActive },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
      },
    });

    return NextResponse.json(
      createSuccessResponse(`User ${isActive ? "activated" : "deactivated"}`, user)
    );
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      createErrorResponse("An error occurred"),
      { status: 500 }
    );
  }
}

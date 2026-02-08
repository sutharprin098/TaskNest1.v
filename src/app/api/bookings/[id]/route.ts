import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticateToken } from "@/lib/middleware";
import { createSuccessResponse, createErrorResponse } from "@/lib/constants";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const payload = await authenticateToken(request);
    const { id } = await params;

    if (!payload) {
      return NextResponse.json(
        createErrorResponse("Unauthorized"),
        { status: 401 }
      );
    }

    const booking = await db.booking.findFirst({
      where: {
        id,
        userId: payload.userId,
      },
      include: {
        service: true,
        worker: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
        payment: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        createErrorResponse("Booking not found"),
        { status: 404 }
      );
    }

    return NextResponse.json(createSuccessResponse("Booking retrieved", booking));
  } catch (error) {
    console.error("Get booking error:", error);
    return NextResponse.json(
      createErrorResponse("An error occurred"),
      { status: 500 }
    );
  }
}

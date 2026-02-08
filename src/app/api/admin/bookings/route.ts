import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticateToken } from "@/lib/middleware";
import { createSuccessResponse, createErrorResponse } from "@/lib/constants";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const payload = await authenticateToken(request);

    if (!payload || payload.role !== "ADMIN") {
      return NextResponse.json(
        createErrorResponse("Unauthorized"),
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const whereClause = status ? { status: status as any } : {};

    const bookings = await db.booking.findMany({
      where: whereClause,
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true },
        },
        service: {
          select: { name: true, type: true },
        },
        worker: {
          select: { id: true, name: true, phone: true },
        },
        payment: {
          select: { status: true, amount: true },
        },
      },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(createSuccessResponse("Bookings retrieved", bookings));
  } catch (error) {
    console.error("Get admin bookings error:", error);
    return NextResponse.json(
      createErrorResponse("An error occurred"),
      { status: 500 }
    );
  }
}

const updateBookingSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
  workerId: z.string().optional(),
});

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
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        createErrorResponse("Booking ID required"),
        { status: 400 }
      );
    }

    const validation = updateBookingSchema.safeParse(updates);

    if (!validation.success) {
      return NextResponse.json(
        createErrorResponse("Validation error", validation.error.flatten().fieldErrors),
        { status: 400 }
      );
    }

    const booking = await db.booking.update({
      where: { id },
      data: validation.data,
      include: {
        service: true,
        worker: true,
        payment: true,
      },
    });

    return NextResponse.json(createSuccessResponse("Booking updated", booking));
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json(
      createErrorResponse("An error occurred"),
      { status: 500 }
    );
  }
}

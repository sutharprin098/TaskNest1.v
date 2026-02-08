import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticateToken } from "@/lib/middleware";
import { createSuccessResponse, createErrorResponse } from "@/lib/constants";
import { z } from "zod";

const createBookingSchema = z.object({
  serviceId: z.string(),
  date: z.string(),
  time: z.string(),
  duration: z.number().min(1),
  guestCount: z.number().optional(),
  address: z.string().min(5),
  notes: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const payload = await authenticateToken(request);

    if (!payload) {
      return NextResponse.json(
        createErrorResponse("Unauthorized"),
        { status: 401 }
      );
    }

    const bookings = await db.booking.findMany({
      where: { userId: payload.userId },
      include: {
        service: {
          select: {
            name: true,
            type: true,
          },
        },
        worker: {
          select: {
            name: true,
            phone: true,
          },
        },
        payment: {
          select: {
            status: true,
            amount: true,
          },
        },
      },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(createSuccessResponse("Bookings retrieved", bookings));
  } catch (error) {
    console.error("Get bookings error:", error);
    return NextResponse.json(
      createErrorResponse("An error occurred"),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await authenticateToken(request);

    if (!payload) {
      return NextResponse.json(
        createErrorResponse("Unauthorized"),
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = createBookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        createErrorResponse("Validation error", validation.error.flatten().fieldErrors),
        { status: 400 }
      );
    }

    const { serviceId, date, time, duration, guestCount, address, notes } = validation.data;

    // Get service details
    const service = await db.service.findUnique({
      where: { id: serviceId },
      include: {
        pricings: true,
      },
    });

    if (!service) {
      return NextResponse.json(
        createErrorResponse("Service not found"),
        { status: 404 }
      );
    }

    // Parse date and time properly - date comes as "YYYY-MM-DD" and time as "HH:MM"
    const dateObj = new Date(`${date}T${time}:00Z`);

    // Calculate price based on service type
    let basePrice = 0;
    
    if (service.type === "HOME_COOKING" || service.type === "CUSTOM_COOKING") {
      // Price per hour
      basePrice = (service.startingPrice || 499) * duration;
    } else if (service.type === "EVENT_COOKING") {
      // Price per guest
      basePrice = (guestCount || 5) * (service.startingPrice || 299);
    } else if (service.type === "HOME_ORGANIZATION") {
      // Price per hour
      basePrice = (service.startingPrice || 249) * duration;
    } else if (service.type === "SEASONAL_CONCIERGE") {
      // Fixed price
      basePrice = service.startingPrice || 1499;
    }

    const finalPrice = basePrice;

    // Create booking
    const booking = await db.booking.create({
      data: {
        userId: payload.userId,
        serviceId,
        date: dateObj,
        duration,
        guestCount: guestCount || null,
        address,
        notes: notes || null,
        basePrice,
        finalPrice,
        status: "PENDING",
      },
      include: {
        service: {
          select: {
            name: true,
            type: true,
          },
        },
      },
    });

    // Create payment record
    await db.payment.create({
      data: {
        userId: payload.userId,
        bookingId: booking.id,
        amount: finalPrice,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      createSuccessResponse("Booking created successfully", booking),
      { status: 201 }
    );
  } catch (error) {
    console.error("Create booking error:", error);
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json(
      createErrorResponse(errorMessage),
      { status: 500 }
    );
  }
}

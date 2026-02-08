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

    const workers = await db.worker.findMany({
      include: {
        _count: {
          select: { bookings: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(createSuccessResponse("Workers retrieved", workers));
  } catch (error) {
    console.error("Get workers error:", error);
    return NextResponse.json(
      createErrorResponse("An error occurred"),
      { status: 500 }
    );
  }
}

const createWorkerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  serviceType: z.array(z.string()),
  hourlyRate: z.number().min(0),
  bio: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const payload = await authenticateToken(request);

    if (!payload || payload.role !== "ADMIN") {
      return NextResponse.json(
        createErrorResponse("Unauthorized"),
        { status: 403 }
      );
    }

    const body = await request.json();
    const validation = createWorkerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        createErrorResponse("Validation error", validation.error.flatten().fieldErrors),
        { status: 400 }
      );
    }

    const worker = await db.worker.create({
      data: {
        name: validation.data.name,
        email: validation.data.email,
        phone: validation.data.phone,
        serviceType: JSON.stringify(validation.data.serviceType),
        hourlyRate: validation.data.hourlyRate,
        bio: validation.data.bio,
        status: "INACTIVE",
      },
    });

    return NextResponse.json(
      createSuccessResponse("Worker created successfully", worker),
      { status: 201 }
    );
  } catch (error) {
    console.error("Create worker error:", error);
    return NextResponse.json(
      createErrorResponse("An error occurred"),
      { status: 500 }
    );
  }
}

const updateWorkerSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().min(8).optional(),
  serviceType: z.array(z.string()).optional(),
  hourlyRate: z.number().min(0).optional(),
  bio: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "VERIFIED", "SUSPENDED"]).optional(),
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
        createErrorResponse("Worker ID required"),
        { status: 400 }
      );
    }

    const validation = updateWorkerSchema.safeParse(updates);

    if (!validation.success) {
      return NextResponse.json(
        createErrorResponse("Validation error", validation.error.flatten().fieldErrors),
        { status: 400 }
      );
    }

    const worker = await db.worker.update({
      where: { id },
      data: {
        ...validation.data,
        serviceType: validation.data.serviceType 
          ? JSON.stringify(validation.data.serviceType)
          : undefined,
      },
    });

    return NextResponse.json(createSuccessResponse("Worker updated", worker));
  } catch (error) {
    console.error("Update worker error:", error);
    return NextResponse.json(
      createErrorResponse("An error occurred"),
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const payload = await authenticateToken(request);

    if (!payload || payload.role !== "ADMIN") {
      return NextResponse.json(
        createErrorResponse("Unauthorized"),
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        createErrorResponse("Worker ID required"),
        { status: 400 }
      );
    }

    await db.worker.delete({
      where: { id },
    });

    return NextResponse.json(createSuccessResponse("Worker deleted"));
  } catch (error) {
    console.error("Delete worker error:", error);
    return NextResponse.json(
      createErrorResponse("An error occurred"),
      { status: 500 }
    );
  }
}

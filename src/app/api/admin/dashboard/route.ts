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

    // Get statistics
    const [totalUsers, totalBookings, totalWorkers, totalRevenue] = await Promise.all([
      db.user.count({ where: { role: "CUSTOMER" } }),
      db.booking.count(),
      db.worker.count({ where: { status: "ACTIVE" } }),
      db.payment.aggregate({
        where: { status: "COMPLETED" },
        _sum: { amount: true },
      }),
    ]);

    const recentBookings = await db.booking.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true, email: true },
        },
        service: {
          select: { name: true },
        },
        worker: {
          select: { name: true },
        },
      },
    });

    const stats = {
      totalUsers,
      totalBookings,
      totalWorkers,
      totalRevenue: totalRevenue._sum.amount || 0,
      recentBookings,
    };

    return NextResponse.json(createSuccessResponse("Dashboard data retrieved", stats));
  } catch (error) {
    console.error("Get dashboard error:", error);
    return NextResponse.json(
      createErrorResponse("An error occurred"),
      { status: 500 }
    );
  }
}

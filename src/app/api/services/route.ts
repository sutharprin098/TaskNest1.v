import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSuccessResponse, createErrorResponse } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const services = await db.service.findMany({
      where: type ? { type: type as any } : undefined,
      include: {
        pricings: true,
      },
    });

    return NextResponse.json(createSuccessResponse("Services retrieved", services));
  } catch (error) {
    console.error("Get services error:", error);
    return NextResponse.json(
      createErrorResponse("An error occurred"),
      { status: 500 }
    );
  }
}

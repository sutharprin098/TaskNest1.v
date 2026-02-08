import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

// Create a new service
export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Access denied. Admin only." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, type, description, longDescription, startingPrice, image, included, excluded } = body;

    if (!name || !type || !description || !startingPrice) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const service = await db.service.create({
      data: {
        name,
        type,
        description,
        longDescription: longDescription || null,
        startingPrice: parseFloat(startingPrice),
        image: image || null,
        included: included || null,
        excluded: excluded || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error: any) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create service" },
      { status: 500 }
    );
  }
}

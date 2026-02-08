import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comparePassword, generateToken } from "@/lib/auth";
import { createSuccessResponse, createErrorResponse } from "@/lib/constants";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        createErrorResponse("Validation error", validation.error.flatten().fieldErrors),
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // Find user
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        createErrorResponse("Invalid credentials"),
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        createErrorResponse("Your account has been disabled. Please contact support."),
        { status: 403 }
      );
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        createErrorResponse("Invalid credentials"),
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role as "CUSTOMER" | "ADMIN" | "WORKER",
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      createSuccessResponse("Login successful", {
        user: userWithoutPassword,
        token,
      })
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      createErrorResponse("An error occurred during login"),
      { status: 500 }
    );
  }
}

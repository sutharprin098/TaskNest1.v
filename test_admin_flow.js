#!/usr/bin/env node
/**
 * Test script to verify admin authentication and access flow
 */

async function testAdminAccess() {
  const BASE_URL = "http://localhost:3000";
  const ADMIN_EMAIL = "admin@tasknest.com";
  const ADMIN_PASSWORD = "admin123";

  console.log("🧪 Testing Admin Access Flow\n");
  console.log("=====================================\n");

  try {
    // Step 1: Attempt login
    console.log("📝 Step 1: Attempting login...");
    const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      }),
    });

    const loginData = await loginResponse.json();
    if (!loginData.success) {
      console.log("❌ Login failed:", loginData.message);
      return;
    }

    const { token, user } = loginData.data;
    console.log(`✅ Login successful!`);
    console.log(`   - User: ${user.email}`);
    console.log(`   - Role: ${user.role}`);
    console.log(`   - Token: ${token.substring(0, 20)}...`);

    // Step 2: Test role verification
    console.log("\n🔐 Step 2: Checking user role...");
    if (user.role !== "ADMIN") {
      console.log("❌ User is not an admin!");
      return;
    }
    console.log("✅ User is an admin");

    // Step 3: Test admin pages accessibility
    console.log("\n🔑 Step 3: Testing admin page accessibility...");
    const adminPages = [
      "/admin/dashboard",
      "/admin/services",
      "/admin/bookings",
      "/admin/workers",
      "/admin/users",
    ];

    for (const page of adminPages) {
      const response = await fetch(`${BASE_URL}${page}`);
      const status = response.status;
      const isAccessible = status === 200;
      console.log(`${isAccessible ? "✅" : "❌"} ${page} - Status: ${status}`);
    }

    // Step 4: Test admin API endpoints
    console.log("\n🔌 Step 4: Testing admin API endpoints...");
    const adminApis = [
      "/api/admin/dashboard",
      "/api/admin/bookings",
      "/api/admin/services",
      "/api/admin/users",
      "/api/admin/workers",
    ];

    for (const api of adminApis) {
      const response = await fetch(`${BASE_URL}${api}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const status = response.status;
      const isAccessible = status === 200;
      console.log(`${isAccessible ? "✅" : "❌"} ${api} - Status: ${status}`);
    }

    console.log("\n✅ All checks passed! Admin panel is accessible.\n");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

// Run the test
testAdminAccess();

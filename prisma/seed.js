const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@tasknest.com" },
    update: {},
    create: {
      email: "admin@tasknest.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
      city: "Delhi",
    },
  });

  console.log("✅ Admin user created:", admin.email);

  // Create services
  const services = [
    {
      name: "Home-style Cooking",
      type: "HOME_COOKING",
      description: "Professional chef prepares daily meals at your home",
      longDescription: "Our experienced chefs will visit your home to prepare fresh, customized meals. Perfect for busy families wanting home-cooked food without the hassle.",
      startingPrice: 150,
      included: JSON.stringify([
        "Professional chef visit",
        "Menu planning consultation",
        "Meal preparation",
        "Kitchen cleanup",
        "Food storage guidance",
      ]),
      excluded: JSON.stringify([
        "Grocery shopping (available as add-on)",
        "Serving staff",
        "Tableware and cutlery",
      ]),
    },
    {
      name: "Event Cooking",
      type: "EVENT_COOKING",
      description: "Private chef for 7–15 guest events",
      longDescription: "Professional catering service for your private events. We handle food preparation, service, and cleanup for intimate gatherings.",
      startingPrice: 100,
      included: JSON.stringify([
        "Multi-course menu planning",
        "Professional chef and assistant",
        "Food preparation and cooking",
        "Plating and presentation",
        "Full cleanup service",
      ]),
      excluded: JSON.stringify([
        "Tableware and decorations",
        "Beverages",
        "Venue rental",
      ]),
    },
    {
      name: "Home Organization & Reset",
      type: "HOME_ORGANIZATION",
      description: "Professional organizers transform your living space",
      longDescription: "Expert organizing service to declutter, reorganize, and optimize your home. We help you create a functional and beautiful living space.",
      startingPrice: 200,
      included: JSON.stringify([
        "Initial consultation",
        "Space assessment",
        "Decluttering assistance",
        "Organization system design",
        "Implementation and setup",
        "Maintenance tips",
      ]),
      excluded: JSON.stringify([
        "Storage containers (can be purchased)",
        "Furniture or fixtures",
        "Waste disposal fees",
      ]),
    },
    {
      name: "Seasonal / Event Concierge",
      type: "SEASONAL_CONCIERGE",
      description: "Complete event planning and coordination",
      longDescription: "Full concierge service for seasonal celebrations and special events. From planning to execution, we handle every detail.",
      startingPrice: 500,
      included: JSON.stringify([
        "Event planning consultation",
        "Vendor coordination",
        "Timeline management",
        "Day-of coordination",
        "Setup and breakdown",
      ]),
      excluded: JSON.stringify([
        "Vendor fees",
        "Venue costs",
        "Decorations and supplies",
      ]),
    },
    {
      name: "Custom Cooking Card",
      type: "CUSTOM_COOKING",
      description: "Meal prep and specialized diet cooking",
      longDescription: "Customized meal preparation tailored to your dietary needs. Whether keto, vegan, or specific health requirements, we prepare meals perfectly suited to you.",
      startingPrice: 100,
      included: JSON.stringify([
        "Nutritional consultation",
        "Custom menu planning",
        "Special diet expertise",
        "Meal preparation",
        "Portion control and labeling",
        "Storage instructions",
      ]),
      excluded: JSON.stringify([
        "Specialty ingredients (charged separately)",
        "Nutritionist consultation",
        "Delivery service",
      ]),
    },
  ];

  for (const service of services) {
    const created = await prisma.service.upsert({
      where: { type: service.type },
      update: service,
      create: service,
    });
    console.log("✅ Service created:", created.name);
  }

  console.log("🎉 Database seeding completed!");
  console.log("\n📝 Admin credentials:");
  console.log("   Email: admin@tasknest.com");
  console.log("   Password: admin123");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

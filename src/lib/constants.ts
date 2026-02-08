export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export function createSuccessResponse<T>(message: string, data?: T): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function createErrorResponse(message: string, errors?: Record<string, string[]>): ApiResponse {
  return {
    success: false,
    message,
    errors,
  };
}

export const SERVICES = [
  {
    id: "home-cooking",
    name: "Home-Style Cooking",
    type: "HOME_COOKING",
    startingPrice: 399,
    description: "Professional chef prepares daily meals at your home (1-6 people)",
    longDescription: "Our experienced chefs will visit your home to prepare fresh, customized meals. Perfect for busy families wanting home-cooked food without the hassle.",
    image: "🍳",
    minDuration: 2,
    bestFor: "Daily family meals, small households",
  },
  {
    id: "event-cooking",
    name: "Event Cooking",
    type: "EVENT_COOKING",
    startingPrice: 299,
    description: "Private chef for 7–15 guest events",
    longDescription: "Professional catering service for your private events. We handle food preparation, service, and cleanup for intimate gatherings.",
    image: "👨‍🍳",
    minGuests: 7,
    bestFor: "House parties, birthdays, small gatherings",
  },
  {
    id: "home-organization",
    name: "Home Organization & Reset",
    type: "HOME_ORGANIZATION",
    startingPrice: 249,
    description: "Professional organizers transform your living space",
    longDescription: "Expert organizing service to declutter, reorganize, and optimize your home. Perfect for move-ins, storage cleanup, and seasonal resets.",
    image: "📦",
    minDuration: 3,
    bestFor: "Move-in homes, messy storage, seasonal reset",
  },
  {
    id: "seasonal-concierge",
    name: "Seasonal / Event Concierge",
    type: "SEASONAL_CONCIERGE",
    startingPrice: 1499,
    description: "Complete event planning and coordination",
    longDescription: "Full concierge service for seasonal celebrations and special events. From Diwali to birthdays, we handle every detail.",
    image: "🎉",
    bestFor: "Diwali, birthdays, small home events",
  },
  {
    id: "custom-cooking",
    name: "Custom Cooking Card",
    type: "CUSTOM_COOKING",
    startingPrice: 499,
    description: "Meal prep and specialized diet cooking",
    longDescription: "Customized meal preparation tailored to your dietary needs. Perfect for gym diets, busy professionals, and healthy routines.",
    image: "🥗",
    minDuration: 3,
    bestFor: "Gym diet, busy professionals, healthy routine",
  },
];

export const PRICING_TIERS = {
  HOME_COOKING: [
    { tier: "hourly", price: 399, description: "₹399 per hour (minimum 2 hours)", details: "Typical: ₹800 - ₹1,200 per visit" },
    { tier: "session", price: 800, description: "2-hour session", details: "Cooking, prep, kitchen cleanup" },
  ],
  EVENT_COOKING: [
    { tier: "per_guest", price: 299, description: "₹299 per person (minimum 7 guests)", details: "Typical: ₹2,100 - ₹4,500 per event" },
    { tier: "event", price: 2100, description: "Full event (7 guests)", details: "Menu prep, cooking, plating, reset" },
  ],
  HOME_ORGANIZATION: [
    { tier: "hourly", price: 249, description: "₹249 per hour (minimum 3 hours)", details: "Typical: ₹750 - ₹1,500 per session" },
    { tier: "session", price: 750, description: "3-hour session", details: "Decluttering, wardrobe/kitchen setup" },
  ],
  SEASONAL_CONCIERGE: [
    { tier: "starter", price: 1499, description: "Starter package - ₹1,499", details: "Festival setup, coordination, guidance" },
    { tier: "premium", price: 4999, description: "Premium package - ₹4,999", details: "Complete event management" },
  ],
  CUSTOM_COOKING: [
    { tier: "hourly", price: 499, description: "₹499 per hour (minimum 3 hours)", details: "Typical: ₹1,500 - ₹2,500 per session" },
    { tier: "weekly", price: 1500, description: "Weekly meal prep - ₹1,500", details: "Diet-based cooking, kitchen coaching" },
  ],
};

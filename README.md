# TaskNest - Premium Home Services Platform

A complete production-ready web application for on-demand home services in Delhi, built with Next.js 14, TypeScript, Prisma, and PostgreSQL.

## 🌟 Features

### Customer Features
- **Service Booking**: Book home cooking, event catering, organization, and concierge services
- **User Dashboard**: View upcoming and past bookings
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Real-time Updates**: Track booking status and worker assignments

### Admin Features
- **Dashboard Overview**: Total users, bookings, workers, and revenue statistics
- **Booking Management**: View, update status, and assign workers to bookings
- **Worker Management**: Add, edit, activate/deactivate workers
- **User Management**: View customers and manage account status
- **Pricing Control**: Manage service pricing and packages

### Services Offered
1. **Home-style Cooking** - Daily meal preparation at home (from AED 150/hr)
2. **Event Cooking** - Private chef for 7-15 guest events (from AED 100/guest)
3. **Home Organization** - Professional organizing service (from AED 200/hr)
4. **Seasonal Concierge** - Complete event planning (from AED 500)
5. **Custom Cooking Card** - Meal prep for specialized diets (from AED 100/hr)

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4 with custom theme
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + bcrypt
- **Validation**: Zod

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+ database

## ⚙️ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

**Option A: Use Supabase (Recommended - No local setup needed)**

1. Go to [https://supabase.com](https://supabase.com) and create free account
2. Create a new project
3. Go to Settings > Database and copy the connection string
4. Update `.env.local` with your connection string

**Option B: Local PostgreSQL**

```sql
CREATE DATABASE tasknest;
```

Update `.env.local`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/tasknest"
```

### 3. Initialize Database

```bash
npm run db:push
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 🔑 Default Admin Credentials

```
Email: admin@tasknest.com
Password: admin123
```

**⚠️ Change password in production!**

## 📁 Project Structure

```
tasknest/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts           # Database seeding
├── src/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── admin/        # Admin panel
│   │   ├── auth/         # Login/register
│   │   ├── dashboard/    # Customer dashboard
│   │   └── page.tsx      # Homepage
│   ├── components/       # UI components
│   └── lib/             # Utilities
└── .env.local           # Environment variables
```

## 🛠️ Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run db:push      # Push schema to DB
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Environment Variables

```env
DATABASE_URL="your-production-db-url"
JWT_SECRET="strong-random-secret-32-chars-min"
JWT_EXPIRY="7d"
NEXT_PUBLIC_API_URL="https://yourdomain.com"
```

## 📝 API Endpoints

### Public
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/services` - List services

### Authenticated
- `GET /api/bookings` - User bookings
- `POST /api/bookings` - Create booking

### Admin Only
- `GET /api/admin/dashboard` - Stats
- `GET /api/admin/bookings` - All bookings
- `POST /api/admin/workers` - Create worker

## 🎨 Design

- Premium minimal luxury UI
- Mobile-first responsive design
- Custom color theme (dark slate + gold accent)
- Smooth animations and transitions

## 🔐 Security

- bcrypt password hashing
- JWT authentication
- Role-based access control
- SQL injection protection (Prisma)
- XSS protection (Next.js)

---

**Built with ❤️ for premium home services**

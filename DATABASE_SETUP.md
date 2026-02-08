# Quick Database Setup Guide

You need a PostgreSQL database to run TaskNest. Here's the EASIEST way:

## Option 1: Neon.tech (Recommended - 2 minutes)

1. Go to https://neon.tech
2. Click "Sign Up" (free, no credit card needed)
3. Create a new project
4. Copy the connection string (looks like: postgresql://neondb_owner:npg_xxxxx...)
5. Paste it in `.env.local` as DATABASE_URL
6. Run these commands:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   npm run dev
   ```

## Option 2: Supabase (Alternative)

1. Go to https://supabase.com
2. Create free account
3. New Project > Get connection string
4. Paste in `.env.local`
5. Run same  commands as above

## Option 3: Railway (Alternative)

1. Go to https://railway.app
2. New Project > Add PostgreSQL
3. Copy DATABASE_URL
4. Paste in `.env.local`
5. Run same commands

## After Database Setup:

```bash
# 1. Generate Prisma Client
npx prisma generate

# 2. Create database tables
npx prisma db push

# 3. Add sample data
npm run db:seed

# 4. Start server
npm run dev
```

Then open: http://localhost:3000

Login with:
- Email: admin@tasknest.com
- Password: admin123

## Troubleshooting

**Error: "Environment variable not found: DATABASE_URL"**
- Solution: Make sure `.env.local` file exists with DATABASE_URL

**Error: "Can't reach database server"**
- Solution: Check your internet connection and database URL

**Error: "Cannot find module @prisma/client"**
- Solution: Run `npx prisma generate`

Need help? The database setup takes only 2-3 minutes!

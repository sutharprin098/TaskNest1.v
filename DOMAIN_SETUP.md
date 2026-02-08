# Domain Setup Guide - TaskNest on princesite.in

## Domains Configuration

### Main Application
- **Domain:** `tasknest.princesite.in`
- **Purpose:** Customer-facing website and dashboard

### Admin Panel
- **Domain:** `admin.princesite.in`
- **Purpose:** Admin dashboard and management

---

## Step 1: DNS Configuration

Add these DNS records to your `princesite.in` domain:

### For Vercel Deployment

| Type  | Name      | Value                           | TTL  |
|-------|-----------|----------------------------------|------|
| CNAME | tasknest  | cname.vercel-dns.com            | 3600 |
| CNAME | admin     | cname.vercel-dns.com            | 3600 |

### For Custom Server (VPS)

| Type  | Name      | Value                           | TTL  |
|-------|-----------|----------------------------------|------|
| A     | tasknest  | YOUR_SERVER_IP                  | 3600 |
| A     | admin     | YOUR_SERVER_IP                  | 3600 |

---

## Step 2: Vercel Deployment (Recommended)

### 2.1 Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2.2 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 2.3 Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

```env
# Database (Use your PostgreSQL URL)
DATABASE_URL=postgresql://neondb_owner:4VUVrD6m5Q2F@ep-super-shadow-a5z5e6bj.us-east-2.aws.neon.tech/neondb?sslmode=require

# JWT Secret (Generate new for production!)
JWT_SECRET=change-this-to-secure-random-string-min-32-chars

# Admin Credentials
ADMIN_EMAIL=admin@tasknest.com
ADMIN_PASSWORD=SecurePassword123!

# Domain Configuration
NEXT_PUBLIC_DOMAIN=tasknest.princesite.in
NEXT_PUBLIC_ADMIN_DOMAIN=admin.princesite.in
NEXT_PUBLIC_APP_URL=https://tasknest.princesite.in
NEXT_PUBLIC_API_URL=https://tasknest.princesite.in

# Environment
NODE_ENV=production
```

### 2.4 Add Custom Domains in Vercel
1. Go to Project Settings → Domains
2. Add these domains:
   - `tasknest.princesite.in` (Primary)
   - `admin.princesite.in`
3. Vercel will show you DNS records to add
4. Add the CNAME records to your DNS provider

### 2.5 SSL Certificate
- Vercel automatically provisions SSL certificates
- Wait 5-10 minutes for DNS propagation
- SSL will be active once DNS is verified

---

## Step 3: Database Setup (Production)

### Option A: Keep using Neon.tech (Already configured)
Your current DATABASE_URL is already production-ready:
```
postgresql://neondb_owner:4VUVrD6m5Q2F@ep-super-shadow-a5z5e6bj.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### Option B: Switch to new PostgreSQL
If you want a dedicated database:

1. **Railway.app** (Free tier available)
   ```bash
   # Create account at railway.app
   # Create new PostgreSQL database
   # Copy the DATABASE_URL
   ```

2. **Supabase** (Free tier available)
   ```bash
   # Create account at supabase.com
   # Create new project
   # Copy PostgreSQL connection string
   ```

### Run Migrations on Production
```bash
# Install dependencies
npm install

# Run migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Seed initial data (admin user + services)
node prisma/seed.js
```

---

## Step 4: Testing Deployment

### 4.1 Test Main Domain
Visit: `https://tasknest.princesite.in`

Expected pages should work:
- ✅ Homepage
- ✅ Services listing
- ✅ Individual service pages (e.g., `/services/home-cooking`)
- ✅ Pricing page
- ✅ About page
- ✅ Contact page
- ✅ Login/Register
- ✅ Privacy Policy & Terms

### 4.2 Test Admin Domain
Visit: `https://admin.princesite.in`

Should redirect to: `https://admin.princesite.in/admin/dashboard`

Login with:
- Email: `admin@tasknest.com`
- Password: `SecurePassword123!` (or your configured password)

Expected admin pages:
- ✅ Dashboard overview
- ✅ Bookings management
- ✅ Workers management
- ✅ Users management
- ✅ Services management

### 4.3 Test Customer Features
1. Register new account on main domain
2. Login to customer dashboard
3. Book a service
4. Check booking appears in admin panel

---

## Step 5: Post-Deployment Configuration

### Update Prisma Schema for Production
Ensure schema is using PostgreSQL (not SQLite):

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Security Checklist
- [x] SSL/HTTPS enabled (Vercel automatic)
- [ ] Change JWT_SECRET to strong random string
- [ ] Change ADMIN_PASSWORD to secure password
- [ ] Enable rate limiting (optional)
- [ ] Set up error monitoring (Sentry/Vercel Analytics)
- [ ] Configure backup strategy for database

---

## Troubleshooting

### Service Pages Show 404
**Issue:** `/services/home-cooking` returns 404

**Solution:**
1. Check if build completed successfully
2. Verify `generateStaticParams()` in `/services/[slug]/page.tsx`
3. Redeploy from Vercel dashboard

### Admin Subdomain Not Working
**Issue:** `admin.princesite.in` doesn't redirect to admin panel

**Solution:**
1. Verify CNAME record is added correctly
2. Wait for DNS propagation (up to 48 hours)
3. Check middleware is deployed (`src/middleware.ts`)
4. Clear browser cache

### Database Connection Error
**Issue:** "Can't reach database server"

**Solution:**
1. Verify DATABASE_URL is correct in Vercel env variables
2. Check database is running (Neon.tech dashboard)
3. Verify SSL mode is included: `?sslmode=require`
4. Check IP whitelist if using restricted database

### SSL Certificate Error
**Issue:** "Your connection is not private"

**Solution:**
1. Wait for DNS propagation
2. Verify domain is added in Vercel
3. Check CNAME points to `cname.vercel-dns.com`
4. Force SSL renewal in Vercel dashboard

---

## Domain URLs Summary

### Production URLs
- **Main Site:** https://tasknest.princesite.in
- **Admin Panel:** https://admin.princesite.in
- **API Endpoint:** https://tasknest.princesite.in/api

### Test Accounts

#### Admin Account
```
Email: admin@tasknest.com
Password: SecurePassword123!
```

#### Test Customer (Create after deployment)
```
Register at: https://tasknest.princesite.in/auth/register
```

---

## Monitoring & Maintenance

### Analytics (Optional)
Add Google Analytics or Vercel Analytics:
```js
// Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Error Monitoring
Configure Sentry for error tracking:
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Database Backups
- Neon.tech: Automatic backups included
- Railway: Configure backup schedule in dashboard
- Manual: Use `pg_dump` for manual backups

---

## Quick Commands

```bash
# Local development
npm run dev                    # Start dev server on localhost:3001

# Build and deploy
npm run build                  # Build for production
npm start                      # Start production server

# Database
npx prisma studio              # Open database GUI
npx prisma migrate deploy      # Run migrations
node prisma/seed.js            # Seed database

# Git deployment
git add .
git commit -m "Update"
git push origin main           # Auto-deploys to Vercel
```

---

## Support

For deployment issues:
- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs

---

**Last Updated:** February 8, 2026
**Status:** Ready for Production ✅

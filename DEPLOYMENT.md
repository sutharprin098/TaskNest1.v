# TaskNest - Production Deployment Guide

## Prerequisites
- Node.js 18+ installed
- Domain name registered
- Hosting platform account (Vercel/Railway/Render)

## Deployment Steps

### 1. Domain Configuration

#### Option A: Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add custom domain in Vercel dashboard
4. Update DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

#### Option B: Railway
1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Deploy: `railway up`
4. Add custom domain in Railway dashboard

#### Option C: Your Own VPS
1. Set up Nginx reverse proxy
2. Configure SSL with Let's Encrypt
3. Set up PM2 for process management

### 2. Environment Variables

Create `.env.production` file with these variables:

```env
# Production Database (PostgreSQL recommended)
DATABASE_URL="postgresql://user:password@host:5432/tasknest"

# JWT Secret (Generate a strong secret!)
JWT_SECRET="replace-with-strong-random-string-at-least-32-chars"

# Production Domain
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NEXT_PUBLIC_DOMAIN="yourdomain.com"

# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="noreply@yourdomain.com"
SMTP_PASSWORD="your-app-password"

# Payment Gateway (Razorpay for India)
RAZORPAY_KEY_ID="rzp_live_xxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="your-secret-key"

NODE_ENV="production"
```

### 3. Database Migration (PostgreSQL)

For production, switch from SQLite to PostgreSQL:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   npx prisma db push
   node prisma/seed.js
   ```

### 4. Build & Deploy

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### 5. DNS Configuration

Update your domain DNS settings:

| Type  | Name | Value                    | TTL  |
|-------|------|--------------------------|------|
| A     | @    | Your server IP           | 3600 |
| CNAME | www  | yourdomain.com           | 3600 |

### 6. SSL Certificate Setup

#### Using Vercel
SSL is automatic - Vercel handles it for you.

#### Using Let's Encrypt (VPS)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 7. Security Checklist

- [ ] Change JWT_SECRET to strong random string
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Regular database backups
- [ ] Monitor error logs

### 8. Post-Deployment Tasks

1. **Test all pages:**
   - Homepage
   - Services listing
   - Individual service pages
   - Pricing page
   - About/Contact pages
   - Authentication (Login/Register)
   - Customer dashboard
   - Booking functionality
   - Admin panel
   - Privacy/Terms pages

2. **SEO Setup:**
   - Update sitemap.xml
   - Submit to Google Search Console
   - Add Google Analytics
   - Update meta tags with your domain

3. **Performance:**
   - Enable image optimization
   - Configure CDN
   - Set up caching headers

## Environment-Specific URLs

### Development
```
http://localhost:3000
```

### Staging (Optional)
```
https://staging.yourdomain.com
```

### Production
```
https://yourdomain.com
https://www.yourdomain.com
```

## Common Issues

### Database Connection
If you get database connection errors:
1. Check DATABASE_URL format
2. Verify database credentials
3. Ensure database server is running
4. Check firewall/security group rules

### Build Errors
If build fails:
1. Run `npm run build` locally first
2. Check for TypeScript errors
3. Verify all environment variables are set

### Domain Not Working
1. Wait for DNS propagation (up to 48 hours)
2. Verify A/CNAME records are correct
3. Clear browser cache
4. Check SSL certificate status

## Support

For deployment help:
- Email: tech@tasknest.com
- Documentation: See README.md

## Rollback Plan

If deployment fails:
1. Restore previous version
2. Check error logs
3. Fix issues locally
4. Test before redeploying

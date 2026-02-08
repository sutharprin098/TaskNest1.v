# TaskNest - Complete Testing Checklist

## Pre-Testing Setup
- [ ] Server running on http://localhost:3001
- [ ] Database seeded with data
- [ ] Admin account created (admin@tasknest.com / admin123)

## 1. Public Pages

### Homepage (/)
- [ ] Hero section displays correctly
- [ ] Services grid shows all 5 services with Indian pricing (₹)
- [ ] Service cards link to individual service pages
- [ ] How it works section visible
- [ ] Testimonials section visible
- [ ] Footer links work
- [ ] All text mentions "Delhi" not "Dubai"

### Services Listing (/services)
- [ ] All 5 services displayed
- [ ] Correct pricing shown (₹399, ₹299, ₹249, ₹1499, ₹499)
- [ ] "View Details" button works
- [ ] "Book Now" button works
- [ ] Service descriptions accurate

### Individual Service Pages
- [ ] /services/home-cooking displays correctly
- [ ] /services/event-cooking displays correctly
- [ ] /services/home-organization displays correctly
- [ ] /services/seasonal-concierge displays correctly
- [ ] /services/custom-cooking displays correctly
- [ ] Each page shows features, pricing, booking card
- [ ] Location shows "Delhi"
- [ ] Booking buttons work

### Pricing Page (/pricing)
- [ ] Three pricing tiers displayed
- [ ] Indian pricing (₹) shown correctly
- [ ] Feature lists accurate
- [ ] CTA buttons work

### About Us (/about)
- [ ] Mission statement displays
- [ ] Company values section visible
- [ ] Statistics section shows
- [ ] CTA buttons work
- [ ] Text mentions "Delhi"

### Contact Page (/contact)
- [ ] Contact form loads
- [ ] Form validation works
- [ ] Address shows Delhi location
- [ ] Phone number is Indian format (+91)
- [ ] Email links work
- [ ] Form submission works

### Legal Pages
- [ ] /privacy-policy loads and displays content
- [ ] /terms-of-service loads and displays content
- [ ] Both pages properly formatted
- [ ] Footer links to these pages work

## 2. Authentication

### Registration (/auth/register)
- [ ] Form loads correctly
- [ ] Email validation works
- [ ] Password requirements enforced
- [ ] Address placeholder shows "Delhi"
- [ ] Successful registration redirects to dashboard
- [ ] Error messages display properly
- [ ] Link to login page works

### Login (/auth/login)
- [ ] Form loads correctly
- [ ] Email/password validation works
- [ ] Successful login redirects to dashboard
- [ ] Admin login redirects to admin dashboard
- [ ] Error messages display properly
- [ ] Link to registration page works
- [ ] "Remember me" functionality works

### Password Security
- [ ] Passwords are hashed (bcrypt)
- [ ] JWT tokens generated correctly
- [ ] Token stored in localStorage
- [ ] Logout clears token

## 3. Customer Dashboard

### Dashboard Home (/dashboard)
- [ ] User info displays correctly
- [ ] Bookings list shows
- [ ] "Book New Service" button works
- [ ] Booking status badges display correctly
- [ ] Logout button works

### Book Service (/dashboard/book)
- [ ] Service cards with images display
- [ ] Card selection works (highlights selected)
- [ ] Date picker works (validates future dates)
- [ ] Duration validation (min 2h for home cooking)
- [ ] Guest count field appears for event cooking
- [ ] Address field validates (min 10 chars)
- [ ] Real-time field validation shows errors
- [ ] Error messages styled well (red borders, icons)
- [ ] Price calculator updates dynamically
- [ ] Form submission works
- [ ] Success redirects to dashboard

## 4. Admin Panel

### Admin Dashboard (/admin/dashboard)
- [ ] Statistics cards display (users, bookings, workers, revenue)
- [ ] Recent bookings table shows
- [ ] Navigation menu works
- [ ] All navigation links functional:
  - [ ] Overview (dashboard)
  - [ ] Bookings
  - [ ] Workers
  - [ ] Users
  - [ ] Services (NEW)
- [ ] Logout button works
- [ ] Access restricted to admin role

### Bookings Management (/admin/bookings)
- [ ] All bookings table displays
- [ ] Filter buttons work (All, Pending, Confirmed, Completed)
- [ ] Booking details show correctly
- [ ] Customer info visible
- [ ] Service details accurate
- [ ] Worker assignment visible
- [ ] Status badges display correctly
- [ ] Date formatting correct
- [ ] Indian pricing (₹) displayed
- [ ] Back button works

### Workers Management (/admin/workers)
- [ ] Workers grid displays
- [ ] Filter buttons work (All, Active, Inactive)
- [ ] Worker cards show all info
- [ ] Service type icons correct
- [ ] Hourly rate in ₹
- [ ] Rating and jobs count visible
- [ ] Status badges display
- [ ] Back button works

### Users Management (/admin/users)
- [ ] Users table displays
- [ ] Filter buttons work (All, Customers, Admins)
- [ ] User details accurate
- [ ] Role badges display correctly
- [ ] Booking count shows
- [ ] Join date formatted correctly
- [ ] City shows "Delhi"
- [ ] Back button works

### Services Management (/admin/services) - NEW
- [ ] All 5 services displayed
- [ ] Service cards show emoji icons
- [ ] Current pricing visible (₹)
- [ ] Edit button works
- [ ] Price editing form appears
- [ ] Save button updates price
- [ ] Cancel button works
- [ ] Success/error messages display
- [ ] API update works
- [ ] Back button works

## 5. Navigation & UI

### Navbar
- [ ] Logo links to homepage
- [ ] All navigation links work:
  - [ ] Home
  - [ ] Services
  - [ ] Pricing
  - [ ] About
  - [ ] Contact
- [ ] Login/Register buttons visible when logged out
- [ ] Dashboard/Logout buttons visible when logged in
- [ ] Mobile menu works (responsive)
- [ ] Active page highlighted

### Footer
- [ ] All service links work
- [ ] Company links work (About, Pricing, Contact)
- [ ] Legal links work (Privacy, Terms)
- [ ] Copyright text shows
- [ ] Footer displays on all pages
- [ ] Text mentions "Delhi"

## 6. Responsive Design

### Mobile (< 768px)
- [ ] Homepage mobile-friendly
- [ ] Services grid stacks vertically
- [ ] Forms usable on mobile
- [ ] Tables scroll horizontally
- [ ] Navigation menu collapses
- [ ] Cards display properly

### Tablet (768px - 1024px)
- [ ] Two-column layouts work
- [ ] Service cards adapt
- [ ] Admin tables readable
- [ ] Dashboard responsive

### Desktop (> 1024px)
- [ ] Full layouts display
- [ ] Three-column grids work
- [ ] Admin panel optimal
- [ ] All spacing correct

## 7. Data & Pricing

### Indian Pricing Verification
- [ ] Home Cooking: ₹399/hour
- [ ] Event Cooking: ₹299/guest
- [ ] Home Organization: ₹249/hour
- [ ] Seasonal Concierge: ₹1499
- [ ] Custom Cooking: ₹499/hour
- [ ] All rupee symbols (₹) not AED
- [ ] All location text says "Delhi" not "Dubai"

### Database Operations
- [ ] User registration creates record
- [ ] Login fetches correct user
- [ ] Booking creation works
- [ ] Price calculations accurate
- [ ] Admin queries return data
- [ ] Service price updates persist

## 8. Performance & SEO

### Performance
- [ ] Pages load under 3 seconds
- [ ] No console errors
- [ ] Images optimized
- [ ] CSS loads correctly
- [ ] No broken links

### SEO
- [ ] Page titles accurate
- [ ] Meta descriptions set
- [ ] Og:image tags present
- [ ] Sitemap accessible
- [ ] Robots.txt configured

## 9. Security

### Authentication
- [ ] Protected routes redirect to login
- [ ] JWT tokens validated
- [ ] Admin routes check role
- [ ] Passwords hashed in DB
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented

### API Security
- [ ] All API routes check auth
- [ ] Input validation works (Zod)
- [ ] SQL injection prevented (Prisma)
- [ ] Rate limiting configured
- [ ] Error messages don't leak info

## 10. Browser Compatibility

### Tested Browsers
- [ ] Chrome/Edge (Latest)
- [ ] Firefox (Latest)
- [ ] Safari (Latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

## Production Readiness

### Pre-Deployment
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] Build completes successfully
- [ ] Environment variables documented
- [ ] Database migrations ready
- [ ] SSL certificate configured
- [ ] Domain DNS configured
- [ ] Error monitoring set up
- [ ] Backup strategy in place

### Post-Deployment
- [ ] Production URL accessible
- [ ] SSL working (HTTPS)
- [ ] Database connected
- [ ] All pages load
- [ ] Forms submit correctly
- [ ] Admin panel accessible
- [ ] Email notifications work (if configured)
- [ ] Payment gateway works (if configured)

## Testing Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database migrations
npx prisma migrate dev

# Seed database
node prisma/seed.js

# Generate Prisma client
npx prisma generate
```

## Known Issues
- [ ] List any known issues here
- [ ] Track fixes needed

## Testing Notes
- Test with both admin and customer accounts
- Clear browser cache between tests
- Use different browsers
- Test on different screen sizes
- Document any bugs found

---

Last Updated: February 8, 2026

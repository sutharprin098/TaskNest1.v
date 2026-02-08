// Test script to verify admin access works correctly
const fs = require('fs');
const path = require('path');

// Check if all admin pages have correct auth checks
const adminPagesDir = path.join(__dirname, 'src/app/admin');
const adminPages = [
  'dashboard/page.tsx',
  'services/page.tsx',
  'bookings/page.tsx',
  'workers/page.tsx',
  'users/page.tsx'
];

console.log('🔍 Checking admin page authentication...\n');

let allCorrect = true;

adminPages.forEach(page => {
  const filePath = path.join(adminPagesDir, page);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if it's checking localStorage.getItem("user") instead of "role"
  const hasCorrectCheck = content.includes('localStorage.getItem("user")');
  const parseUser = content.includes('JSON.parse(userData)');
  const checkRole = content.includes('user.role !== "ADMIN"');
  
  const isCorrect = hasCorrectCheck && parseUser && checkRole;
  
  console.log(`${isCorrect ? '✅' : '❌'} ${page}`);
  if (!isCorrect) {
    console.log(`   - Has user check: ${hasCorrectCheck}`);
    console.log(`   - Parses user: ${parseUser}`);
    console.log(`   - Checks role: ${checkRole}`);
    allCorrect = false;
  }
});

console.log('\n' + (allCorrect ? '✅ All admin pages have correct authentication!' : '❌ Some pages need fixing'));

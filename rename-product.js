const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/lib/db.ts',
  'src/app/(dashboard)/layout.tsx',
  'src/app/(marketing)/founder/page.tsx',
  'src/app/(marketing)/contact/page.tsx',
  'src/app/layout.tsx',
  'src/app/(marketing)/page.tsx',
  'src/components/layout/Footer.tsx',
  'src/app/(marketing)/why/page.tsx',
  'src/components/layout/Navbar.tsx',
  'src/app/(marketing)/products/page.tsx',
  'setup-contact-db.js' // also updating the setup script just in case
];

filesToUpdate.forEach(relativePath => {
  const absolutePath = path.join(__dirname, relativePath);
  if (fs.existsSync(absolutePath)) {
    let content = fs.readFileSync(absolutePath, 'utf8');
    
    // Perform case-sensitive replacements
    content = content.replace(/Finage/g, 'Finfix');
    content = content.replace(/FINAGE/g, 'FINFIX');
    content = content.replace(/finage/g, 'finfix');
    
    fs.writeFileSync(absolutePath, content, 'utf8');
    console.log(`Updated: ${relativePath}`);
  } else {
    console.warn(`File not found: ${absolutePath}`);
  }
});

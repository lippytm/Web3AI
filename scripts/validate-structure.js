#!/usr/bin/env node

/**
 * Validation script to check the application structure
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔍 Validating Web3AI Application Structure...\n');

const checks = [];

// Backend checks
const backendFiles = [
  '../backend/src/index.js',
  '../backend/src/config/database.js',
  '../backend/src/config/jwt.js',
  '../backend/src/controllers/authController.js',
  '../backend/src/controllers/blockchainController.js',
  '../backend/src/controllers/aiController.js',
  '../backend/src/middleware/auth.js',
  '../backend/src/middleware/errorHandler.js',
  '../backend/src/models/User.js',
  '../backend/src/models/BlockchainInteraction.js',
  '../backend/src/routes/auth.js',
  '../backend/src/routes/blockchain.js',
  '../backend/src/routes/ai.js',
  '../backend/src/services/aiService.js',
  '../backend/src/services/blockchainService.js',
  '../backend/Dockerfile',
  '../backend/package.json',
];

// Frontend checks
const frontendFiles = [
  '../frontend/src/App.jsx',
  '../frontend/src/main.jsx',
  '../frontend/src/components/Navbar.jsx',
  '../frontend/src/components/Footer.jsx',
  '../frontend/src/pages/Home.jsx',
  '../frontend/src/pages/Login.jsx',
  '../frontend/src/pages/Register.jsx',
  '../frontend/src/pages/Dashboard.jsx',
  '../frontend/src/pages/AIAnalysis.jsx',
  '../frontend/src/pages/Blockchain.jsx',
  '../frontend/src/context/AuthContext.jsx',
  '../frontend/src/context/Web3Context.jsx',
  '../frontend/src/services/api.js',
  '../frontend/src/services/authService.js',
  '../frontend/src/services/blockchainService.js',
  '../frontend/src/services/aiService.js',
  '../frontend/Dockerfile',
  '../frontend/package.json',
  '../frontend/tailwind.config.js',
];

// Root level checks
const rootFiles = [
  '../docker-compose.yml',
  '../README.md',
  '../.github/workflows/ci-cd.yml',
];

function checkFiles(files, category) {
  console.log(`\n📂 Checking ${category}...`);
  let passed = 0;
  let failed = 0;

  files.forEach(file => {
    const fullPath = path.join(__dirname, file);
    const exists = fs.existsSync(fullPath);
    
    if (exists) {
      console.log(`  ✓ ${file.replace('../', '')}`);
      passed++;
    } else {
      console.log(`  ✗ MISSING: ${file.replace('../', '')}`);
      failed++;
    }
  });

  console.log(`  ${passed}/${files.length} files found`);
  return { passed, failed };
}

const backendResult = checkFiles(backendFiles, 'Backend');
const frontendResult = checkFiles(frontendFiles, 'Frontend');
const rootResult = checkFiles(rootFiles, 'Root Configuration');

const totalPassed = backendResult.passed + frontendResult.passed + rootResult.passed;
const totalFiles = backendFiles.length + frontendFiles.length + rootFiles.length;

console.log('\n' + '='.repeat(50));
console.log(`\n📊 Summary: ${totalPassed}/${totalFiles} files validated`);

if (totalPassed === totalFiles) {
  console.log('\n✅ All structure checks passed!\n');
  process.exit(0);
} else {
  console.log(`\n⚠️  ${totalFiles - totalPassed} files missing!\n`);
  process.exit(1);
}

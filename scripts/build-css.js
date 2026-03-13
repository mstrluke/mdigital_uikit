/**
 * Build script for styles/global.css
 *
 * Transforms src/styles/global.css for npm distribution:
 * 1. Removes @import "tailwindcss" (consumer provides their own)
 * 2. Removes the dev-only comment block
 * 3. Fixes @source path from ../../dist to ../dist
 *
 * The shipped CSS contains only:
 * - @import "tw-animate-css" (animation utilities used by components)
 * - @source "../dist" (tells consumer's Tailwind to scan our compiled JS)
 * - @custom-variant dark (dark mode variant definition)
 * - @theme { ... } (all design tokens)
 * - @utility ... (slot system + custom utilities)
 * - @layer base { ... } (base styles)
 * - Component CSS (datepicker, animations)
 */
import { readFileSync, writeFileSync } from 'fs';

const src = readFileSync('src/styles/global.css', 'utf8');

const out = src
  // Remove the dev-only comment block + @import "tailwindcss"
  .replace(/\/\*[\s\S]*?Build strips this line[\s\S]*?\*\/\n@import "tailwindcss";\n/, '')
  // Fix @source path for consumer (node_modules/@mdigital_ui/ui/styles/ → ../dist/)
  .replace('@source "../../dist"', '@source "../dist"');

writeFileSync('styles/global.css', out);
console.log(`styles/global.css written (${out.length} bytes)`);

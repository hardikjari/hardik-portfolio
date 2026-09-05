const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="bgGrad" cx="35%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#1e183d"/>
      <stop offset="50%" stop-color="#110d24"/>
      <stop offset="100%" stop-color="#070510"/>
    </radialGradient>

    <!-- Glowing Border Gradient -->
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c084fc"/>
      <stop offset="50%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>

    <!-- H Left Stem Gradient -->
    <linearGradient id="hLeftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f5ecff"/>
      <stop offset="35%" stop-color="#d8b4fe"/>
      <stop offset="70%" stop-color="#c084fc"/>
      <stop offset="100%" stop-color="#9333ea"/>
    </linearGradient>

    <!-- H Right Stem Gradient -->
    <linearGradient id="hRightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#eef2ff"/>
      <stop offset="35%" stop-color="#c7d2fe"/>
      <stop offset="70%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#4f46e5"/>
    </linearGradient>

    <!-- H Crossbar Gradient -->
    <linearGradient id="hBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c084fc"/>
      <stop offset="50%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#818cf8"/>
    </linearGradient>

    <!-- Core Tech Node Gradient -->
    <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#a5f3fc"/>
      <stop offset="40%" stop-color="#38bdf8"/>
      <stop offset="80%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </radialGradient>

    <!-- Drop Shadow for 3D depth -->
    <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000000" flood-opacity="0.65"/>
    </filter>

    <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="glow"/>
      <feComposite in="SourceGraphic" in2="glow" operator="over"/>
    </filter>
  </defs>

  <!-- Squircle Base -->
  <rect x="28" y="28" width="456" height="456" rx="112" fill="url(#bgGrad)" stroke="url(#borderGrad)" stroke-width="14"/>

  <!-- Inner Ambient Border -->
  <rect x="44" y="44" width="424" height="424" rx="98" fill="none" stroke="url(#borderGrad)" stroke-width="2" opacity="0.3"/>

  <!-- Capital H Monogram Group with 3D Depth -->
  <g filter="url(#shadow3d)">
    <!-- Left Pillar of H -->
    <rect x="124" y="112" width="80" height="288" rx="22" fill="url(#hLeftGrad)"/>

    <!-- Right Pillar of H -->
    <rect x="308" y="112" width="80" height="288" rx="22" fill="url(#hRightGrad)"/>

    <!-- Center Crossbar of H -->
    <rect x="180" y="220" width="152" height="72" rx="18" fill="url(#hBarGrad)"/>

    <!-- Center Tech Node (Cyan glow anchor) -->
    <circle cx="256" cy="256" r="16" fill="url(#coreGrad)" filter="url(#neonGlow)"/>
    <circle cx="256" cy="256" r="7" fill="#ffffff"/>
  </g>
</svg>`;

function buildIco(images) {
  // images: array of { width, height, buffer }
  const count = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * count;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(count, 4); // number of images

  const dirEntries = [];
  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.buffer.length, 8); // image byte size
    entry.writeUInt32LE(offset, 12); // image offset

    offset += img.buffer.length;
    dirEntries.push(entry);
  }

  return Buffer.concat([header, ...dirEntries, ...images.map(img => img.buffer)]);
}

async function main() {
  const rootDir = path.resolve(__dirname, '..');
  const appDir = path.join(rootDir, 'src', 'app');
  const publicDir = path.join(rootDir, 'public');

  console.log('Writing SVG icons...');
  // Write SVG files
  fs.writeFileSync(path.join(appDir, 'icon.svg'), svgIcon, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgIcon, 'utf8');

  console.log('Rendering PNG icons via Sharp...');
  const svgBuffer = Buffer.from(svgIcon);

  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  const png512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();

  // Save Apple touch icons & app icon.png
  fs.writeFileSync(path.join(appDir, 'icon.png'), png512);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), png180);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);

  // Build multi-size ICO containing 16x16, 32x32, 48x48
  console.log('Generating ICO files...');
  const icoBuffer = buildIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ]);

  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

  console.log('All favicon assets generated successfully!');
}

main().catch(err => {
  console.error('Failed to generate favicons:', err);
  process.exit(1);
});

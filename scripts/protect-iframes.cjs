const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

// Anti-debug + anti-right-click script (plain, not obfuscated for reliability)
const antiDebugScript = `
(function(){try{
  document.addEventListener('contextmenu',function(e){e.preventDefault();});
  document.addEventListener('keydown',function(e){
    if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&(e.key==='I'||e.key==='J'))||(e.ctrlKey&&e.key==='U')){e.preventDefault();}
  });
  setInterval(function(){
    if(window.outerHeight-window.innerHeight>160||window.outerWidth-window.innerWidth>160){document.body.innerHTML='';}
  },1000);
}catch(e){}})();
`;

// Copyright watermark to embed in obfuscated code
const copyrightWatermark = `
// © 2025 ingozhou. All rights reserved.
// Unauthorized commercial use is prohibited.
// Source: github.com/ingozhou66
`;

function obfuscateHtmlFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const originalSize = Buffer.byteLength(html, 'utf8');

  // 1. Inject anti-debug script right after <head> tag
  const headEndMatch = html.match(/<head[^>]*>/i);
  if (headEndMatch) {
    const headEndIndex = headEndMatch.index + headEndMatch[0].length;
    html = html.slice(0, headEndIndex) + '\n<script>' + antiDebugScript + '</script>' + html.slice(headEndIndex);
  }

  // 2. Add copyright comment at the very top (before DOCTYPE if possible, or right after)
  if (!html.includes('© 2025 ingozhou')) {
    const doctypeMatch = html.match(/<!DOCTYPE[^>]*>/i);
    if (doctypeMatch) {
      const afterDoctype = doctypeMatch.index + doctypeMatch[0].length;
      html = html.slice(0, afterDoctype) + '\n<!--\n  ' + copyrightWatermark.trim().replace(/\n/g, '\n  ') + '\n-->' + html.slice(afterDoctype);
    }
  }

  // 3. Obfuscate all inline <script> tags
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let lastIndex = 0;
  let result = '';

  while ((match = scriptRegex.exec(html)) !== null) {
    // Append text before this script tag
    result += html.slice(lastIndex, match.index);

    const fullMatch = match[0];
    const jsCode = match[1];

    // Skip empty or already-minified scripts (heuristic: very short)
    if (jsCode.trim().length < 50) {
      result += fullMatch;
      lastIndex = scriptRegex.lastIndex;
      continue;
    }

    // Skip scripts with src attribute (external JS)
    const hasSrc = /<script\b[^>]*\bsrc\s*=/.test(fullMatch.split('>')[0] + '>');
    if (hasSrc) {
      result += fullMatch;
      lastIndex = scriptRegex.lastIndex;
      continue;
    }

    try {
      const obfuscated = JavaScriptObfuscator.obfuscate(jsCode, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.7,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.3,
        debugProtection: true,
        debugProtectionInterval: 2000,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        rotateStringArray: true,
        selfDefending: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.75,
        transformObjectKeys: true,
        unicodeEscapeSequence: false,
      }).getObfuscatedCode();

      result += fullMatch.replace(jsCode, '\n' + obfuscated + '\n');
    } catch (err) {
      console.warn(`Warning: Could not obfuscate script in ${filePath}: ${err.message}`);
      result += fullMatch;
    }

    lastIndex = scriptRegex.lastIndex;
  }

  // Append remaining text after last script
  result += html.slice(lastIndex);

  fs.writeFileSync(filePath, result);

  const newSize = Buffer.byteLength(result, 'utf8');
  const ratio = ((newSize / originalSize) * 100).toFixed(1);
  console.log(`✓ Protected: ${path.basename(filePath)} (${(originalSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB, ${ratio}%)`);
}

const files = [
  path.join(__dirname, '../public/projects/01-家庭财务中枢.html'),
  path.join(__dirname, '../public/projects/03-持仓管理器.html'),
];

files.forEach(obfuscateHtmlFile);
console.log('Done. Both iframe HTML files have been protected.');

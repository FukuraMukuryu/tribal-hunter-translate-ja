const fs = require('fs');

let files = [
  'scrDataBoss',
  'scrDataCinem',
  'scrDataMaps',
  'scrDataMenu',
  'scrDataNPCchat',
  'scrDataTLBeach',
  'scrDataTLCastle',
  'scrDataTLCrystal',
  'scrDataTLGhost',
  'scrDataTLHive',
  'scrDataTLJungle',
  'scrDataTLMountain',
  'scrDataTLPiglands1',
  'scrDataTLSlime',
  'scrDataTLVillage',
  'scrDataTV',
  'scrDataTriggerBeach',
  'scrDataTriggerCastle',
  'scrDataTriggerCrystal',
  'scrDataTriggerGhost',
  'scrDataTriggerHive',
  'scrDataTriggerJungle',
  'scrDataTriggerMountain',
  'scrDataTriggerPiglands1',
  'scrDataTriggerSlime',
  'scrDataTriggerVillage'
];

let selectedFiles = [];
if (process.argv.length > 2) {
  for (let i = 2; i < process.argv.length; i++) {
    const fileName = process.argv[i];
    if (files.includes(fileName)) {
      selectedFiles.push(fileName);
    }
  }
  files = selectedFiles;
}

let sentenceCount = 0;
let translatedCount = 0;
let outData = 'key, ja, en, translated\n';

for (let i = 0; i < files.length; i++) {
  const readFileName = `${files[i]}.txt`;
  console.log(`--- Read file ${readFileName} ... ---`);
  const jsonJa = JSON.parse(fs.readFileSync(`./ja/${readFileName}`, 'utf8')).scr;
  const jsonEn = JSON.parse(fs.readFileSync(`./en/${readFileName}`, 'utf8')).scr;

  for (const key in jsonJa) {
    if (key === 'EOF') {
      continue;
    }
    const translated = jsonJa[key] !== jsonEn[key] ? 1 : 0;
    outData += `${key}, "${jsonJa[key]}", "${jsonEn[key]}", ${translated}\n`;
    sentenceCount++;
    translatedCount += translated;
  }
}

const outputFileName = `out-${translatedCount}-${sentenceCount}.csv`;

fs.writeFile(outputFileName, outData, (err, data) => {
  if (err) console.error(err);
  else console.log('Write end!');
});

const fs = require('fs');

const files = [
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

let sentenceCount = 0;
let translatedCount = 0;
let outData = 'key, ja, en, translated\n';

for (let i = 0; i < files.length; i++) {
  const readFileName = `${files[i]}.txt`;
  console.log(`--- Read file ${readFileName} ... ---`);
  const jsonJa = JSON.parse(fs.readFileSync(`./ja/${readFileName}`, 'utf8')).scr;
  const jsonEn = JSON.parse(fs.readFileSync(`./en/${readFileName}`, 'utf8')).scr;

  for (const key in jsonJa) {
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

console.log(`Greetings from ${module.id}!`);

import AustrianFlag from "famfamfam-flags/dist/png/at.png";

console.log(`The flag is ${AustrianFlag}`);

document.getElementById('client-render-target').innerHTML=`Browser time: ${new Date} <img src="${AustrianFlag}"/>`;

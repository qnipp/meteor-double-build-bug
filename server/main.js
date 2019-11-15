import { Meteor } from "meteor/meteor";
import { onPageLoad } from "meteor/server-render";

import AustrianFlag from "famfamfam-flags/dist/png/at.png";

Meteor.startup(() => {
  // Code to run on server startup.
  console.log(`Greetings from ${module.id}!`);
  console.log(`The flag is ${AustrianFlag}`)
});

onPageLoad(sink => {
  // Code to run on every request.
  sink.renderIntoElementById(
    "server-render-target",
    `Server time: ${new Date} <img src="${AustrianFlag}"/>`
  );
});

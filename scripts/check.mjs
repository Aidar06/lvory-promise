import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','dist');
for(const file of ['index.html','styles.css','app.js','assets/images/hero-background.webp','assets/images/program-background.webp','assets/images/wish-background.webp','assets/images/countdown-background.webp','assets/images/envelope-letter.webp','assets/fonts/cormorant-regular.woff2']) assert(fs.statSync(path.join(root,file)).size>100,`Missing ${file}`);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
const js=fs.readFileSync(path.join(root,'app.js'),'utf8');
for(const marker of ['hero-background.webp','Бекзат','Алина','languageMenu','venueSection','rsvpForm','siteLoader']) assert(html.includes(marker),`Missing ${marker}`);
assert(!html.includes('menu-button'),'Obsolete hamburger menu is still present');
for(const marker of ['100svh','prefers-reduced-motion','preview-mode','language-menu','venue-section']) assert(css.includes(marker),`Missing ${marker}`);
for(const marker of ['API_BASE','/rsvp','previewMode','renderLanguageMenu','renderCalendar','renderVenue','loadInvitation']) assert(js.includes(marker),`Missing ${marker}`);
console.log('Passed: assets, API loading, RSVP, preview mode, languages, maps, countdown, and responsive layout markers.');

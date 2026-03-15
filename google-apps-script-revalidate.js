/**
 * Nexera — Google Apps Script: Instant Revalidation Trigger
 * ──────────────────────────────────────────────────────────
 * How to set up:
 *
 * 1. Open your Google Sheet → Extensions → Apps Script
 * 2. Paste this entire file into the editor
 * 3. Replace SITE_URL and REVALIDATE_SECRET with your real values
 * 4. Click "Save" (floppy disk icon)
 * 5. To auto-trigger on every edit:
 *    - Click "Triggers" (clock icon on left sidebar)
 *    - Add trigger: Function = revalidateSite, Event = On edit (or On change)
 *    - Click Save
 *
 * After setup, every time you edit a cell in the Sheet, the site will
 * refresh its content within a few seconds instead of waiting up to 1 hour.
 */

var SITE_URL         = 'https://nexera.uz';          // ← your production URL
var REVALIDATE_SECRET = 'change_me_to_a_random_string'; // ← match REVALIDATE_SECRET in .env

function revalidateSite() {
  var url     = SITE_URL + '/api/revalidate';
  var options = {
    method:  'post',
    headers: { 'x-revalidate-secret': REVALIDATE_SECRET },
    muteHttpExceptions: true,
  };

  var response = UrlFetchApp.fetch(url, options);
  var code     = response.getResponseCode();

  if (code === 200) {
    Logger.log('✅ Site revalidated successfully');
  } else {
    Logger.log('❌ Revalidation failed — HTTP ' + code + ': ' + response.getContentText());
  }
}

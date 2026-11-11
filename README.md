# Qualify.io — Website V1.4

Qualify.io is a **university CRM project simulation**, created with plain HTML, CSS and JavaScript. The website is ready for GitHub Pages. It does not collect real people's data. Do not enter real identities into test forms.

## Preview locally

Open `index.html` in a browser or run `python3 -m http.server 8000` in this folder and visit `http://localhost:8000`.

## Updating content later — without reworking the design

| What you want to add/change | Only edit this file |
| --- | --- |
| LinkedIn company-page URL, HubSpot Meetings link, contact email, checklist destination | `js/config.js` |
| Webinar titles, date/time, descriptions, registration URLs | `js/webinars.js` |
| Blog preview titles and links, approved solution blurbs | `js/content.js` |
| Full blog articles | `js/articles.js` |
| Colors or layout (only when you want a redesign) | `css/styles.css` |

### Add an approved webinar

Open `js/webinars.js`. Insert the entry below **between** `[` and `]`, replacing every capitalized placeholder with your team's real/approved text and URL:

```js
{
  title: "CONFIRMED WEBINAR TITLE",
  date: "CONFIRMED DATE",
  time: "CONFIRMED TIME AND TIME ZONE",
  description: "APPROVED SUMMARY",
  registrationUrl: "https://REAL-REGISTRATION-URL"
}
```

This is an example **format**, not a webinar. Do not paste it as a real event. Add commas between objects if you have several webinars. You may omit the `time`, `description`, or `registrationUrl` lines until they're confirmed.

Webinars automatically appear on both the homepage and the Webinars page. If the list is empty, no invented events appear. Without a real registration link, no registration button is shown.

### Add LinkedIn or your HubSpot Meetings link

Open `js/config.js` and replace the empty quoted string after `linkedinUrl` or `demoBookingUrl` with the **actual URL provided by your team**. These links will then appear on the site. The HubSpot checklist landing page already uses your published URL.

### Add blog articles

All three approved full blog posts already appear. `js/articles.js` stores full text; `js/content.js` stores preview cards. A newly approved article must be added to both. The article route uses `blog.html?id=article-id`.

## Publish on GitHub Pages

1. Create a new **public** repository on GitHub, e.g. `qualify-io` (public is required for GitHub Pages with a free account). Leave the repository empty if you prefer uploading everything at once.
2. Unzip `qualifyio-website-v1.4.zip` on your Mac. Inside the unzipped folder, select **all its contents** (not the ZIP and not the enclosing folder).
3. In the empty repository, choose **uploading an existing file**. Or, if it already has files, **Add file → Upload files**. Drag in every `.html` file, plus the `js`, `css`, `assets` folders and this README.
4. Commit the files to branch `main`. **`index.html` must be at the repository root**, not within a nested folder.
5. Go to **Settings → Pages → Build and deployment**. Set **Source: Deploy from a branch**, **Branch: main**, **Folder: /(root)** and click **Save**.
6. Use **Visit site** in Settings → Pages when publishing finishes. The address will follow `https://YOUR-GITHUB-USERNAME.github.io/qualify-io/` if the repo is named `qualify-io`.

Afterward, you can edit `js/webinars.js` or `js/config.js` using the GitHub pencil (Edit) control and commit. GitHub Pages republishes the site when the new commit reaches `main`.

## Existing integrations

- Blog #1 checklist CTA, homepage checklist CTA, and Resources checklist CTA go to `https://aivise.hs-sites.com/recruitment-efficiency-checklist`.
- The form, thank-you page, and download remain **hosted on HubSpot** and do not need to be recreated in GitHub.
- Product demo and LinkedIn URLs are deliberately unset until your team supplies them.
- No webinar titles, dates, speakers, social accounts, testimonials, or contact addresses were fabricated.

## Files

`index.html` is the homepage. Other `.html` files are pages within the same site. `blog.html` is a reusable template for all articles. The common nav/footer come from `js/site.js`; content/links are stored separately.

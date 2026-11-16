/**
 * Qualify.io â€” Webinar integration
 * Update this file at: js/webinars.js
 * It both supplies webinar data to the website and ensures a visible card
 * on the homepage and Webinars page, even if the site's renderer is older.
 */
window.QUALIFY_WEBINARS = [
  {
    title: "Beyond the CV",
    date: "Thursday, 26, 2026",
    time: "16:00 - 16:30",
    description: "How Gamification and Skills-Based Assessments Are Changing Recruitment. Bring Human Insight Back to Hiring.",
    registrationUrl: "https://aivise.hs-sites.com/qualify.io-webinar-registration"
  }
];

(() => {
  "use strict";
  const webinar = window.QUALIFY_WEBINARS[0];
  const registerUrl = webinar.registrationUrl;

  const styleText = `
    .qio-webinar-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,330px),1fr)); gap:20px; }
    .qio-webinar-feature { border:1px solid #DCE3F0; border-radius:20px; padding:28px 30px;
      background:linear-gradient(130deg,#FFFFFF 55%,#F1F4FF); box-shadow:0 16px 38px rgba(20,38,87,.07);
      min-height:240px; display:flex; flex-direction:column; align-items:flex-start; }
    .qio-webinar-feature h3 { color:#142657; font:800 clamp(25px,3vw,32px)/1.15 Inter,Arial,sans-serif;
      letter-spacing:-.7px; margin:17px 0 9px; max-width:none; }
    .qio-webinar-feature .webinar-top { color:#7088CE; letter-spacing:.1em; font-size:11px; }
    .qio-webinar-feature .webinar-description { color:#516383; font-size:15px; line-height:1.6;
      margin:0 0 12px; max-width:680px; position:relative; z-index:2; }
    .qio-webinar-meta { color:#516383; font:600 13px/1.5 Inter,Arial,sans-serif;
      margin:0 0 17px; position:relative; z-index:2; }
    .qio-webinar-feature .webinar-link, .qio-webinar-register { display:inline-flex; gap:10px;
      align-items:center; padding:12px 18px; background:#FF9128; color:white !important;
      border-radius:10px; text-decoration:none; font:750 14px/1.3 Inter,Arial,sans-serif;
      margin-top:auto; position:relative; z-index:2; transition:background .2s; }
    .qio-webinar-feature .webinar-link:hover, .qio-webinar-register:hover {background:#E87810;}
    .qio-webinar-feature .webinar-pattern { opacity:.3; pointer-events:none; }
    @media(max-width:650px){.qio-webinar-feature{padding:24px 20px}.qio-webinar-feature h3{font-size:25px}}
  `;

  function addStyles() {
    if (document.getElementById('qio-webinar-styles')) return;
    const style = document.createElement('style');
    style.id = 'qio-webinar-styles';
    style.textContent = styleText;
    document.head.appendChild(style);
  }

  function clearPlaceholder(context) {
    if (!context) return;
    const paragraphs = context.querySelectorAll('p');
    paragraphs.forEach(p => {
      if (/Webinar topics and dates will be added when confirmed/i.test(p.textContent)) p.remove();
    });
  }

  function addDetails(article) {
    article.classList.add('qio-webinar-feature');
    let h3 = article.querySelector('h3');
    if (!h3) { h3 = document.createElement('h3'); article.appendChild(h3); }
    h3.textContent = webinar.title;

    let description = article.querySelector('.webinar-description');
    if (!description) { description = document.createElement('p'); description.className='webinar-description'; h3.after(description); }
    description.textContent = webinar.description;

    let meta = article.querySelector('.qio-webinar-meta');
    if (!meta) { meta = document.createElement('p'); meta.className='qio-webinar-meta'; description.after(meta); }
    meta.textContent = 'Educational B2B webinar  â€¢  30 minutes  â€¢  For HR managers and recruiting decision-makers';

    let link = article.querySelector('.webinar-link, .qio-webinar-register');
    if (!link) { link = document.createElement('a'); link.className='webinar-link'; article.appendChild(link); }
    link.href = registerUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Register for the webinar  â†’';
    if (!article.querySelector('.webinar-top')) {
      const top = document.createElement('div');
      top.className='webinar-top';
      top.textContent = 'QUALIFY.IO WEBINAR  Â·  Date to be announced';
      article.insertBefore(top, article.firstChild);
    }
  }

  function makeCard() {
    const article = document.createElement('article');
    article.className = 'webinar-card';
    addDetails(article);
    return article;
  }

  function install() {
    const page = document.body.dataset.page || (location.pathname.endsWith('webinars.html') ? 'webinars' : 'home');
    if (page !== 'home' && page !== 'webinars') return;
    addStyles();

    // Newer site.js versions render webinar data on their own.
    // Enhance that card rather than adding a duplicate.
    const existing = [...document.querySelectorAll('.webinar-card')]
      .find(card => card.textContent.includes(webinar.title));
    if (existing) {
      addDetails(existing);
      existing.parentElement?.classList.add('qio-webinar-grid');
      clearPlaceholder(page === 'home' ? document.getElementById('webinars') : document.querySelector('.inner-hero'));
      return;
    }

    // Older site.js versions do not render webinar data. Insert the card here.
    if (page === 'home') {
      let section = document.getElementById('webinars');
      if (!section) {
        section = document.createElement('section');
        section.className = 'section container';
        section.id = 'webinars';
        section.innerHTML = '<div class="section-head"><div><span class="eyebrow">WEBINARS & EVENTS</span><h2>Webinars</h2></div><a class="text-link" href="webinars.html">All webinars â†’</a></div>';
        const main = document.querySelector('main');
        const before = document.getElementById('insights') || main?.querySelector('.bottom-cta');
        if (before?.parentElement) before.before(section);
        else main?.appendChild(section);
      }
      clearPlaceholder(section);
      let grid = section.querySelector('.webinar-grid');
      if (!grid) {
        grid = document.createElement('div');
        grid.className = 'webinar-grid';
        section.appendChild(grid);
      }
      grid.classList.add('qio-webinar-grid');
      grid.appendChild(makeCard());
    } else {
      const main = document.querySelector('main');
      const host = document.querySelector('.inner-content') || main;
      if (!host) return;
      clearPlaceholder(document.querySelector('.inner-hero'));
      let grid = host.querySelector('.webinar-grid');
      if (!grid) {
        grid = document.createElement('div');
        grid.className = 'webinar-grid';
        host.appendChild(grid);
      }
      grid.classList.add('qio-webinar-grid');
      grid.appendChild(makeCard());
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, {once:true});
  } else {
    install();
  }
})();

(() => {
  "use strict";
  const config = window.QUALIFY_CONFIG;
  const content = window.QUALIFY_CONTENT;
  const webinars = Array.isArray(window.QUALIFY_WEBINARS) ? window.QUALIFY_WEBINARS.filter(w => w && w.title) : [];
  const page = document.body.dataset.page || "home";
  // Qualify.io \u2013 Customer Service Rush Access: published HubSpot form.
  // Portal 43713505, region na1 (provided form embed code).
  const HUBSPOT_GAME_FORM_ID = "b194643d-58b4-48e0-971e-c32ed9a01758";
  const gameAccessLandingUrl = "https://aivise.hs-sites.com/customer-service-rush-demo";
  const gamePreviewUrl = "https://43713505.fs1.hubspotusercontent-na1.net/hubfs/43713505/qualifyio/QualifyIO_Customer_Service_Rush_Preview.png";
  const iconPaths = {
    megaphone: '<path d="M3 10h4l10-5v14L7 14H3v-4Zm4 4 2 6"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M5 17v3h14v-3"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v3m0 12v3M3 12h3m12 0h3"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-8a4 4 0 0 1 0 8m5 10v-2a4 4 0 0 0-3-3.87"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
    sparkles: '<path d="m12 3 1.9 5.6L19.5 10l-5.6 1.4L12 17l-1.9-5.6L4.5 10l5.6-1.4L12 3ZM19 18l.6 1.4L21 20l-1.4.6L19 22l-.6-1.4L17 20l1.4-.6L19 18Z"/>',
    refresh: '<path d="M20 7v5h-5M4 17v-5h5M5.5 9A7 7 0 0 1 18.4 6L20 7M4 17l1.6 1A7 7 0 0 0 18.5 15"/>',
    bolt: '<path d="m13 2-9 11h7l-1 9 10-12h-7l0-8Z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4m8-4v4M3 10h18"/>',
    clipboard: '<rect x="5" y="5" width="14" height="17" rx="2"/><rect x="9" y="2" width="6" height="5" rx="1"/><path d="M9 13h6m-6 4h4"/>',
    shield: '<path d="m12 22 7-4V6l-7-3-7 3v12l7 4Zm-4-10 3 3 5-6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M5 5 19 19M19 5 5 19"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-7m0 3a3 3 0 0 1 6 0v4"/>',
    star: '<path d="m12 2 3.1 6.3L22 9.3l-5 4.9 1.2 7-6.2-3.3-6.2 3.3 1.2-7-5-4.9 6.9-1L12 2Z"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4V8Z"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>'
  };
  // Escape team-editable webinar data before inserting it into HTML.
  const htmlText = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const safeLink = value => {
    if (!value) return "";
    try {
      const link = new URL(String(value), window.location.href);
      return (link.protocol === "https:" || link.protocol === "http:") ? htmlText(link.href) : "";
    } catch { return ""; }
  };
  const svg = (name, cls="") => `<svg class="icon ${cls}" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name]||iconPaths.arrow}</svg>`;
  const demoUrl = config.demoBookingUrl || 'book-demo.html';
  const resourceUrl = config.hubspotChecklistUrl || config.checklistFile;
  const nav = [
    ["Solutions", "solutions.html"], ["How It Works", "how-it-works.html"], ["Resources", "resources.html"],
    ["Webinars", "webinars.html"], ["About", "about.html"], ["Contact", "contact.html"]
  ];
  const navItem = ([label, href]) => `<a href="${href}" ${page === href.replace('.html','')?'aria-current="page"':''}>${label}</a>`;
  function header() {
    return `<header class="site-header"><div class="container header-inner">
      <a href="index.html" class="logo-link" aria-label="Qualify.io homepage"><img src="assets/qualify-logo.png" alt="Qualify.io" /></a>
      <nav class="desktop-nav" aria-label="Main navigation">${nav.map(navItem).join('')}</nav>
      <a class="btn btn-primary nav-cta" href="${demoUrl}">Book a product demo ${svg('arrow')}</a>
      <button class="mobile-menu-toggle" id="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-menu">${svg('menu')}</button>
    </div><nav id="mobile-menu" class="mobile-nav" aria-label="Mobile navigation" hidden>${nav.map(navItem).join('')}<a class="mobile-demo" href="${demoUrl}">Book a product demo</a></nav></header>`;
  }
  function footer() {
    // Omit unconfirmed contact details from the public website.
    const linkedin = safeLink(config.linkedinUrl) ? `<a href="${safeLink(config.linkedinUrl)}" target="_blank" rel="noopener noreferrer">${svg('linkedin')} LinkedIn</a>` : "";
    const email = config.contactEmail ? `<a href="mailto:${htmlText(config.contactEmail)}">${svg('mail')} ${htmlText(config.contactEmail)}</a>` : "";
    return `<footer class="site-footer"><div class="container footer-grid">
      <div><a href="index.html" class="footer-logo"><img src="assets/qualify-logo.png" alt="Qualify.io" /></a><p>Making recruitment smarter,<br> simpler and more engaging.</p></div>
      <div><h4>Explore</h4><a href="solutions.html">Solutions</a><a href="how-it-works.html">How it works</a><a href="about.html">About us</a></div>
      <div><h4>Resources</h4><a href="resources.html">Blog & insights</a><a href="webinars.html">Webinars</a><a href="${resourceUrl}">Recruitment checklist</a></div>
      <div><h4>Connect</h4>${email}${linkedin}<a href="${demoUrl}">${svg('calendar')} Book a product demo</a></div>
    </div><div class="container footer-bottom"><span>\u00a9 ${new Date().getFullYear()} Qualify.io \u00b7 University CRM project simulation</span><span>Designed for smarter hiring.</span></div></footer>`;
  }
  function solutionCard(s, i) {
    return `<article class="solution-card"><div class="solution-icon tone-${i}">${svg(s.icon)}</div><h3>${s.title}</h3><p>${s.description}</p><a class="text-link" href="solutions.html">Explore solution ${svg('arrow')}</a></article>`;
  }
  function blogCard(b) {
    return `<a href="${b.url || `resources.html#${b.id}`}" class="blog-card"><div class="blog-art ${b.image}" aria-hidden="true"><span></span><i></i></div><div class="blog-info"><span class="eyebrow mini">${b.category}</span><h3>${b.title}</h3><span class="read-more">Explore article ${svg('arrow')}</span></div></a>`;
  }
  function webinarCard(w, i) {
    const dateLine = [w.date, w.time].filter(Boolean).map(htmlText).join(" \u00b7 ");
    const details = w.description ? `<p class="webinar-description">${htmlText(w.description)}</p>` : "";
    const link = safeLink(w.registrationUrl);
    const registration = link ? `<a class="webinar-link" href="${link}" target="_blank" rel="noopener noreferrer">Registration details ${svg('arrow')}</a>` : "";
    return `<article class="webinar-card webinar-${i % 3}">
      <div class="webinar-top">${svg('calendar')} ${dateLine || 'WEBINAR'}</div>
      <div class="webinar-pattern" aria-hidden="true"></div>
      <h3>${htmlText(w.title)}</h3>${details}${registration}
    </article>`;
  }
  function dashboard() {
    return `<div class="dashboard-illustration" aria-label="Illustrative Qualify.io recruitment dashboard preview" role="img">
      <div class="hero-halo"></div>
      <div class="dash-window"><div class="dash-header"><span class="window-dots"><i></i><i></i><i></i></span><strong>qualify<span class="orange">.</span>io</strong><span class="dash-demo-label">Sample interface</span></div>
        <div class="dash-body"><aside class="dash-sidebar"><span class="dash-side active">${svg('layers')}</span><span class="dash-side">${svg('users')}</span><span class="dash-side">${svg('target')}</span><span class="dash-side">${svg('clipboard')}</span></aside>
        <div class="dash-main"><p class="dash-caption">RECRUITMENT OVERVIEW</p><h3>Find the right fit.</h3><div class="dash-stages"><div><small>Attract</small><strong>01</strong></div><div><small>Assess</small><strong>02</strong></div><div><small>Qualify</small><strong>03</strong></div></div>
          <div class="dash-list"><div><span class="avatar">LM</span><span class="fake-lines"><i></i><i></i></span><span class="bar bar-88"></span></div><div><span class="avatar">JT</span><span class="fake-lines"><i></i><i></i></span><span class="bar bar-74"></span></div><div><span class="avatar">AK</span><span class="fake-lines"><i></i><i></i></span><span class="bar bar-93"></span></div></div>
        </div></div></div>
      <div class="floating-skill"><div class="floating-heading">${svg('star')} Skill insights</div><div>${svg('check')} Communication</div><div>${svg('check')} Problem solving</div><div>${svg('check')} Role-specific skills</div></div>
      <span class="orbit-mark one"></span><span class="orbit-mark two"></span>
    </div>`;
  }
  function home() {
    return `<main id="main-content">
      <section class="hero"><div class="hero-deco hero-deco-left"></div><div class="container hero-grid">
        <div class="hero-copy"><span class="eyebrow">THE NEXT CHAPTER OF RECRUITMENT</span><h1>Smarter recruitment starts <span class="underlined">beyond the CV.</span></h1><p>Discover qualified candidates through meaningful skills-based assessments, thoughtful AI tools and streamlined recruitment\u2014without losing the human touch.</p>
          <div class="hero-actions"><a class="btn btn-primary" href="${demoUrl}">Book a product demo ${svg('arrow')}</a><a class="btn btn-outline" href="resources.html">Explore resources ${svg('arrow')}</a></div>
          <p class="hero-proof">Built for modern HR teams. Designed around real hiring challenges.</p>
        </div>${dashboard()}
      </div></section>
      <section class="benefits container" aria-label="Product benefits"><div>${svg('bolt')}<span><strong>Reduce screening effort</strong><small>Less repetitive work, more meaningful evaluation.</small></span></div><div>${svg('target')}<span><strong>Identify relevant skills</strong><small>Look beyond polished applications.</small></span></div><div>${svg('users')}<span><strong>Improve candidate experience</strong><small>Clearer, more engaging journeys.</small></span></div></section>
      <section class="section container" id="solutions"><div class="section-head"><div><span class="eyebrow">OUR SOLUTIONS</span><h2>A more human way to hire.</h2><p>One modular toolbox. Different recruitment needs.</p></div><a class="text-link desktop-more" href="solutions.html">Explore all solutions ${svg('arrow')}</a></div><div class="solutions-grid">${content.solutions.map(solutionCard).join('')}</div></section>
      <section class="section how-section" id="how"><div class="container"><div class="section-head"><div><span class="eyebrow">HOW IT WORKS</span><h2>From application to real potential.</h2><p>A simpler journey for your team and the people you want to hire.</p></div></div><div class="steps-grid">
      <div class="step"><span class="step-icon">${svg('megaphone')}</span><b>01</b><h3>Attract</h3><p>Help the right applicants discover your opportunities.</p></div>
      <div class="step"><span class="step-icon">${svg('clipboard')}</span><b>02</b><h3>Assess</h3><p>Invite candidates to show job-relevant skills.</p></div>
      <div class="step"><span class="step-icon">${svg('star')}</span><b>03</b><h3>Qualify</h3><p>Give recruiters clearer insights to support decisions.</p></div>
      <div class="step"><span class="step-icon">${svg('users')}</span><b>04</b><h3>Connect</h3><p>Spend more time with the candidates who may fit.</p></div>
      </div></div></section>
      <section class="container resource-feature" id="checklist"><div class="resource-paper"><span class="paper-logo">qualify<span>.</span>io</span><strong>Recruitment<br>Efficiency<br>Checklist</strong><div class="paper-mark">${svg('check')}</div></div><div class="resource-copy"><span class="eyebrow">FREE RESOURCE</span><h2>Is your recruitment process ready for the AI era?</h2><p>12 practical questions to uncover gaps in screening, candidate assessment and hiring experience.</p><a class="btn btn-primary" href="${resourceUrl}" ${!config.hubspotChecklistUrl?'download':''}>Get the free checklist ${svg('download')}</a></div><div class="feature-swoosh"></div></section>
      <section class="container resource-feature resource-feature-game" id="game-demo" aria-label="Customer Service Rush interactive game demo">
        <div class="resource-copy"><span class="eyebrow">FREE INTERACTIVE DEMO</span><h2>Step into your candidates' shoes.</h2>
          <p>Experience Customer Service Rush: a short, gamified challenge that puts communication, problem-solving and decision-making into action.</p>
          <a class="btn btn-primary" href="${gameAccessLandingUrl}">Unlock the game ${svg('play')}</a>
          <p class="resource-note">Complete a short form to access the 2D game. University CRM project simulation.</p>
        </div>
        <a class="resource-game-art" href="${gameAccessLandingUrl}" aria-label="Unlock Customer Service Rush game demo">
          <img src="${gamePreviewUrl}" alt="Customer Service Rush, a playable 2D customer-service skills scenario" loading="lazy"/>
          <span class="resource-game-art-caption">CUSTOMER SERVICE RUSH <span>2D Skills Demo</span></span>
        </a>
        <div class="feature-swoosh"></div>
      </section>
      <section class="section container" id="webinars"><div class="section-head"><div><span class="eyebrow">WEBINARS & EVENTS</span><h2>Webinars</h2>${webinars.length ? '' : '<p>Webinar topics and dates will be added when confirmed.</p>'}</div><a class="text-link desktop-more" href="webinars.html">Webinar page ${svg('arrow')}</a></div>${webinars.length ? `<div class="webinar-grid">${webinars.map(webinarCard).join('')}</div>` : ''}</section>
      <section class="section container" id="insights"><div class="section-head"><div><span class="eyebrow">BLOG & INSIGHTS</span><h2>Ideas beyond the application.</h2><p>Explore the challenges and opportunities shaping recruitment.</p></div><a class="text-link desktop-more" href="resources.html">All articles ${svg('arrow')}</a></div><div class="blog-grid">${content.blogs.map(blogCard).join('')}</div></section>
      <section class="container bottom-cta"><div><span class="eyebrow">LET'S TALK TALENT</span><h2>See Qualify.io in action.</h2><p>Explore how a modular recruitment toolbox could support your hiring process.</p></div><a class="btn btn-primary" href="${demoUrl}">Book a product demo ${svg('arrow')}</a></section>
    </main>`;
  }
  // The first iteration deliberately builds the homepage fully. These pages are
  // lightweight but real routes, ready for content/design approval in later iterations.
  const pages = {
    "solutions": { eyebrow:"OUR SOLUTIONS", title:"The right tools for every hiring challenge.", text:"Explore the three complementary modules of Qualify.io.", extra:()=>`<div class="solutions-grid">${content.solutions.map(solutionCard).join('')}</div>` },
    "how-it-works": { eyebrow:"HOW IT WORKS", title:"A clearer recruitment journey.", text:"Discover how skills-based assessments, supportive AI and thoughtful automation can work together.", extra:()=>`<div class="page-feature"><h2>Attract \u2192 Assess \u2192 Qualify \u2192 Connect</h2><p>We\u2019ll build out this page with your feedback in the next design stage.</p></div>` },
    "resources": { eyebrow:"RESOURCES", title:"Insights for the future of hiring.", text:"Explore practical ideas, perspectives and resources for a smarter hiring process.", extra:()=>`<div class="resources-list">${content.blogs.map(b=>`<article class="resource-list-item" id="${b.id}"><span class="eyebrow">${b.category}</span><h2>${b.title}</h2><p>${b.summary}</p>${b.url ? `<a class="text-link" href="${b.url}">Read article ${svg('arrow')}</a>` : `<span class="soft-caption">Full article coming soon.</span>`}</article>`).join('')}</div><div class="page-feature"><h2>Free recruitment efficiency checklist</h2><p>A 12-question self-assessment for HR decision-makers.</p><a class="btn btn-primary" href="${resourceUrl}">Get the checklist ${svg('download')}</a></div>
      <div class="page-feature page-feature-game"><div class="page-game-copy"><span class="eyebrow">FREE INTERACTIVE DEMO</span><h2>Customer Service Rush: try the candidate experience</h2><p>Discover how a short, gamified workplace scenario can make communication, problem-solving and decision-making more visible.</p><a class="btn btn-primary" href="${gameAccessLandingUrl}">Unlock the game ${svg('play')}</a><p class="resource-note">Register using the short HubSpot form to try the 2D demo.</p></div><img src="${gamePreviewUrl}" alt="Customer Service Rush interactive customer-service game preview" loading="lazy"/></div>` },
    "webinars": { eyebrow:"WEBINARS & EVENTS", title:"Webinars", text:webinars.length ? "" : "Webinar topics and dates will be added when confirmed.", extra:()=>webinars.length ? `<div class="webinar-grid">${webinars.map(webinarCard).join('')}</div>` : `` },
    "about": { eyebrow:"ABOUT QUALIFY.IO", title:"Technology should help us see people better.", text:"Qualify.io is a simulated modular HR technology platform created for a university CRM project. Our concept combines skills-based assessment, AI assistance and process automation to support more meaningful recruitment.", extra:()=>`<div class="page-feature"><h2>Our point of view</h2><p>Less time on repetitive screening. More time understanding the people behind every application.</p></div>` },
    "contact": { eyebrow:"CONTACT", title:"Let's talk about better hiring.", text:"This is a university project simulation. Our contact form and company email will be connected once they are available.", extra:()=>`<div class="page-feature"><h2>Get in touch</h2><p>We will embed your HubSpot contact form here. The address and LinkedIn page can be connected in one place through js/config.js.</p><a href="${demoUrl}" class="btn btn-primary">Request a product demo ${svg('arrow')}</a></div>` },
    "book-demo": { eyebrow:"PRODUCT DEMONSTRATION", title:"Discover what Qualify.io could do for your team.", text:"See how our modules can be tailored to your recruitment challenges.", extra:()=>config.demoBookingUrl ? `<div class="page-feature"><h2>Book your personalized demo</h2><p>Choose a suitable time in our booking system.</p><a class="btn btn-primary" href="${config.demoBookingUrl}" target="_blank" rel="noopener noreferrer">Open HubSpot booking ${svg('calendar')}</a></div>` : `<div class="page-feature"><h2>Demo booking is being connected</h2><p>Once you add your HubSpot Meetings URL to <code>js/config.js</code>, the booking buttons will lead to your real reservation page.</p><p class="soft-caption">No booking can be submitted in this preview.</p></div>` }
  };
  // Integrated post-article game section for our consideration-stage blog post.
  // The form is embedded directly beneath blog post #2; after submission the existing
  // HubSpot Thank-you Page routes the user back to the unlocked embedded game.
  function customerServiceRushSection() {
    const params = new URLSearchParams(window.location.search);
    const unlocked = params.get("game") === "1";
    return `<section id="customer-service-rush" class="blog-game-section" aria-label="Customer Service Rush interactive skills assessment demo">
      <div class="blog-game-heading">
        <span class="eyebrow">INTERACTIVE SKILLS DEMO</span>
        <h2>Step Into Your Candidates' Shoes!</h2>
        <p>Ever wondered what a gamified recruitment assessment looks like from an applicant's perspective? Experience our Customer Service Rush mini-game and see how interactive, job-related challenges can reveal skills beyond the CV.</p>
        <div class="blog-game-skills"><span>Communication</span><span>Problem-solving</span><span>Decision-making</span></div>
      </div>
      ${unlocked ? `<div class="blog-game-play-area">
        <div class="blog-game-bar"><strong>Customer Service Rush</strong><span>Interactive 2D skills demo</span></div>
        <iframe src="customer-service-rush.html" title="Play Customer Service Rush, an interactive customer-service scenario" loading="eager" allow="fullscreen"></iframe>
        <div class="blog-game-play-bottom"><p>This is a university CRM project simulation, not a validated hiring assessment. The game does not collect personal data.</p><a class="text-link" href="customer-service-rush.html" target="_blank" rel="noopener noreferrer">Open the game in a new tab ${svg('arrow')}</a></div>
      </div>` : `<div class="blog-game-grid">
        <div class="blog-game-preview"><img src="${gamePreviewUrl}" alt="Customer Service Rush 2D game: three customers at a service counter" loading="lazy"/><div class="blog-game-preview-caption"><strong>Customer Service Rush</strong><span>Three requests. One shift. Your decisions.</span></div></div>
        <div class="blog-game-form-panel"><span class="eyebrow">FREE INTERACTIVE EXPERIENCE</span><h3>Unlock the Game</h3><p>Try the candidate experience yourself. Complete the short form to access the Customer Service Rush demo.</p>
          <div id="qualify-game-form" aria-label="Qualify.io Customer Service Rush Access registration form"></div>
          <p class="blog-game-fineprint">University project simulation. Please use fictional test details only.</p>
        </div>
      </div>`}
    </section>`;
  }
  // Article layout is shared: adding a new entry in js/articles.js is enough
  // to create another full article at blog.html?id=YOUR_ARTICLE_ID.
  function blogPage() {
    const id = new URLSearchParams(window.location.search).get('id');
    const article = window.QUALIFY_ARTICLES?.[id];
    if (!article) return `<main id="main-content" class="inner-page"><section class="inner-hero container"><span class="eyebrow">BLOG & INSIGHTS</span><h1>Article not available yet.</h1><p>Explore the published Qualify.io articles and resources.</p><a class="text-link" href="resources.html">\u2190 Back to resources</a></section></main>`;
    document.title = `${article.title} | Qualify.io`;
    const sections = article.sections.map(s => `<section class="article-section"><h2>${s.heading}</h2>${s.paragraphs.map((p,i)=>`<p>${p}</p>`).join('')}</section>`).join('');
    return `<main id="main-content" class="article-page">
      <div class="container article-shell">
        <a class="article-back" href="resources.html">\u2190 All articles</a>
        <header class="article-header">
          <span class="eyebrow">${article.category}</span>
          <h1>${article.title}</h1>
          <p class="article-deck">${article.deck}</p>
          <div class="article-meta"><span>QUALIFY.IO INSIGHTS</span><span aria-hidden="true">\u00b7</span><span>Recruitment & human-centered hiring</span></div>
        </header>
        <div class="article-hero-art" aria-hidden="true"><span class="art-ring art-ring-one"></span><span class="art-ring art-ring-two"></span><span class="art-accent"></span></div>
        <article class="article-body">${sections}</article>
        ${id === 'more-applications-less-personality' ? `<aside class="article-checklist-cta" aria-label="Download our free recruitment checklist">
          <div class="article-cta-deco" aria-hidden="true">${svg('check')}</div>
          <div class="article-cta-copy"><span class="eyebrow">FREE RESOURCE \u00b7 12 QUESTIONS</span><h2>Is your recruitment process ready for the AI era?</h2><p>Identify gaps in screening, candidate assessment and the applicant experience with our free Recruitment Efficiency Checklist.</p><a class="btn btn-primary" href="${resourceUrl}">Download your free checklist ${svg('arrow')}</a><p class="cta-fineprint">Complete the short form to access the PDF.</p></div>
        </aside>` : ''}
        ${id === 'beyond-the-cv' ? customerServiceRushSection() : ''}
        ${id === 'discover-qualifyio' ? `<aside class="article-checklist-cta" aria-label="Explore a personalized Qualify.io demo">
          <div class="article-cta-deco" aria-hidden="true">${svg('calendar')}</div>
          <div class="article-cta-copy"><span class="eyebrow">DISCOVER QUALIFY.IO</span><h2>Discover what Qualify.io can do for your company</h2><p>Every recruitment challenge is different. See how our modular toolbox can support your hiring needs.</p><a class="btn btn-primary" href="${demoUrl}">Book your free personalized demo ${svg('arrow')}</a>${!config.demoBookingUrl ? '<p class="cta-fineprint">Demo booking will be available when the HubSpot Meetings link is connected.</p>' : ''}</div>
        </aside>` : ''}
        <div class="article-bottom-nav"><a class="text-link" href="resources.html">\u2190 Back to all articles</a></div>
      </div>
    </main>`;
  }
  function genericPage(key) {
    const p=pages[key]; if(!p) return home();
    return `<main id="main-content" class="inner-page"><section class="inner-hero container"><span class="eyebrow">${p.eyebrow}</span><h1>${p.title}</h1><p>${p.text}</p></section><section class="container inner-content">${p.extra()}</section><section class="container back-home"><a class="text-link" href="index.html">\u2190 Back to homepage</a></section></main>`;
  }
  document.getElementById('site').innerHTML = header() + (page==='home'?home():page==='blog'?blogPage():genericPage(page)) + footer();
  // Only embed the published HubSpot form on blog post #2. This handles HubSpot's
  // current form editor embed script, which uses a .hs-form-frame data-form-id element.
  const gameFormHost = document.getElementById("qualify-game-form");
  if (gameFormHost) {
    const registrationFallback = `<a class="btn btn-primary" href="${gameAccessLandingUrl}">Unlock the Game ${svg('arrow')}</a><p class="blog-game-fineprint">Registration opens in the Qualify.io HubSpot form.</p>`;
    if (/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i.test(HUBSPOT_GAME_FORM_ID)) {
      gameFormHost.classList.add("hs-form-frame");
      gameFormHost.dataset.portalId = "43713505";
      gameFormHost.dataset.region = "na1";
      gameFormHost.dataset.formId = HUBSPOT_GAME_FORM_ID;
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/embed/43713505.js";
      script.async = true;
      script.onerror = () => { gameFormHost.innerHTML = registrationFallback; };
      document.head.appendChild(script);
    } else {
      gameFormHost.innerHTML = registrationFallback;
    }
  }
  const toggle=document.getElementById('menu-toggle');
  const menu=document.getElementById('mobile-menu');
  toggle?.addEventListener('click',()=>{const isOpen=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!isOpen));toggle.setAttribute('aria-label',isOpen?'Open navigation':'Close navigation');toggle.innerHTML=svg(isOpen?'menu':'x');menu.hidden=isOpen;});
})();

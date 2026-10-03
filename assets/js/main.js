/**
 * Recruiting site: progressive enhancement.
 * Everything here is optional: the page reads and navigates without JavaScript.
 */
(() => {
  'use strict';

  const config = window.SITE_CONFIG || {};
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* Header: gain a surface once the page scrolls ------------------------- */
  function initHeader() {
    const header = $('[data-header]');
    if (!header) return;
    const update = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* Mobile navigation: focus-trapped sheet ------------------------------- */
  function initMobileNav() {
    const toggle = $('[data-menu-toggle]');
    const sheet = $('[data-mobile-nav]');
    if (!toggle || !sheet) return;
    const closeBtn = $('[data-menu-close]', sheet);

    const focusables = () => $$('a[href], button:not([disabled])', sheet);

    const open = () => {
      sheet.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('is-locked');
      closeBtn.focus();
      document.addEventListener('keydown', onKeydown);
    };

    const close = ({ restoreFocus = true } = {}) => {
      sheet.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', onKeydown);
      if (restoreFocus) toggle.focus();
    };

    function onKeydown(e) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    toggle.addEventListener('click', open);
    closeBtn.addEventListener('click', () => close());
    // Links close the sheet and let the anchor handler take over focus.
    $$('a[href^="#"]', sheet).forEach((a) => a.addEventListener('click', () => close({ restoreFocus: false })));
    // Close if the viewport grows into the desktop layout.
    window.matchMedia('(min-width: 960px)').addEventListener('change', (e) => {
      if (e.matches && !sheet.hidden) close({ restoreFocus: false });
    });
  }

  /* Booking CTAs: move focus into the form after scrolling --------------- */
  function initBookingLinks() {
    const firstField = $('[data-first-field]');
    const form = $('[data-form]');
    if (!firstField || !form) return;

    $$('a[href="#book"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        if (link.hasAttribute('data-scheduler-link') || link.hasAttribute('data-scheduler-direct')) return;
        e.preventDefault();
        const target = form.hidden ? $('[data-form-success]') : firstField;
        $('#book').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        if (history.replaceState) history.replaceState(null, '', '#book');
        // Focus without a second jump once scrolling has settled.
        window.setTimeout(() => target.focus({ preventScroll: true }), reduceMotion ? 0 : 600);
      });
    });
  }

  /* Reveal on first view ------------------------------------------------- */
  function initReveal() {
    const items = $$('[data-reveal]');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-revealed'));
      return;
    }
    // Stagger siblings that enter together (e.g. list items) by a small amount.
    items.forEach((el) => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.hasAttribute('data-reveal')) : [];
      const index = siblings.indexOf(el);
      if (index > 0) el.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 70}ms`);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  }

  /* Scroll spy: mark the current section in the desktop nav -------------- */
  function initScrollSpy() {
    const links = $$('.site-nav a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    const map = new Map();
    links.forEach((a) => {
      const section = document.getElementById(a.getAttribute('href').slice(1));
      if (section) map.set(section, a);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = map.get(entry.target);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.removeAttribute('aria-current'));
          link.setAttribute('aria-current', 'true');
        } else if (link.getAttribute('aria-current')) {
          link.removeAttribute('aria-current');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, section) => io.observe(section));
  }

  /* Sticky mobile CTA: visible between the hero and the booking form ----- */
  function initStickyCta() {
    const bar = $('[data-sticky-cta]');
    const hero = $('[data-hero]');
    const book = $('[data-book]');
    if (!bar || !hero || !book || !('IntersectionObserver' in window)) return;
    const link = $('a', bar);
    let heroVisible = true;
    let bookVisible = false;

    const update = () => {
      const show = !heroVisible && !bookVisible;
      bar.classList.toggle('is-visible', show);
      bar.setAttribute('aria-hidden', String(!show));
      link.tabIndex = show ? 0 : -1;
    };

    new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; update(); }).observe(hero);
    new IntersectionObserver(([e]) => { bookVisible = e.isIntersecting; update(); }, { threshold: 0.05 }).observe(book);
  }

  /* Interview form ------------------------------------------------------- */
  const MESSAGES = {
    'first-name': { valueMissing: 'Enter your first name.' },
    'last-name': { valueMissing: 'Enter your last name.' },
    email: { valueMissing: 'Enter your email address.', typeMismatch: 'Enter an email address like name@example.com.' },
    phone: { optional: true, custom: 'Enter a phone number with at least 10 digits, or leave it blank.' },
    state: { valueMissing: 'Select the state you live in.' },
    licensed: { valueMissing: 'Choose an option for licensing.' },
    consent: { valueMissing: 'Please agree to be contacted so we can confirm your interview.' },
  };

  function initForm() {
    const form = $('[data-form]');
    if (!form) return;

    const summary = $('[data-error-summary]', form);
    const summaryList = $('[data-error-list]', form);
    const submit = $('[data-submit]', form);
    const submitLabel = $('[data-submit-label]', form);
    const success = $('[data-form-success]');
    const schedulerLink = $('[data-scheduler-link]');
    const schedulerMount = $('[data-scheduler-mount]');
    const schedulerFallback = $('[data-scheduler-fallback]');
    const devNote = $('[data-dev-note]');
    const skip = $('[data-skip]');

    // Visitors who'd rather not fill in details can go straight to the calendar.
    if (skip && buildSchedulerUrl({})) {
      const direct = $('[data-scheduler-direct]', skip);
      direct.href = buildSchedulerUrl({});
      direct.dataset.cta = 'scheduler-direct';
      skip.hidden = false;
    }

    form.noValidate = true;

    const fields = Object.keys(MESSAGES).map((id) => {
      const input = document.getElementById(id);
      return input ? { id, input } : null;
    }).filter(Boolean);

    const phoneDigits = (v) => v.replace(/\D/g, '').length;

    function errorFor({ id, input }) {
      if (input.type === 'radio') {
        const checked = form.querySelector(`input[name="${input.name}"]:checked`);
        return checked ? '' : MESSAGES[id].valueMissing;
      }
      if (input.type === 'checkbox') return input.checked ? '' : MESSAGES[id].valueMissing;
      const v = input.value.trim();
      if (!v) return MESSAGES[id].optional ? '' : MESSAGES[id].valueMissing;
      if (input.validity.typeMismatch) return MESSAGES[id].typeMismatch;
      if (id === 'phone' && phoneDigits(v) < 10) return MESSAGES[id].custom;
      return '';
    }

    function show(field, message) {
      const el = form.querySelector(`[data-error-for="${field.id}"]`);
      if (el) el.textContent = message;
      if (field.input.type === 'radio') {
        const fieldset = field.input.closest('fieldset');
        fieldset.toggleAttribute('data-invalid', Boolean(message));
        $$(`input[name="${field.input.name}"]`, form).forEach((r) => r.setAttribute('aria-invalid', String(Boolean(message))));
      } else {
        field.input.setAttribute('aria-invalid', String(Boolean(message)));
      }
    }

    // Validate on blur only after a field has been touched; re-validate live once it's invalid.
    fields.forEach((field) => {
      const group = field.input.type === 'radio' ? $$(`input[name="${field.input.name}"]`, form) : [field.input];
      group.forEach((el) => {
        el.addEventListener('blur', () => {
          if (el.type === 'radio') return;
          if (el.value.trim() || el.getAttribute('aria-invalid') === 'true') show(field, errorFor(field));
        });
        el.addEventListener(el.type === 'radio' || el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input', () => {
          if (el.getAttribute('aria-invalid') === 'true') show(field, errorFor(field));
        });
      });
    });

    function buildSchedulerUrl(data) {
      if (!config.schedulerUrl) return '';
      try {
        const url = new URL(config.schedulerUrl);
        if (config.prefillScheduler && data.email) {
          url.searchParams.set('name', `${data.firstName} ${data.lastName}`.trim());
          url.searchParams.set('email', data.email);
        }
        return url.toString();
      } catch (_) {
        return '';
      }
    }

    function setBusy(busy) {
      submit.disabled = busy;
      submit.setAttribute('aria-busy', String(busy));
      submitLabel.textContent = busy ? 'Saving…' : 'Continue to pick a time';
    }

    async function sendLead(data) {
      if (!config.leadEndpoint) return;
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), 8000);
      try {
        await fetch(config.leadEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...data, source: window.location.href, submittedAt: new Date().toISOString() }),
          signal: controller.signal,
        });
      } catch (_) {
        // Lead capture should never block booking: carry on to the scheduler.
      } finally {
        window.clearTimeout(timer);
      }
    }

    // Step 2: the scheduler is embedded so the booking itself happens on this page.
    function mountScheduler(url) {
      const frameUrl = new URL(url);
      if (/calendly\.com$/.test(frameUrl.hostname)) {
        frameUrl.searchParams.set('embed_domain', window.location.hostname || 'localhost');
        frameUrl.searchParams.set('embed_type', 'Inline');
        frameUrl.searchParams.set('hide_gdpr_banner', '1');
      }
      const iframe = document.createElement('iframe');
      iframe.src = frameUrl.toString();
      iframe.title = 'Choose a time for your Zoom interview';
      iframe.loading = 'eager';
      schedulerMount.appendChild(iframe);
      schedulerLink.href = url;
      schedulerFallback.hidden = false;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const errors = fields.map((field) => {
        const message = errorFor(field);
        show(field, message);
        return message ? { field, message } : null;
      }).filter(Boolean);

      if (errors.length) {
        summaryList.innerHTML = '';
        errors.forEach(({ field, message }) => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = `#${field.input.id}`;
          a.textContent = message;
          a.addEventListener('click', (ev) => { ev.preventDefault(); field.input.focus(); });
          li.appendChild(a);
          summaryList.appendChild(li);
        });
        summary.hidden = false;
        summary.focus();
        return;
      }
      summary.hidden = true;

      // Honeypot: silently stop obvious bots.
      if (form.companyWebsite && form.companyWebsite.value) return;

      const data = {
        firstName: form.firstName.value.trim(),
        lastName: form.lastName.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        state: form.state.value,
        licensed: (form.querySelector('input[name="licensed"]:checked') || {}).value || '',
        consent: form.consent.checked,
      };

      setBusy(true);
      await sendLead(data);
      setBusy(false);

      const url = buildSchedulerUrl(data);
      if (url && config.autoRedirect) {
        window.location.assign(url);
        return;
      }

      // Step 2: pick a time.
      $$('[data-first-name]').forEach((el) => { el.textContent = data.firstName; });
      if (url) {
        mountScheduler(url);
      } else {
        devNote.hidden = false;
      }
      const s1 = $('[data-step-indicator="1"]');
      const s2 = $('[data-step-indicator="2"]');
      s1.classList.remove('is-current'); s1.classList.add('is-done');
      s2.classList.add('is-current');
      s2.setAttribute('aria-current', 'step');
      form.hidden = true;
      if (skip) skip.hidden = true;
      success.hidden = false;
      success.focus();
    });
  }

  function initYear() {
    $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
  }

  initHeader();
  initMobileNav();
  initBookingLinks();
  initReveal();
  initScrollSpy();
  initStickyCta();
  initForm();
  initYear();
})();

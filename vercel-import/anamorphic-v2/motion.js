(() => {
  const root = document.documentElement;
  const copyButton = document.querySelector('.copy-email');
  const copyStatus = document.getElementById('copyStatus');

  copyButton?.addEventListener('click', async () => {
    const email = copyButton.dataset.email || '';
    try {
      await navigator.clipboard.writeText(email);
      if (copyStatus) copyStatus.textContent = 'EMAIL COPIED';
    } catch {
      if (copyStatus) copyStatus.textContent = email;
    }
    window.setTimeout(() => { if (copyStatus) copyStatus.textContent = ''; }, 2200);
  });

  if (!window.gsap || !window.ScrollTrigger) {
    document.documentElement.classList.add('no-gsap');
    return;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  const frameChapter = document.getElementById('frameChapter');
  const frameRatio = document.getElementById('frameRatio');
  const progressLine = document.getElementById('progressLine');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setStatus = (chapter, ratio) => {
    if (frameChapter) frameChapter.textContent = `FRAME ${chapter} / 05`;
    if (frameRatio) frameRatio.textContent = ratio;
  };

  const setChromeColor = (color) => gsap.set('.site-chrome', { color });

  if (reduceMotion) {
    setStatus('01', 'STATIC');
    return;
  }

  const main = document.querySelector('main');
  if (main && progressLine) {
    ScrollTrigger.create({
      trigger: main,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => gsap.set(progressLine, { scaleX: self.progress }),
    });
  }

  const CinematicFrame = {
    desktop: {
      scope: [1.12, .76],
      '16:9': [1, 1],
      '4:3': [.74, 1.08],
      '1:1': [.52, 1.18],
      portrait: [.34, 1.16],
      full: [1.28, 1.28],
    },
    mobile: {
      scope: [1.08, .60],
      '16:9': [1, .72],
      '4:3': [.90, .86],
      '1:1': [.76, .92],
      portrait: [.56, 1.18],
      full: [1.15, 1.05],
    },
    tween(timeline, target, ratio, isMobile, at, duration = .07) {
      const pair = (isMobile ? this.mobile : this.desktop)[ratio];
      return timeline.to(target, { scaleX: pair[0], scaleY: pair[1], duration }, at);
    },
  };

  const mm = gsap.matchMedia();
  mm.add({ wide: '(min-width: 1181px)', compact: '(min-width: 769px) and (max-width: 1180px)', mobile: '(max-width: 768px)' }, (context) => {
    const mobile = context.conditions.mobile;
    const compact = context.conditions.compact;
    const ctx = gsap.context(() => {
      const hero = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.hero-scene',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
          onEnter: () => { setStatus('01', mobile ? 'PORTRAIT' : '2.39:1'); setChromeColor('#EFE4CF'); },
          onEnterBack: () => { setStatus('01', mobile ? 'PORTRAIT' : '2.39:1'); setChromeColor('#EFE4CF'); },
          onUpdate: self => {
            if (frameRatio) frameRatio.textContent = mobile
              ? (self.progress < .48 ? '9:16' : self.progress < .82 ? '4:5' : 'FULL')
              : (self.progress < .32 ? '2.39:1' : self.progress < .78 ? '16:9' : '4:3');
          },
        }
      });
      gsap.set('.hero-frame', { scaleX: mobile ? .68 : .92, scaleY: mobile ? 1 : .74 });
      hero
        .to('.hero-frame', { scaleX: mobile ? .78 : 1, scaleY: mobile ? 1 : .74, duration: .15 }, 0)
        .to('.hero-line-one', { opacity: 1, yPercent: 0, duration: .17 }, .15)
        .to('.hero-frame', { scaleX: mobile ? .86 : 1, scaleY: mobile ? 1.03 : 1, duration: .16 }, .32)
        .to('.hero-line-two', { opacity: 1, yPercent: 0, duration: .16 }, .48)
        .to('#heroBracket', { x: mobile ? '56vw' : '16vw', y: mobile ? '67vh' : '67vh', scale: .78, duration: .14 }, .64)
        .to('.hero-frame', { scaleX: mobile ? 1.13 : .75, scaleY: mobile ? 1.02 : 1, duration: .12 }, .78)
        .to('.hero-frame', { xPercent: mobile ? 0 : -18, scaleX: mobile ? 1.18 : .72, duration: .10 }, .90)
        .to('.hero-line-one', { xPercent: mobile ? 0 : -10, opacity: .08, duration: .10 }, .90)
        .to('.hero-line-two', { xPercent: mobile ? 0 : -10, opacity: .05, duration: .10 }, .90)
        .to('.hero-support', { opacity: 0, y: -12, duration: .08 }, .88)
        .to('.hero-reveal', { opacity: 1, xPercent: 0, duration: .10 }, .90);

      const focus = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.focus-scene',
          start: 'top top',
          end: 'bottom bottom',
          scrub: .55,
          invalidateOnRefresh: true,
          onEnter: () => { setStatus('02', 'FOCUS'); setChromeColor('#123D3A'); },
          onEnterBack: () => { setStatus('02', 'FOCUS'); setChromeColor('#123D3A'); },
          onLeave: () => setChromeColor('#EFE4CF'),
          onLeaveBack: () => setChromeColor('#EFE4CF'),
        }
      });
      if (mobile) {
        focus
          .to('.moving-focus', { y: '34vh', scaleY: .08, duration: .10 }, .45)
          .to('.focus-stage', { backgroundColor: '#263D83', color: '#EFE4CF', duration: .08 }, .48)
          .to('.website-concept', { opacity: .28, duration: .10 }, .48)
          .to('.automation-concept', { opacity: 1, duration: .10 }, .50)
          .to('.moving-focus', { y: '42vh', scaleY: 1, duration: .12 }, .53);
      } else {
        focus
          .to('.moving-focus', { x: '24vw', scaleX: .055, duration: .10 }, .45)
          .to('.focus-stage', { backgroundColor: '#263D83', color: '#EFE4CF', duration: .08 }, .48)
          .to('.website-concept', { opacity: .25, duration: .10 }, .48)
          .to('.automation-concept', { opacity: 1, duration: .10 }, .50)
          .to('.moving-focus', { x: '50vw', scaleX: 1, duration: .12 }, .53);
      }
      focus
        .to('.tunnel-transition', { opacity: 1, duration: .025 }, .90)
        .to('.tunnel-transition i', { xPercent: -115, duration: .06, stagger: .008 }, .91)
        .to('.tunnel-transition', { opacity: 0, duration: .025 }, .975);

      const createProject = (selector, options) => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: selector,
            start: 'top top',
            end: 'bottom bottom',
            scrub: .5,
            invalidateOnRefresh: true,
            onEnter: () => { setStatus('03', options.ratio); setChromeColor(options.chrome); },
            onEnterBack: () => { setStatus('03', options.ratio); setChromeColor(options.chrome); },
          }
        });
        gsap.set(`${selector} .project-copy`, { opacity: .2, y: mobile ? 24 : 36 });
        gsap.set(`${selector} .project-frame`, { scaleX: options.fromX, scaleY: options.fromY, opacity: .86 });
        tl
          .to(`${selector} .project-frame`, { scaleX: 1, scaleY: 1, opacity: 1, duration: .14 }, 0)
          .to(`${selector} .project-copy`, { opacity: 1, y: 0, duration: .14 }, .14)
          .to({}, { duration: .44 }, .28);
        options.action(tl, mobile);
        tl.to(`${selector} .project-frame`, { scaleX: options.toX, scaleY: options.toY, duration: .10 }, .90);
        return tl;
      };

      createProject('.project-shalcon', {
        ratio: mobile ? '4:5' : '1.33:1', chrome: '#EFE4CF',
        fromX: mobile ? .72 : .72, fromY: mobile ? 1 : .9,
        toX: mobile ? 1.08 : (compact ? 1.10 : 1.32), toY: mobile ? .94 : .98,
        action: (tl) => tl.to('.verb-bracket', { yPercent: 390, duration: .18 }, .72)
          .to('.project-shalcon .project-copy', { opacity: .10, y: -8, duration: .08 }, .88),
      });

      createProject('.project-pagevelope', {
        ratio: mobile ? '16:10 CROP' : '1.78:1', chrome: '#EFE4CF',
        fromX: mobile ? 1.02 : .75, fromY: mobile ? .88 : 1,
        toX: mobile ? 1 : .58, toY: mobile ? .80 : 1,
        action: (tl) => {
          tl.to('.project-pagevelope .project-copy', { opacity: .05, y: -10, duration: .07 }, .62)
            .to('.project-pagevelope .project-frame', {
              scaleX: mobile ? 1.18 : (compact ? 1.38 : 1.52),
              scaleY: mobile ? 1.06 : 1.12,
              xPercent: mobile ? 0 : (compact ? -10 : -14),
              duration: .12,
            }, .66)
            .to('.ui-a,.ui-d,.ui-f', { x: 70, duration: .16 }, .66)
            .to('.ui-b,.ui-c,.ui-e', { x: -70, duration: .16 }, .66)
            .to('.project-pagevelope .project-frame', { scaleX: 1, scaleY: 1, xPercent: 0, duration: .10 }, .82);
        },
      });

      createProject('.project-edqora', {
        ratio: '1:1', chrome: '#123D3A',
        fromX: mobile ? .96 : 1, fromY: mobile ? .92 : 1,
        toX: 1, toY: 1,
        action: (tl) => {
          tl.to('#adminLens', { clipPath: mobile ? 'circle(24% at 72% 72%)' : 'circle(21% at 76% 74%)', duration: .18 }, .72)
            .to('.admin-zoom', { transformOrigin: '76% 74%', duration: .18 }, .72)
            .to('.edqora-split', { opacity: 1, duration: .03 }, .90)
            .to('.split-left', { xPercent: -102, duration: .10 }, .90)
            .to('.split-right', { xPercent: 102, duration: .10 }, .90);
        },
      });

      createProject('.project-prospecting', {
        ratio: mobile ? 'TOP / BOTTOM' : '40 / 60', chrome: '#123D3A',
        fromX: mobile ? .52 : .35, fromY: 1,
        toX: mobile ? .72 : .68, toY: mobile ? .92 : .94,
        action: (tl, isMobile) => {
          if (isMobile) {
            tl.to('.prospect-left', { clipPath: 'polygon(0 0,100% 0,100% 60%,0 60%)', duration: .18 }, .72)
              .to('.prospect-right', { clipPath: 'polygon(0 60%,100% 60%,100% 100%,0 100%)', duration: .18 }, .72)
              .to('.split-rule', { top: '60%', duration: .18 }, .72)
              .to('.prospect-left', { clipPath: 'polygon(0 48%,100% 48%,100% 52%,0 52%)', duration: .10 }, .90)
              .to('.prospect-right', { clipPath: 'polygon(0 48%,100% 48%,100% 52%,0 52%)', duration: .10 }, .90);
          } else {
            tl.to('.prospect-left', { clipPath: 'polygon(0 0,60% 0,60% 100%,0 100%)', duration: .18 }, .72)
              .to('.prospect-right', { clipPath: 'polygon(60% 0,100% 0,100% 100%,60% 100%)', duration: .18 }, .72)
              .to('.split-rule', { left: '60%', duration: .18 }, .72)
              .to('.prospect-left', { clipPath: 'polygon(48% 0,52% 0,52% 100%,48% 100%)', duration: .10 }, .90)
              .to('.prospect-right', { clipPath: 'polygon(48% 0,52% 0,52% 100%,48% 100%)', duration: .10 }, .90);
          }
        },
      });

      createProject('.project-factory', {
        ratio: mobile ? '9:16' : 'PORTRAIT', chrome: '#EFE4CF',
        fromX: .58, fromY: .94,
        toX: mobile ? 1.75 : (compact ? 1.62 : 1.75), toY: mobile ? 1 : 1.02,
        action: (tl) => {
          const steps = gsap.utils.toArray('.factory-steps span');
          steps.forEach((step, i) => {
            tl.to(steps, { opacity: .28, color: '#EFE4CF', duration: .028 }, .72 + i * .035)
              .to(step, { opacity: 1, color: '#FF6B35', duration: .03 }, .72 + i * .035);
          });
          tl.to('.project-factory .project-copy', { opacity: .08, y: mobile ? -8 : -12, duration: .08 }, .80)
            .to('.project-factory .project-frame', { scaleX: mobile ? 1.42 : (compact ? 1.36 : 1.48), duration: .12 }, .80);
        },
      });

      const automationItems = gsap.utils.toArray('.automation-steps li');
      const auto = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.automation-scene',
          start: 'top top',
          end: 'bottom bottom',
          scrub: .55,
          invalidateOnRefresh: true,
          onEnter: () => { setStatus('04', '16:9'); setChromeColor('#123D3A'); },
          onEnterBack: () => { setStatus('04', '16:9'); setChromeColor('#123D3A'); },
          onUpdate: self => {
            const ratios = mobile ? ['16:10','1:1','4:3','SCOPE','FULL'] : ['16:9','1:1','4:3','2.39:1','FULL'];
            const index = Math.min(4, Math.floor(self.progress * 5));
            if (frameRatio) frameRatio.textContent = ratios[index];
          }
        }
      });
      const ratioBeats = ['16:9', '1:1', '4:3', 'scope', 'full'];
      gsap.set(automationItems.slice(1), { opacity: 0, y: 28 });
      automationItems.forEach((item, i) => {
        const start = i * .18;
        if (i > 0) {
          auto.to(automationItems[i - 1], { opacity: 0, y: -24, duration: .04 }, start)
              .to(item, { opacity: 1, y: 0, duration: .05 }, start + .015);
        }
        CinematicFrame.tween(auto, '.automation-frame', ratioBeats[i], mobile, start);
      });
      auto.to('.automation-steps li:last-child', { opacity: .35, duration: .05 }, .91)
          .to('.automation-final', { opacity: 1, y: -8, duration: .07 }, .91);

      const close = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.close-scene',
          start: 'top top',
          end: 'bottom bottom',
          scrub: .6,
          invalidateOnRefresh: true,
          onEnter: () => { setStatus('05', 'FULL'); setChromeColor('#EFE4CF'); },
          onEnterBack: () => { setStatus('05', 'FULL'); setChromeColor('#EFE4CF'); },
          onUpdate: self => { if (frameRatio) frameRatio.textContent = self.progress < .55 ? 'FULL' : 'CLOSE'; },
        }
      });
      close
        .to('.close-frame', { scaleX: mobile ? .28 : .22, scaleY: mobile ? .16 : .19, duration: .48 }, .12)
        .to('.inside-close', { opacity: .04, scale: .8, duration: .18 }, .34)
        .to('.close-outside', { opacity: 1, y: 0, duration: .24 }, .48)
        .to('.close-frame', { rotate: mobile ? 0 : .7, duration: .18 }, .70);
    }, root);

    return () => ctx.revert();
  });

  ScrollTrigger.addEventListener('refreshInit', () => gsap.set(progressLine, { transformOrigin: 'left center' }));
  ScrollTrigger.refresh();
})();

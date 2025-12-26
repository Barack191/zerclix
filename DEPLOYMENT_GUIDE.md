# VYBZ Deployment & Release Guide

**Version:** 1.0  
**Last Updated:** December 27, 2025

---

## Overview

This guide covers building, testing, and deploying VYBZ to production (web host + Play Store).

---

## Phase 1: Local Development & Testing

### Environment Setup

```bash
# Install dependencies
cd c:\Users\junio\Desktop\Vibes
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

### Development Server

- **URL:** `http://localhost:3000`
- **Auto-reload:** On file change
- **Source maps:** Enabled for debugging

### Manual Testing Checklist

See **TESTING_CHECKLIST.md** for comprehensive test cases.

Quick smoke test:

```bash
# 1. Open dev server
npm run dev

# 2. Open http://localhost:3000 in Chrome
# 3. Test:
#    - Splash screen appears (5s fade)
#    - Can continue as guest
#    - Can click login
#    - Feed loads with posts
#    - Like/comment/share buttons work
#    - Can open Vibes, Inbox, Creator, Profile tabs
#    - Create story works
#    - Messaging works
```

---

## Phase 2: Production Build & Validation

### Build Command

```bash
npm run build
```

### Build Output Verification

Check `dist/` folder contains:

```
dist/
├── index.html          # Main entry
├── sw.js              # Service worker
├── manifest.webmanifest # PWA manifest
├── assets/            # Bundled JS/CSS
│   ├── main.*.js      # App bundle
│   └── *.css          # Stylesheets
├── logo-192.png       # PWA icon
├── logo-512.png       # PWA icon
└── workbox-*.js       # Workbox cache files
```

### Verify PWA

```bash
# Serve production build locally
npx serve -s dist -l 3000

# In Chrome:
# 1. Open http://localhost:3000
# 2. Open DevTools (F12)
# 3. Application tab:
#    - Service Workers: Should show "sw.js" active
#    - Manifest: All fields loaded correctly
#    - Storage: localStorage keys (vybz_*)
# 4. Network tab (go offline):
#    - Close DevTools network tab, go offline
#    - Refresh page - should still load from cache
```

### Bundle Analysis

```bash
# Check bundle size
npx vite build --analyze

# Look for:
# - Main bundle < 1MB
# - No duplicate dependencies
# - React/ReactDOM properly tree-shaken
```

---

## Phase 3: Deployment to Web Host

### Choose Hosting Provider

Options:

1. **Vercel** (recommended for Vite) — Free tier available
2. **Netlify** — Excellent PWA support
3. **GitHub Pages** — Free but limited
4. **Firebase Hosting** — Good for PWAs

### Example: Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Connect GitHub repo (optional)
# - Build command: npm run build
# - Output directory: dist
# - Confirm and deploy
```

**Vercel automatically:**
- Builds production
- Generates PWA manifest
- Serves with proper cache headers
- Provides HTTPS

### Example: Netlify Deployment

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir dist

# Or connect GitHub for auto-deploy
```

### Domain Setup

1. Register domain (e.g., `getvybz.com`)
2. Point DNS to hosting provider
3. Enable HTTPS (automatic with Vercel/Netlify)
4. Test at `https://getvybz.com`

---

## Phase 4: Play Store Submission

### Prerequisites

See **PLAYSTORE_SUBMISSION.md** for detailed steps.

Quick summary:

1. **Set up Bubblewrap:**
   ```bash
   npm install -g @bubblewrap/cli
   mkdir vybz-twa && cd vybz-twa
   bubblewrap init --manifest https://getvybz.com/manifest.webmanifest
   ```

2. **Build APK/AAB:**
   ```bash
   bubblewrap build
   ```

3. **Test on device:**
   ```bash
   adb install app-release.apk
   ```

4. **Upload to Play Store:**
   - Go to Google Play Console
   - Create app listing
   - Upload `app-release.aab`
   - Fill in store metadata
   - Submit for review

---

## Phase 5: Monitoring & Maintenance

### Web Hosting Monitoring

**Vercel/Netlify:**
- View deployments and rollback if needed
- Monitor build logs
- Check analytics (if enabled)

### Play Store Monitoring

**Google Play Console:**

```
Dashboard
├── Installs & uninstalls
├── Active devices
├── Crash reporting
├── User ratings & reviews
├── Revenue (if monetized)
└── Scalars (retention, DAU, MAU)
```

### Performance Monitoring

**Recommended tools:**

1. **Google Lighthouse** (DevTools)
   - Performance score target: > 80
   - PWA score target: > 90
   - SEO score target: > 90

2. **Web Vitals** (https://web.dev/vitals/)
   - Largest Contentful Paint (LCP) < 2.5s
   - First Input Delay (FID) < 100ms
   - Cumulative Layout Shift (CLS) < 0.1

3. **Google Analytics** (optional)
   ```bash
   # Add to index.html for tracking
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   ```

### Error Tracking

**Recommended tools:**

1. **Sentry** (https://sentry.io/) — Real-time error alerts
2. **LogRocket** (https://logrocket.com/) — Session replay
3. **Browser console** — Check for JS errors regularly

### Update Cycle

Plan regular releases:

| Cadence | Type | Example |
|---------|------|---------|
| Weekly | Bug fixes | Critical crashes, XSS fixes |
| Bi-weekly | Minor features | UI improvements, performance tweaks |
| Monthly | Major features | New creators tools, messaging improvements |
| Quarterly | Major updates | New tab (e.g., Shorts), redesigns |

### Version Numbering

Use semantic versioning:

- **1.0.0** — Initial release
- **1.0.1** — Bug fix patch
- **1.1.0** — Minor feature release
- **2.0.0** — Major redesign or breaking changes

---

## Phase 6: Troubleshooting

### Build Errors

| Error | Fix |
|-------|-----|
| `npm: command not found` | Reinstall Node.js; add to PATH |
| Module not found | `npm install` && clear node_modules |
| Build hangs | Increase Node heap: `NODE_OPTIONS=--max_old_space_size=4096 npm run build` |

### PWA Issues

| Issue | Fix |
|-------|-----|
| SW not registering | Check HTTPS enabled; service worker path correct |
| App doesn't cache | Check `dist/sw.js` generated; verify manifest.webmanifest |
| Offline doesn't work | Go to DevTools → Application → Service Workers → check active |

### Play Store Rejection

| Reason | Fix |
|--------|-----|
| Crash on launch | Check logcat: `adb logcat \| grep FATAL` |
| Missing permissions | Declare in manifest; test on device |
| Policy violation | Review content; add content moderation |
| Broken links | Test all URLs (privacy, terms, help) |

### Performance Issues

| Symptom | Fix |
|---------|-----|
| Slow load (> 3s) | `npm run build --analyze`; split code; compress assets |
| Jank on scroll | Check DevTools Performance tab; reduce animation |
| High memory | Check localStorage usage; clear old cache |
| Battery drain | Disable auto-play if battery < 20%; reduce polling |

---

## Checklists

### Pre-Release Checklist

- [ ] All tests passing (TESTING_CHECKLIST.md)
- [ ] No console errors or warnings
- [ ] Service worker registering
- [ ] PWA manifest valid
- [ ] Lighthouse scores:
  - [ ] Performance ≥ 80
  - [ ] PWA ≥ 90
  - [ ] Accessibility ≥ 90
- [ ] Bundle size < 1MB
- [ ] HTTPS enabled
- [ ] Privacy policy & terms linked
- [ ] Version number incremented
- [ ] Changelog updated
- [ ] Staging environment tested

### Post-Release Checklist (Web)

- [ ] App deployed to production
- [ ] Domain resolves correctly
- [ ] HTTPS certificate valid
- [ ] Service worker active
- [ ] Analytics tracking (if enabled)
- [ ] Error monitoring active
- [ ] Monitoring dashboards set up

### Post-Release Checklist (Play Store)

- [ ] App approved & live in Play Store
- [ ] Installs working on test devices
- [ ] Crash reports monitored
- [ ] User reviews monitored
- [ ] Rating target: ≥ 4.0 stars
- [ ] Play Store console alerts set up

---

## Emergency Procedures

### Immediate Crash

1. **Stop deployment** — Don't push more broken versions
2. **Diagnose** — Check error logs (Sentry, logcat)
3. **Fix locally** — Reproduce bug, fix, test
4. **Patch release** — Increment patch version (e.g., 1.0.0 → 1.0.1)
5. **Redeploy** — Web first, then Play Store staged rollout (5% → 25% → 100%)

### Major Security Issue

1. **Immediately patch** — Prioritize security fix
2. **Staged rollout** — Roll out to 100% on Play Store
3. **Notify users** — Post announcement (if applicable)
4. **Retrospective** — Review what failed; add tests

---

## Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [PWA Deployment Best Practices](https://web.dev/pwa-checklist/)
- [Semantic Versioning](https://semver.org/)

---

## Support & Questions

- **Bug reports:** Check error logs or file GitHub issue
- **Performance questions:** Review Lighthouse audit or Web Vitals
- **Play Store rejections:** Check Play Console for specific feedback
- **Emergency support:** Contact hosting provider support (Vercel/Netlify)

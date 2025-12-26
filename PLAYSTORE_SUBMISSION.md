# VYBZ Play Store Submission Guide

**Last Updated:** December 27, 2025

---

## Overview

This guide walks through preparing VYBZ for Google Play Store submission as a Progressive Web App (PWA) using Trusted Web Activities (TWA) and Bubblewrap.

---

## Prerequisites

### Required Tools

```bash
# Install Bubblewrap (Google's TWA builder)
npm install -g @bubblewrap/cli

# Install Android SDK & tools
# Download from: https://developer.android.com/studio
# Add to PATH: ANDROID_HOME, JAVA_HOME

# Install Java Development Kit (JDK 11+)
# Download from: https://openjdk.java.net/
```

### Account Requirements

- [ ] Google Play Developer Account ($25 one-time fee)
- [ ] Google Play Console access
- [ ] Keystore file (signing key) or create new one

---

## Step 1: Prepare PWA Metadata

### Check `public/manifest.webmanifest`

Ensure this file exists and is valid:

```json
{
  "name": "VYBZ - Where Creators Thrive",
  "short_name": "VYBZ",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "theme_color": "#0A0A0F",
  "background_color": "#0A0A0F",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/logo-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/logo-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["social"],
  "screenshots": [
    {
      "src": "/screenshot-540x720.png",
      "sizes": "540x720",
      "type": "image/png",
      "form_factor": "narrow"
    },
    {
      "src": "/screenshot-1280x720.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    }
  ]
}
```

**Checklist:**

- [ ] `name` is descriptive (max 45 chars)
- [ ] `short_name` is short (max 12 chars)
- [ ] `start_url` points to app entry (`/`)
- [ ] `scope` covers all app paths (`/`)
- [ ] `display` is `standalone` (full-screen app feel)
- [ ] `theme_color` matches branding (`#0A0A0F`)
- [ ] Icons provided (192x192 and 512x512 PNG)
- [ ] Maskable icons supported (for adaptive icons)
- [ ] Screenshots provided (540x720 and 1280x720)
- [ ] Categories include `social`

---

## Step 2: Create Required Assets

### Icons (Required)

Create and save to `public/`:

- **logo-192.png** (192×192) — App icon for home screen
- **logo-512.png** (512×512) — App icon (large, preferably with transparent background for maskable icon)

### Screenshots (Required for Store)

Create and save to `public/`:

- **screenshot-540x720.png** — Mobile screenshot (portrait, 540×720)
- **screenshot-1280x720.png** — Tablet screenshot (landscape, 1280×720)

**Content suggestions:**

- Feed with posts
- Story viewer in action
- Creator Studio dashboard
- Vibes fullscreen video

### App Feature Graphic (Required)

- **feature-1024x500.png** — Store listing header (1024×500)
- Show app name, VYBZ logo, key features

### Privacy Policy & Terms

Create and host:

- **privacy-policy.md** (included in repo) → publish to your website (e.g. `https://yourdomain.com/privacy`) and ensure the URL is reachable. The app also includes in-app Privacy Policy and Terms modals (Login & Settings).
- **terms-of-service.md** → published at `https://yoursite.com/terms`

---

## Step 3: Verify Production Build

### Build & Serve

```bash
# Build production
npm run build

# Serve locally to test
npx serve -s dist -l 3000

# Open in browser
# http://localhost:3000
```

### Verify Service Worker

In Chrome DevTools:

1. Open DevTools (F12)
2. Go to **Application** tab
3. Check **Service Workers** → should show "sw.js" as "activated and running"
4. Check **Manifest** → all fields present and valid
5. Check **Offline** simulation → app should still load cached assets

---

## Step 4: Set Up Bubblewrap Project

### Initialize

```bash
# Create a new directory for TWA project
mkdir vybz-twa && cd vybz-twa

# Initialize Bubblewrap
bubblewrap init --manifest https://yoursite.com/manifest.webmanifest
```

**Answer prompts:**

- **Manifest URL:** `https://yoursite.com/manifest.webmanifest`
- **Package name:** `com.vybz.creator` (reverse domain style)
- **App name:** `VYBZ`
- **Launcher icon:** Path to 192×192 PNG
- **Status bar color:** `#0A0A0F` (dark background)
- **Navigation color:** `#0A0A0F`
- **Orientation:** `portrait`

### Generate Android App

```bash
# Generate signed APK
bubblewrap build

# Follow prompts to create or use existing keystore
```

**Keystore creation:**

```bash
# Create new keystore (one-time setup)
keytool -genkey -v -keystore vybz.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias vybz-key

# Store securely (backup file + password in safe place)
```

### Output

After `bubblewrap build`:

- `app-release.aab` — Android App Bundle (for Play Store)
- `app-release.apk` — APK for direct install testing

---

## Step 5: Test APK Locally

### Install on Test Device

```bash
# Connect Android device via USB, enable Developer Mode
adb install app-release.apk

# Or test in Android Emulator
# Open Android Studio → Create Virtual Device → Run APK
```

### Verify

- [ ] App installs without errors
- [ ] App launches and shows splash screen
- [ ] All features work (feed, stories, creation, messaging)
- [ ] Offline mode works (airplane mode toggle)
- [ ] Notifications trigger correctly

---

## Step 6: Prepare Google Play Console

### Create App Listing

1. Go to [Google Play Console](https://play.google.com/console)
2. Click **Create App**
3. Enter app details:
   - **App name:** VYBZ
   - **Default language:** English
   - **App or game:** App
   - **Free or paid:** Free
   - **Content rating:** (complete questionnaire)

### Upload Signed Bundle

1. Go to **Release** → **Production**
2. Create new release
3. Upload `app-release.aab`
4. Set version number (e.g., 1.0.0)
5. Review and rollout to 100%

### Store Listing

Fill in all required fields:

- **App name:** VYBZ (max 50 chars)
- **Short description:** One-liner (max 80 chars)
  - Example: "Short-form social media platform for creators."
- **Full description:** Detailed description (max 4000 chars)
  - Include features: Stories, Vibes, Creator Studio, Wallet, Privacy controls
  - Include hashtags: #socialmedia #creators #shortform #tiktok #instagram
- **Screenshots:** 2–8 screenshots (use assets from Step 2)
- **Feature graphic:** 1024×500 PNG header image
- **Icon:** 512×512 PNG app icon
- **Video preview:** Optional YouTube video link

### App Content Rating

Complete the **Content Rating Questionnaire:**

- Sexual content? No
- Violence? No
- Profanity? Yes (user-generated)
- Alcohol/tobacco? No
- Gambling? No
- Other sensitive topics? Specify (block/report features available)

**Rating:** Expected to be **Moderate** or **Teen** (ESRB)

### Privacy Policy & Permissions

1. Provide privacy policy URL
2. Provide terms of service URL
3. Declare permissions:
   - Camera (for story/video creation)
   - Microphone (for video audio)
   - Photo library (for uploads)
   - Contacts (for messaging — optional)
   - Location (not required for this version)

### Pricing & Distribution

1. **Pricing:** Free
2. **Countries:** Select regions (default: all)
3. **Content:** Confirm no restricted content

---

## Step 7: Submit for Review

### Pre-Submission Checklist

- [ ] App name finalized
- [ ] Description complete and accurate
- [ ] Screenshots professional and current
- [ ] Privacy policy linked and accessible
- [ ] No broken links in app
- [ ] App icon uploaded (512×512)
- [ ] Minimum Android version set (API 26+)
- [ ] Target Android version up-to-date (API 33+)
- [ ] App bundle signed properly
- [ ] Service worker & manifest valid
- [ ] Content rating questionnaire completed

### Submit

1. Go to **Release** → **Production**
2. Review all sections
3. Click **Submit for Review**

### Review Timeline

- **Initial screening:** 1–2 hours
- **Manual review:** 1–3 days
- **Approval notification:** Email to Play Console account

---

## Step 8: Post-Launch Monitoring

### Google Play Console Monitoring

- [ ] Check **Crashes & ANRs** for app stability
- [ ] Monitor **User ratings & reviews**
- [ ] Check **Installation stats** (installs, uninstalls, active devices)
- [ ] Review **Performance metrics** (crashes, ANRs, performance)

### Update Cycle

Plan for regular updates:

- **Bug fixes:** 1–2 weeks
- **Feature releases:** Monthly
- **Major updates:** Quarterly

### Staged Rollout

For large updates:

1. Submit new bundle
2. Start with **5%** rollout to real users
3. Monitor crashes & feedback
4. Increase to **25%** → **50%** → **100%** over days

---

## Common Play Store Rejection Reasons & Fixes

| Rejection Reason | Fix |
|------------------|-----|
| Broken links in app | Test all links in privacy policy, terms |
| Crashes on launch | Check logcat: `adb logcat \| grep FATAL` |
| Missing permissions disclosure | Declare all permissions used in manifest |
| Unclear app purpose | Enhance description with clear feature list |
| Violates content policy | Remove or moderate user-generated content |
| Missing privacy policy | Add link to accessible policy URL |
| APK not signed properly | Regenerate with valid keystore |

---

## Appendix: Useful Commands

### Bubblewrap

```bash
# Update manifest and regenerate
bubblewrap update --manifest https://yoursite.com/manifest.webmanifest

# Build unsigned APK for testing
bubblewrap build --release=false

# Validate manifest
bubblewrap validate --manifest https://yoursite.com/manifest.webmanifest
```

### ADB (Android Debug Bridge)

```bash
# List connected devices
adb devices

# Install APK
adb install app-release.apk

# View logs
adb logcat

# Clear app data
adb shell pm clear com.vybz.creator

# Uninstall app
adb uninstall com.vybz.creator
```

### Keystore Management

```bash
# List keystore contents
keytool -list -v -keystore vybz.keystore

# Check APK signature
jarsigner -verify -verbose app-release.apk
```

---

## Resources

- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Bubblewrap Documentation](https://github.com/GoogleChromeLabs/bubblewrap)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Android App Bundle Specs](https://developer.android.com/guide/app-bundle)
- [Play Store Content Policies](https://play.google.com/about/developer-content-policy/)

---

## Support

For Play Store-specific issues:
- **Email:** Google Play Developer support (in console)
- **Community:** Stack Overflow (tag: `google-play-console`)
- **Official:** [Android Developers Blog](https://android-developers.googleblog.com/)

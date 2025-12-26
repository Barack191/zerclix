# VYBZ Internal Testing Checklist

**Date:** December 27, 2025  
**Version:** 1.0  
**Build:** Production

---

## Pre-Test Setup

- [ ] Build production: `npm run build`
- [ ] Verify `dist/` folder generated with:
  - [ ] `dist/sw.js` (service worker)
  - [ ] `dist/manifest.webmanifest` (PWA manifest)
  - [ ] `dist/index.html` (entry point)
- [ ] Serve locally: `npx serve -s dist -l 3000`
- [ ] Open in Chrome DevTools: check Network, Application tabs

---

## 1. Splash Screen & Navigation

### Test Cases

| Feature | Steps | Expected | Status |
|---------|-------|----------|--------|
| Splash appears | Load app | See VYBZ logo with glow effect | ☐ |
| Splash duration | Splash plays for ~5s | Fade out → Feed or AuthModal | ☐ |
| Guest mode skip | Click "Continue as Guest" on AuthModal | Feed loads without login | ☐ |
| Login flow | Click "Login" → enter creds → submit | Feed loads, user data shown | ☐ |
| Navigation bar | Check bottom nav | Home/Vibes/Inbox/Creator/Profile tabs visible | ☐ |

---

## 2. Authentication

### Test Cases

| Feature | Steps | Expected | Status |
|---------|-------|----------|--------|
| Logged-out protection | Log out → try to like post | AuthModal appears | ☐ |
| New user signup | Sign up with new account | Wallet = 0, no posts, verified = false | ☐ |
| Guest restrictions | Browse as guest → try to comment | AuthModal blocks action | ☐ |
| Password reset | Click "Forgot Password" | Mock reset flow shown | ☐ |
| Session persistence | Login → reload page | User stays logged in | ☐ |

---

## 3. Feed & Content Consumption

### Test Cases

| Feature | Steps | Expected | Status |
|---------|-------|----------|--------|
| Feed loads | Navigate to Home | Posts display in list | ☐ |
| Stories row | Check top of feed | Story thumbnails + "Add Story" button present | ☐ |
| Scroll feed | Scroll down feed | Posts load smoothly | ☐ |
| Like post | Double-tap or click heart | Heart fills, count increases | ☐ |
| Unlike post | Click heart again | Heart unfills, count decreases | ☐ |
| Save post | Click bookmark | Post saved (favicon fills) | ☐ |
| Comments section | Click comment icon | Comments modal opens with list | ☐ |

---

## 4. Share System

### Test Cases

| Feature | Steps | Expected | Status |
|---------|-------|----------|--------|
| Share modal opens | Click share icon | Bottom-sheet modal appears | ☐ |
| Share to Instagram | Click Instagram button | Copy-link toast shown (Instagram doesn't support direct shares) | ☐ |
| Copy link | Click "Copy Link" | Link copied, toast confirms | ☐ |
| Download media | Click "Save Video" | File downloaded or error shown | ☐ |
| Add to favorites | Click "Add to Favorites" | Post saved, notification triggered | ☐ |
| Share count | Share post, check badge | Badge shows updated count (e.g., "1") | ☐ |

---

## 5. Stories Feature

### Test Cases

| Feature | Steps | Expected | Status |
|---------|-------|----------|--------|
| Create story | Click "Add Story" → select image → save | Story added to list, toast shows success | ☐ |
| Story expiry | Create story, check localStorage | `expiresAt` set to 24h from now | ☐ |
| View story | Click story thumbnail | Viewer opens with segmented progress bars | ☐ |
| Auto-advance | Let story play for 5s | Auto-advances to next story | ☐ |
| Manual navigation | Press ← or → | Story changes without auto-advance | ☐ |
| Pause/resume | Press Space | Progress pauses, resumes on re-press | ☐ |
| Drag swipe | Swipe left/right on image | Story advances/goes back | ☐ |
| Story index | Check header | Display shows "2/5" (current/total) | ☐ |
| Message on story | Type message → send | Message saved to Inbox chat | ☐ |
| Close story | Press Escape or click X | Viewer closes, returns to feed | ☐ |

---

## 6. Vibes Tab

### Test Cases

| Feature | Steps | Expected | Status |
|---------|-------|----------|--------|
| Vibes tab opens | Click "Vibes" in nav | Fullscreen video experience loads | ☐ |
| Auto-play video | Video displays in viewport | Auto-plays on view | ☐ |
| Swipe navigation | Swipe up/down | Video changes smoothly | ☐ |
| Like vibe | Double-tap video | Heart appears, count increases | ☐ |
| Follow creator | Click follow button | Creator added to following list | ☐ |
| Share vibe | Click share | ShareModal opens, shares increment | ☐ |

---

## 7. Content Creation

### Test Cases

| Feature | Steps | Expected | Status |
|---------|-------|----------|--------|
| Create post modal | Click "+" button | Modal opens with type selection | ☐ |
| Select media | Choose Photo → upload | Preview shows selected image | ☐ |
| Add caption | Type caption | Caption text visible in preview | ☐ |
| Save draft | Click "Save Draft" | Draft persisted to localStorage | ☐ |
| Edit draft | Go to Profile → Drafts → edit | Draft loads, changes saved | ☐ |
| Post content | Click "Post" | Post added to feed, notification sent | ☐ |

---

## 8. Profile & Creator Studio

### Test Cases

| Feature | Steps | Expected | Status |
|---------|-------|----------|--------|
| Profile tab | Click "Profile" in nav | User profile page loads | ☐ |
| Profile header | Check profile | Avatar, username, bio, stats shown | ☐ |
| Follow button | Click "Follow" on other profile | Follow count increases | ☐ |
| Tabs (Videos/Photos) | Click tabs | Videos/Photos sections load | ☐ |
| Edit profile | Click edit button | Edit modal appears (mock UI) | ☐ |
| Creator Studio | Click "Creator Studio" | Dashboard loads with stats | ☐ |
| Wallet section | Check wallet in profile | Balance shows (starts at 0 for new users) | ☐ |
| Verification | Click verify button | Verification cost deducted from wallet | ☐ |

---

## 9. Inbox & Messaging

### Test Cases

| Feature | Steps | Expected | Status |
|---------|-------|----------|--------|
| Inbox tab | Click "Inbox" in nav | Chat list + message requests shown | ☐ |
| Message requests | Check requests section | Requests with accept/decline buttons shown | ☐ |
| Accept request | Click "Accept" | Request moves to chats, conversation started | ☐ |
| Decline request | Click "Decline" | Request removed, toast confirms | ☐ |
| Open chat | Click chat in list | Chat dialog opens with message history | ☐ |
| Send message | Type message → click Send | Message appears in chat, persisted to localStorage | ☐ |
| Mark read | Open chat | Unread badge clears | ☐ |
| Story message | Send message in story viewer | Message saved to Inbox | ☐ |

---

## 10. Privacy & Safety

### Test Cases

| Feature | Steps | Expected | Status |
|---------|-------|----------|--------|
| Settings modal | Click settings icon (Profile) | Settings dialog opens | ☐ |
| Privacy toggle | Toggle "Private Account" | Setting saved (mock) | ☐ |
| DM setting | Change "Who can message" | Setting saved (mock) | ☐ |
| Block user | Go to Settings → Blocked Users → add | User added to blocked list | ☐ |
| Unblock user | Click unblock | User removed, toast confirms | ☐ |
| Report content | Click "..." on post → Report | SafetyModal opens with report options | ☐ |
| Privacy Policy (Settings) | Settings → Privacy → View Privacy Policy | Modal opens with policy content and external link | ☐ |
| Privacy Policy (Login) | On Login modal, click Privacy | In-app policy modal opens | ☐ |
| Terms of Service (Signup) | During signup, click Terms | Terms modal opens and visible | ☐ |
| Delete Account | Settings → Security → Delete Account → Confirm | Account and local data cleared, logged out | ☐ |

---

## 11. Notifications & Persistence

### Test Cases

| Feature | Steps | Expected | Status |
|---------|-------|----------|--------|
| Notification bell | Click bell icon (Feed top) | Notification list appears | ☐ |
| Notification badge | Receive notification | Badge count increments | ☐ |
| Mark read | Click notification | Mark as read (UI update) | ☐ |
| Persist state | Like post → reload page | Like state persists | ☐ |
| localStorage keys | Open DevTools → Application | Check for `vybz_*` keys | ☐ |

---

## 12. PWA & Service Worker

### Test Cases

| Feature | Steps | Expected | Status |
|---------|-------|----------|--------|
| Install prompt | Load app | PWA install prompt may appear (browser-dependent) | ☐ |
| Service worker | Check DevTools → Application → Service Workers | SW registered and active | ☐ |
| Offline mode | Go offline (DevTools) → navigate | Cached pages load (or appropriate message) | ☐ |
| Manifest | Check DevTools → Manifest | `manifest.webmanifest` loaded with VYBZ metadata | ☐ |

---

## 13. Performance & UX

### Test Cases

| Feature | Steps | Expected | Status |
|---------|-------|----------|--------|
| Page load time | Measure load | < 3 seconds (target) | ☐ |
| Smooth scrolling | Scroll feed/vibes | No jank or stuttering | ☐ |
| Animation performance | Check likes/transitions | Smooth 60fps (check DevTools) | ☐ |
| Mobile responsiveness | Resize to mobile (375px) | Layout adapts, no overflow | ☐ |
| Dark mode | Check all pages | Consistent dark background (#0A0A0F) | ☐ |

---

## 14. Browser Compatibility

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| Chrome | Latest | ☐ | Primary target |
| Safari | Latest | ☐ | iOS support important |
| Firefox | Latest | ☐ | Desktop fallback |
| Samsung Internet | Latest | ☐ | Android PWA |

---

## 15. Bug Tracking

| Bug ID | Description | Severity | Status | Fix |
|--------|-------------|----------|--------|-----|
| | | | | |

---

## Sign-Off

- **Tester Name:** _______________
- **Date Tested:** _______________
- **Overall Status:** ☐ PASS | ☐ PASS WITH NOTES | ☐ FAIL

**Notes:**

---

## Deployment Checklist

- [ ] All tests passed
- [ ] No console errors
- [ ] Production build successful
- [ ] Service worker generating
- [ ] PWA manifest valid
- [ ] Screenshots for Play Store ready
- [ ] App metadata finalized
- [ ] Privacy policy linked
- [ ] Terms of service linked

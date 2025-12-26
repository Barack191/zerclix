# README.md

# 🎨 VYBZ — Where Creators Thrive

A modern, immersive short-form social media platform inspired by TikTok and Instagram, built for creators who want full control over their content, privacy, and monetization.

---

## ✨ Features

### Content Consumption
- **Feed** — Discover posts with likes, comments, shares
- **Vibes** — TikTok-style fullscreen short-form videos with autoplay
- **Stories** — 24-hour ephemeral content with sequential auto-advance

### Content Creation
- **Post Creation** — Upload photos, videos, or text with captions
- **Story Creation** — Snap photos/videos, set 24h expiry
- **Drafts** — Save and resume posts before publishing

### Creator Tools
- **Creator Studio** — Dashboard with views, likes, earnings (mocked)
- **Wallet** — Track balance and monetization (mocked)
- **Verification** — Get verified badge (mocked flow)

### Social Features
- **Messaging** — One-to-one DMs with message requests
- **Notifications** — Follow, like, comment, share alerts
- **Following** — Track creators you follow

### Privacy & Safety
- **Privacy Settings** — Public/Private accounts, DM controls
- **Block & Mute** — Full user control (mute stored locally; add support for backend on production)
- **Report & Safety** — Report content or users
- **Privacy Policy & Terms** — In-app policy & terms available from Login and Settings; `privacy-policy.md` and `terms-of-service.md` are included in repo for publishing to your website (required for Play Store)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16+ or **18+**
- **npm** 8+
- **Git**

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/vybz.git
cd vybz

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Serve production build locally
npx serve -s dist -l 3000
```

---

## 📁 Project Structure

```
vybz/
├── src/
│   ├── components/       # React components
│   │   ├── Feed.jsx      # Home feed
│   │   ├── VibesTab.jsx  # Short-form videos
│   │   ├── Profile.jsx   # User profile
│   │   ├── Inbox.jsx     # Messaging
│   │   ├── ShareModal.jsx # Share UI
│   │   └── ...
│   ├── context/          # Global state
│   │   ├── AuthContext.jsx  # User auth
│   │   └── NotificationContext.jsx
│   ├── lib/              # Utilities
│   │   └── utils.js      # Helpers (localStorage, shares, etc.)
│   ├── data/
│   │   └── mockData.jsx  # Mock posts, users, notifications
│   ├── ui/               # Reusable UI components (Shadcn)
│   ├── app.jsx           # Main App component
│   └── main.jsx          # Entry point
├── public/
│   ├── manifest.webmanifest # PWA manifest
│   ├── logo-192.png      # PWA icon
│   └── ...
├── index.html            # HTML entry
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS config
└── package.json          # Dependencies
```

---

## 🔧 Technology Stack

- **Frontend Framework:** React 18 + Vite 4
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **UI Components:** Shadcn/ui
- **PWA:** Vite PWA Plugin + Service Worker
- **State:** React Context API
- **Persistence:** localStorage

---

## 📱 Features Deep Dive

### Authentication

Users can:
- **Login** with existing account (mock)
- **Sign up** as new creator (wallet starts at 0)
- **Continue as guest** (browse-only, no interactions)
- **Forgot password** (UI placeholder)

### Feed

- Infinite scroll with smooth transitions
- Like, comment, share, save actions
- Stories at top (sequential viewer with keyboard controls)
- Follow creators

### Vibes

- Full-screen vertical video experience
- Auto-play on view
- Swipe up/down to navigate
- Like, follow, share, comment

### Stories

- Create stories (photo/video, 24h expiry)
- View stories with segmented progress bars
- Keyboard controls (← → Space Escape)
- Drag-to-swipe navigation
- Reply to stories (saved to Inbox)

### Creator Studio

- Dashboard with mock stats (views, likes, earnings)
- Wallet balance (starts at 0 for new users)
- Verification flow (mock)
- Content management

### Messaging

- Chat list with unread counts
- Message requests (accept/decline)
- Persistent messages (localStorage)
- Message search (placeholder)

---

## 💾 Persistence

App uses `localStorage` with these keys:

| Key | Purpose |
|-----|---------|
| `vybz_guest` | Guest mode flag |
| `vybz_drafts` | Post drafts |
| `vybz_favorites` | Saved posts |
| `vybz_notifications` | Notification history |
| `vybz_stories` | User-created stories + expiry |
| `vybz_shares` | Share counts per post |
| `vybz_chats` | DM message history |
| `vybz_requests` | Message requests (accept/decline) |
| `vybz_following` | Followed users list |

---

## 🧪 Testing

See **TESTING_CHECKLIST.md** for comprehensive test cases.

Quick smoke test:

```bash
# 1. Start dev server
npm run dev

# 2. Open http://localhost:3000
# 3. Test key flows:
#    - Splash screen
#    - Login / Guest mode
#    - Feed navigation
#    - Like / Comment / Share
#    - Create story
#    - Send message
#    - Check PWA (DevTools → Application)
```

---

## 📦 Deployment

### Web Hosting

See **DEPLOYMENT_GUIDE.md** for full instructions.

Quick summary:

```bash
# Build
npm run build

# Deploy to Vercel (recommended)
npm i -g vercel && vercel --prod

# Or Netlify
npm i -g netlify-cli && netlify deploy --prod --dir dist
```

### Play Store

See **PLAYSTORE_SUBMISSION.md** for full steps.

Quick summary:

```bash
# Install Bubblewrap
npm i -g @bubblewrap/cli

# Initialize TWA
bubblewrap init --manifest https://yourdomain.com/manifest.webmanifest

# Build APK
bubblewrap build

# Test on device
adb install app-release.apk

# Upload to Play Store Console
```

---

## 🎯 Roadmap

### Phase 1 (Complete) ✅
- Core feed, vibes, stories
- Messaging & privacy
- Creator studio (mock)
- PWA support

### Phase 2 (Planned)
- Real API integration
- Monetization (real payments)
- Live streaming
- Podcasts/audio

### Phase 3 (Backlog)
- Advanced analytics
- Creator badges
- Sponsored content
- International expansion

---

## 📄 License

VYBZ is proprietary software. All rights reserved.

---

## 🤝 Support

For issues or questions:

1. Check [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) for test cases
2. Review [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment help
3. See [PLAYSTORE_SUBMISSION.md](./PLAYSTORE_SUBMISSION.md) for store submission
4. File issue on GitHub (if open source)

---

## 👨‍💻 Development

### Scripts

```bash
npm run dev        # Start dev server (hot reload)
npm run build      # Create production build
npm run preview    # Preview production build locally
npm run lint       # Lint JavaScript
npm run format     # Format code (Prettier)
```

### Code Style

- **JavaScript:** ES6+, arrow functions preferred
- **React:** Functional components + hooks
- **Styling:** Tailwind CSS utility classes
- **Naming:** camelCase for variables, PascalCase for components

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes, test locally
npm run dev

# Commit with clear messages
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/my-feature
```

---

## 📊 Analytics (Optional)

To add analytics:

1. Sign up for Google Analytics
2. Add tracking code to `index.html`
3. Track key events (like, share, create post, etc.)

```html
<!-- In index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔒 Security Notes

- **No real authentication** — Demo purposes only
- **No real payments** — Wallet is mocked
- **No real data storage** — Everything uses localStorage
- **Before production:**
  - Add backend authentication (Firebase, Auth0, etc.)
  - Implement real payment processing
  - Add database (PostgreSQL, MongoDB, etc.)
  - Enable HTTPS (automatic with Vercel/Netlify)
  - Set up security headers (Content-Security-Policy, etc.)

---

## 💬 Contributing

Contributions welcome! Please:

1. Fork repository
2. Create feature branch (`feature/my-feature`)
3. Commit changes
4. Push to branch
5. Create Pull Request

---

## 📝 Changelog

### v1.0.0 (December 27, 2025)

**Initial Release**

- ✅ Core feed & vibes
- ✅ Stories with 24h expiry
- ✅ Messaging & message requests
- ✅ Creator studio (mock)
- ✅ PWA support
- ✅ Privacy controls
- ✅ Wallet (mock)
- ✅ Share system with counters
- ✅ Notifications
- ✅ Service worker & offline support

---

**Made with ❤️ by the VYBZ team**

# MergeFlow - Free Client-Side PDF Merger

A premium, high-performance, purely client-side PDF merging tool designed for speed, security, and SEO dominance.

## 🚀 Features

- **Client-Side Processing**: Uses `pdf-lib` to merge files in the browser. No server uploads.
- **Drag & Drop**: Intuitive UI for adding files.
- **Reordering**: Drag cards to change merge order.
- **SEO Optimized**: Pre-configured with Schema.org, Meta tags, and semantic HTML.
- **PWA Ready**: Includes manifest.json.
- **No Backend**: 100% static site.

## 📦 Deployment Instructions

This project is ready to deploy on any static host.

### 1. Vercel (Recommended)
1. Push code to GitHub.
2. Import project in Vercel.
3. Vercel will automatically detect the `vercel.json` configuration.
4. Deploy.

### 2. Netlify
1. Push code to GitHub or drag & drop the folder.
2. Netlify will read `netlify.toml`.
3. Deploy.

### 3. Cloudflare Pages
1. Connect GitHub repo.
2. Build command: `npm run build` (if using bundler) or just serve the root.
3. Deploy.

## 📈 SEO Strategy (How to get Massive Views)

1. **Domain Name**: Buy a domain like `freepdfmerger.io` or `combinepdf.app`.
2. **Backlinks**: Submit your tool to "Product Hunt", "Hacker News", and free tool directories.
3. **Social Sharing**: The app has a built-in "Share" button. Encouraging users to share after a successful merge is the key to viral growth.
4. **Performance**: The `vercel.json` and `netlify.toml` files ensure your site loads in < 0.5s, which is critical for Google Rankings.

## 🛠 Tech Stack

- React 18
- Tailwind CSS
- pdf-lib (PDF Processing)
- lucide-react (Icons)
- hello-pangea/dnd (Drag & Drop)

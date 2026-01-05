# Zybo - E-commerce Platform

A modern e-commerce application built with Next.js, featuring user authentication, product browsing, shopping cart, and order management.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom CSS variables
- **Animations**: GSAP for smooth interactions
- **State Management**: Zustand for global state
- **HTTP Client**: Axios for API requests
- **UI Components**: Custom components with shadcn/ui patterns
- **Icons**: Custom SVG icons
- **Fonts**: Inter font family
- **Notifications**: Sonner for toast notifications

## Tech Decisions

### Why Next.js?
- Server-side rendering for better SEO and performance
- App Router for modern routing and layouts
- Built-in optimization for images and fonts
- Easy deployment to Vercel

### Why TypeScript?
- Type safety to catch errors at compile time
- Better developer experience with IntelliSense
- Easier refactoring and maintenance

### Why Tailwind CSS?
- Utility-first approach for rapid UI development
- Consistent design system
- Responsive design out of the box
- Small bundle size with purging

### Why GSAP?
- High-performance animations
- Smooth hover effects for desktop interactions
- Conditional animations based on device capabilities

### Why Zustand?
- Lightweight state management
- Simple API without boilerplate
- TypeScript support out of the box

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zybo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with:
```env
NEXT_PUBLIC_API_URL=your_api_url
# Add other required environment variables
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
zybo/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── (login)/        # Login route group
│   │   ├── (shop)/         # Shop route group
│   │   ├── (profile)/      # Profile route group
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable components
│   │   ├── common/         # Shared components (nav, footer)
│   │   ├── pages/          # Page-specific components
│   │   └── ui/             # UI components
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utilities and configurations
│   └── store/              # Zustand stores
├── public/                 # Static assets
└── package.json
```

## Key Features

- User authentication (login/register)
- Product browsing with variations (size, color)
- Shopping cart and order management
- Responsive design for mobile and desktop
- Hover effects on desktop, touch-friendly on mobile
- Order success flow



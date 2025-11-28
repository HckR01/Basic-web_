# Nail Artistry - React Application

A modern nail art e-commerce application built with React, Vite, and Clerk authentication.

## Features

- 🛍️ Product catalog with shopping cart
- 🔐 User authentication with Clerk
- 📦 Order management and tracking
- 💅 Service booking system
- 📱 Responsive design
- 💬 WhatsApp integration for orders

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Clerk Authentication

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable key from the Clerk dashboard
4. Update the `.env` file:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

### 3. Run the Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

## Authentication

The app uses Clerk for user authentication. Protected routes include:

- `/cart` - Shopping cart (requires sign-in)
- `/orders` - Order history (requires sign-in)
- `/book` - Service booking (requires sign-in)

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation with auth buttons
│   ├── Footer.jsx          # Site footer
│   └── ...
├── pages/
│   ├── Home.jsx            # Landing page
│   ├── Cart.jsx            # Shopping cart
│   ├── Orders.jsx          # Order history
│   ├── Shop.jsx            # Product catalog
│   └── ...
├── context/
│   └── CartContext.jsx     # Shopping cart state
└── App.jsx                 # Main app with routing
```

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool
- **Clerk** - Authentication
- **React Router** - Navigation
- **Lucide React** - Icons
- **CSS Variables** - Theming

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

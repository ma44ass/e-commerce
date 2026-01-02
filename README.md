# Vendor

A modern multi-tenant e-commerce platform built with **Next.js**, **Payload CMS**, and **Stripe**. Vendors can create accounts, list products, and process payments while the platform handles payment processing and order management.

## Features

- **Multi-Tenant Architecture**: Each vendor gets their own isolated store with unique branding
- **User Authentication**: Secure sign-up and sign-in with email/password
- **Product Management**: Create, update, and manage product listings with rich text descriptions
- **Stripe Integration**: 
  - Integrated Stripe Connect for vendor payouts
  - Secure checkout with Stripe payment processing
  - Automatic webhook handling for order completion
- **Shopping Cart & Checkout**: Full purchasing workflow with Stripe Checkout
- **Order Management**: Track orders and purchases in user library
- **Product Reviews & Ratings**: User-generated reviews with star ratings
- **Category & Tag System**: Organize products with hierarchical categories and tags
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS and shadcn components
- **Admin Dashboard**: Payload CMS admin panel for managing products, orders, and users
- **Search & Filtering**: Find products by category, tags, and search queries

## Tech Stack

- **Frontend**: React 19, Next.js 15, TypeScript
- **CMS & Backend**: Payload CMS 3.69
- **Database**: MongoDB
- **Payment Processing**: Stripe 18.0
- **API**: tRPC with React Query
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Form Handling**: React Hook Form with Zod validation
- **Storage**: Vercel Blob for file uploads
- **Authentication**: Payload CMS built-in auth

## Getting Started

### Prerequisites

- Node.js 18+ (project uses `type: "module"` for ES modules)
- MongoDB connection string
- Stripe account with API keys
- Environment variables configured

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   # or
   bun install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file in the project root:
   ```env
   # Database
   DATABASE_URI=mongodb://localhost:27017/ecommerce

   # Payload CMS
   PAYLOAD_SECRET=your-secret-key

   # Stripe
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

   # File Storage
   BLOB_READ_WRITE_TOKEN=vercel-blob-token

   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Seed the database** (optional, creates admin account and categories):
   ```bash
   npm run db:seed
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` for the store and `http://localhost:3000/admin` for the CMS dashboard.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run generate:types` - Generate Payload TypeScript types
- `npm run db:fresh` - Reset database
- `npm run db:seed` - Seed database with demo data

## Project Structure

```
src/
├── app/              # Next.js app directory with routes
│   ├── (app)/       # Public routes (home, auth, products)
│   ├── (payload)/   # Payload admin panel
│   └── api/         # API routes (webhooks, tRPC)
├── collections/     # Payload CMS collections (Users, Products, Orders, etc.)
├── components/      # React components (UI & pages)
│   └── ui/         # shadcn/ui components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions (Stripe, auth, etc.)
├── modules/        # Feature modules
│   ├── auth/       # Authentication (login, register)
│   ├── checkout/   # Shopping cart & payment
│   ├── products/   # Product listing & search
│   ├── reviews/    # Product reviews
│   └── ...         # Other features
└── trpc/           # tRPC router setup and client
```

## Key Workflows

### Vendor Registration & Onboarding

1. User signs up with email/username
2. Automatically creates a Stripe account
3. Creates a tenant (vendor store) with unique slug
4. Redirects to Stripe onboarding to submit business details
5. Once verified, vendor can create products

### Shopping & Checkout

1. Customers browse products by category or search
2. Add items to cart
3. Proceed to checkout (Stripe hosted checkout)
4. Stripe processes payment and connects to vendor's account
5. Webhook confirms order creation
6. Customers see order in their library

### Admin Features

1. Access admin dashboard at `/admin`
2. Manage products, categories, orders, and users
3. View Stripe account verification status
4. Stripe verification button triggers onboarding flow

## Environment Setup

Refer to `.env.local` file structure above. Key configurations:

- **Stripe Multi-Account**: Connected Account model with platform fees
- **Multi-Tenant**: Products and media isolated by vendor
- **Storage**: Images uploaded to Vercel Blob
- **Webhooks**: Stripe events processed at `/api/stripe/webhooks`

## Database Schema

Main collections:
- **Users**: Store accounts with email/password
- **Tenants**: Vendor stores with Stripe account info
- **Products**: Items with pricing, descriptions, and tenant association
- **Orders**: Purchase records linked to users and products
- **Reviews**: User ratings and comments on products
- **Categories**: Hierarchical product organization
- **Tags**: Product tags for filtering
- **Media**: File uploads with storage

## API Routes

### tRPC Endpoints

Organized by module (defined in `src/trpc/routers/_app.ts`):
- `auth.*` - Login, registration, sessions
- `products.*` - Product search and listing
- `checkout.*` - Cart and payment processing
- `orders.*` - Order history
- `reviews.*` - Product reviews
- `tenants.*` - Vendor management
- `categories.*` - Category listing
- `library.*` - User's purchased items
- `tags.*` - Tag management

### Webhook Routes

- `POST /api/stripe/webhooks` - Handles Stripe events (payment completion, account updates)

## Contributing

To contribute to this project:

1. Create a feature branch from `main`
2. Make your changes following the existing code style
3. Test thoroughly, especially payment flows
4. Submit a pull request with clear description

## License

Check the LICENSE file for details.

## Support & Resources

- **Payload CMS Docs**: https://payloadcms.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **tRPC Docs**: https://trpc.io/docs

## Common Issues & Solutions

### Database Connection Fails
- Ensure MongoDB is running and `DATABASE_URI` is correct
- Check connection string format: `mongodb://user:pass@host:port/dbname`

### Stripe Integration Not Working
- Verify API keys are set in environment variables
- Check webhook URL is publicly accessible for production
- Ensure Stripe keys match test/live mode

### TypeScript Errors
- Run `npm run generate:types` to regenerate Payload types from schema
- Clear `.next` and `node_modules`, then reinstall

## Notes

- This platform uses **Connected Accounts** model with Stripe (vendors have their own Stripe accounts)
- **Platform fees** are calculated as a percentage of each transaction
- The admin dashboard is protected and requires authentication
- All product prices are in **USD**

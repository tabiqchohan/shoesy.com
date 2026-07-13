# Shoesy.com — Complete E-Commerce Plan

## Tech Stack
| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14+ (App Router) + TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | Neon (PostgreSQL - Serverless) |
| **ORM** | Prisma |
| **Auth** | NextAuth.js |
| **Image Upload** | Cloudinary |
| **State Management** | Zustand |
| **Deployment** | Vercel + Neon |

---

## Database Schema
- User (id, name, email, password, role, phone, address, city)
- Category (id, name, slug, image)
- Product (id, name, slug, description, price, salePrice, images[], sizes[], colors[], stock, categoryId, featured, isNew)
- CartItem (id, userId, productId, quantity, size, color)
- Order (id, userId, orderNumber, customerName, phone, address, city, notes, subtotal, discount, deliveryFee, total, couponCode, status, estimatedDelivery)
- OrderItem (id, orderId, productId, quantity, size, color, price)
- OrderStatusLog (id, orderId, status, note)
- Review (id, userId, productId, rating, comment)
- Wishlist (id, userId, productId)
- Coupon (id, code, discount, type, minOrder, maxUses, usedCount, expiresAt, isActive)
- Contact (id, name, email, phone, message)
- Subscriber (id, email)

---

## Features
- Homepage: Hero, Featured, Categories, New Arrivals, Testimonials, Newsletter
- Shop: Filters (category, price, size, color), Search, Sort, Pagination, Quick View
- Product Detail: Image gallery + zoom, Size/Color selector, Reviews, Related products
- Cart: Quantity update, Coupon, Free shipping bar, Remove items
- Checkout (COD): Form, order summary, estimated delivery, guest checkout
- Orders: My orders, order detail + timeline, track by number, cancel
- Wishlist: Save products
- Reviews & Ratings: Star rating, photo upload
- Coupon/Discount: Percentage or flat, validation
- Admin Panel: Dashboard with charts, Products CRUD + bulk import, Categories, Orders management with status timeline, Customers, Coupons, Messages, Subscribers, Settings
- Utility: Breadcrumbs, SEO, WhatsApp button, Social share, 404, Loading skeletons

---

## Pages
- `/` — Homepage
- `/shop` — All products
- `/product/[slug]` — Product detail
- `/cart` — Shopping cart
- `/checkout` — Checkout
- `/orders` — My orders
- `/orders/[id]` — Order detail
- `/track-order` — Track order
- `/wishlist` — Wishlist
- `/size-guide` — Size chart
- `/contact` — Contact us
- `/about` — About us
- `/login`, `/register` — Auth
- `/admin/*` — Admin panel

---

## API Routes
- Products: CRUD, featured, new-arrivals, search, reviews
- Categories: CRUD
- Cart: GET/POST/PUT/DELETE
- Checkout: POST (place order)
- Orders: GET, track, cancel
- Wishlist: GET/POST/DELETE
- Coupons: CRUD, validate
- Contact: POST
- Subscribe: POST
- Upload: POST (images)
- Bulk-import: POST (CSV)
- Admin: Dashboard stats, Products, Orders, Coupons, Customers, Messages, Subscribers, Settings
- Auth: NextAuth credentials + register

---

## Development Phases (8 Weeks)
| Phase | Duration | Tasks |
|-------|----------|-------|
| P1: Project Setup | Week 1 | Init project, Prisma, Neon, Tailwind, folder structure, layouts |
| P2: Auth | Week 2 | NextAuth, register, login, protected routes, admin middleware |
| P3: Products | Week 3 | CRUD APIs, admin forms, image upload, bulk import |
| P4: Shop Frontend | Week 4 | Homepage, shop, product detail, reviews, search |
| P5: Cart & Checkout | Week 5 | Cart store, coupon, checkout, COD, guest checkout |
| P6: Orders & Account | Week 6 | Orders, tracking, cancel, wishlist, profile |
| P7: Admin Panel | Week 7 | Dashboard, order management, customers, settings |
| P8: Polish & Deploy | Week 8 | Testing, SEO, error handling, Vercel deploy |

---

## COD Flow
User → Add to cart → Checkout → Fill info → Place order → Order saved (pending) → Admin confirms → Shipped → Delivered → Cash collected

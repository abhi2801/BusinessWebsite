# Jami Dunia (ଜମି ଦୁନିଆ) — Odisha's Premier Real Estate & Land Demarcation Marketplace

**Jami Dunia** is a production-grade, full-stack real estate marketplace tailored specifically for India, initially focused on **Odisha** (Bhubaneswar/Khordha, Cuttack, and Puri).

The platform provides end-to-end facilities for:
1. **Land Buy & Sell** — Verified residential Gharabari plots, commercial land, and highway corridors with transparent sq.ft price calculations.
2. **Residential Properties** — Luxury apartments (1, 2, 3, 4 BHK), gated villas, duplexes, and freehold independent houses.
3. **Land Paper Work & Legal Clearance** — Official Bhulekh Odisha ROR Khatiyan verification, Tahasil mutation (Namajari) e-Pauchar, bilingual sale deed drafting, and 30-year non-encumbrance (EC) title search.
4. **Land Dispute Solution & Demarcation** — Licensed electronic Total Station DGPS survey, boundary encroachment resolution, and revenue court petition support.
5. **Direct Seller Portal** — Zero brokerage property listing with mandatory authentication and admin title verification.
6. **Booking & Cart** — Property advance token checkout system integrated with INR formatting and Razorpay.
7. **Supabase Cloud Backend** — Real-time persistence of inquiries, bookings, seller submissions, and contact requests in PostgreSQL.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Backend & Database**: Supabase (PostgreSQL 17 with Row-Level Security)
- **Authentication**: Email/Password, 1-Click Google/Gmail OAuth
- **Hosting & Region**: Supabase Project in `ap-south-1` (Mumbai, India)
- **Currency**: Indian Rupee (₹ INR)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v20+)
- npm

### 2. Installation
```bash
git clone https://github.com/abhi2801/BusinessWebsite.git
cd BusinessWebsite
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://xikurxsrwqdcoygqyehl.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhpa3VyeHNyd3FkY295Z3F5ZWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyMzIzMzIsImV4cCI6MjEwOTgwODMzMn0.M3usignqfHdpKIXx7rQcv1VSv6-r_-F9054lOv6PGqM
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
```bash
npm run build
```

---

## 🔐 Admin Dashboard Access
- **URL**: `/admin-dashboard`
- **Username / Email**: `admin` or `admin@jamidunia.in`
- **Password**: `pwd@123`

---

## 📄 License
MIT © Jami Dunia Technologies Pvt. Ltd.

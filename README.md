# DocEye – Doctor Portal (Next.js + TypeScript)

A production-grade, full-stack telemedicine platform built for performance, accessibility, and delightful user experience. Engineered with modern Next.js 15 (App Router), intelligent rendering strategies (SSR + ISR), real-time communication, secure payments, and role-based dashboards for Patients, Doctors, and Admins.

**Live Demo:** https://doc-eye.vercel.app  
**Frontend Repository:** https://github.com/habib-utsho/doc-eye-client  
**Backend Repository:** https://github.com/habib-utsho/doc-eye-server

## ✨ Key Features

- **3 User Roles**: Patient, Doctor, Admin – each with dedicated dashboards
- Beautiful homepage with Specialty browsing, Health Plans, About, and **Fit & Healthy** section
- Advanced doctor filtering by specialty + real-time availability slots
- Seamless appointment booking with **AamarPay** payment gateway integration
- **Real-time chat** powered by Socket.IO
- **Video consultation** using Jitsi Meet (doctor joins first for control)
- Rich animations with **Framer Motion**
- Perfect **dark/light mode** toggle (fully persistent)
- State-of-the-art UI/UX using **Tailwind CSS + Hero UI**
- Fully type-safe with **TypeScript** + validation using **Zod**
- Optimized data fetching & caching with **TanStack Query**

### Dashboards

**Patient Dashboard**

- Overview stats & charts
- Upcoming / Expired appointments
- Consultation history (prescriptions & reports)
- Favorite doctors
- Payment history
- Profile & settings

**Doctor Dashboard**

- Revenue & appointment analytics
- Manage patients
- Upcoming / Past appointments
- Consultation history (generate prescriptions)
- Payment history
- Profile management

**Admin Dashboard**

- Platform overview analytics
- Manage specialties, doctors, admins, patients
- Full consultation & payment oversight

### Coming Soon (Fit & Healthy – AI-Powered)

- Daily goals & streaks
- Personalized workout plans
- Nutrition guide & meal tracking
- Health metrics dashboard
- Mental wellness tools
- Achievements & badges

## 🛠 Tech Stack

| Technology              | Purpose                                |
| ----------------------- | -------------------------------------- |
| Next.js 14 (App Router) | SSR, routing, API routes               |
| TypeScript              | Type safety                            |
| Tailwind CSS            | Utility-first styling                  |
| Hero UI                 | Premium component library              |
| Framer Motion           | Smooth animations & micro-interactions |
| TanStack Query          | Server-state management & caching      |
| Axios                   | HTTP client                            |
| Zod                     | Schema validation                      |
| Socket.IO Client        | Real-time chat                         |
| Moment.js               | Date/time formatting                   |
| ESLint + Prettier       | Code quality & formatting              |

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm / npm / yarn

### Environment Variables (.env)

```bash
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_SOCKET_BASE_URL=
NEXT_PUBLIC_PER_CONSULTATION_SERVICE_FEE=
NEXT_NODE_ENV=
NEXT_JWT_ACCESS_SECRET=/kvC7if6CWI6HGW7XXMMSSlQ63Ew=
NEXT_JWT_REFRESH_SECRET=/kvC7if6CFFFFFF5555LLLFFFlQ63Ew=
```

### Installation

```bash
git clone https://github.com/habib-utsho/doc-eye-client
cd doc-eye-client
yarn install      # or npm install
```

### Development

```bash
yarn dev
```

### Production Build

```bash
yarn build
```
  

  
## 🔒 License

** Proprietary Software – All Rights Reserved**

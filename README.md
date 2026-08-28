# Greenfield Bank — Next.js + Auth.js + PostgreSQL

A professional banking dashboard inspired by the supplied Greenfield Bank UI.

## Stack

- Next.js App Router
- React + JSX
- Auth.js / NextAuth Credentials Authentication
- PostgreSQL
- Prisma ORM
- bcryptjs
- Lucide icons
- Responsive CSS

## 1. Install

```bash
npm install
```

## 2. PostgreSQL

Create a PostgreSQL database named:

```text
greenfield_bank
```

Then copy `.env.example` to `.env` and set:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/greenfield_bank?schema=public"
AUTH_SECRET="a-long-random-secret"
```

## 3. Database setup

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

## 4. Start

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Demo login

Email:

```text
mdsiambabu537@gmail.com
```

Password:

```text
12345678
```

## Important

This is a learning/demo banking application. It does not connect to a real bank and should not be used for real financial transactions without a proper security, compliance, audit, and infrastructure review.
# md-

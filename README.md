# 🖥️ E-Catalog Komputer

This is a **Next.js** application for an online computer catalog. It uses Prisma for database access and management.

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory and fill in your environment variables (e.g., database connection string):

```
DATABASE_URL="your-database-url"
```

### 3. Prisma Setup

Generate the Prisma client:

```bash
npx prisma generate
```

Run the database migrations:

```bash
npx prisma migrate dev --name your_migration_name
```

Seed the database:

```bash
npx prisma db seed
```

### 4. Run Development Server

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 File Structure

- `app/page.tsx`: Main entry point for the homepage. You can start editing here.
- `prisma/`: Contains your Prisma schema and seed data.

## 📦 Tech Stack

- **Framework**: Next.js
- **Database ORM**: Prisma
- **Font Optimization**: next/font using Geist

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Learn Next.js](https://nextjs.org/learn)

## ☁️ Deployment

The easiest way to deploy your app is via Vercel, the creators of Next.js:

- [Deploy to Vercel](https://vercel.com/new)
- [Deployment Documentation](https://nextjs.org/docs/deployment)

Feel free to customize and expand this README based on your project's specific features!

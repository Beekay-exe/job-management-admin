# Job Management Admin

A modern job board application built with Next.js, TypeScript, and PostgreSQL.

## Features

- Create and manage job postings
- Advanced job filtering
- Modern UI with Mantine components
- Real-time job search
- Responsive design
- PostgreSQL database integration

## Tech Stack

- Next.js 14
- TypeScript
- Prisma ORM
- PostgreSQL
- Mantine UI
- Tabler Icons

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="your-postgresql-connection-string"
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Run the development server:
```bash
npm run dev
```

## Deployment

This application can be deployed using Vercel for the frontend and Supabase for the PostgreSQL database.

1. Create a Supabase account and set up a new project
2. Get the PostgreSQL connection string from Supabase
3. Deploy to Vercel and add the DATABASE_URL environment variable

## License

MIT 
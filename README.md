# Electronics Profile (Next.js)

This is a simple Next.js project scaffold for an electronics profile site with:

- Public pages: Home, Services, Contact
- Admin area: login and dashboard to update site content (site title, services, team names, contact)
- API routes: send email (SendGrid) and SMS (Twilio), content read/write
- Styling: Tailwind CSS with red/blue/green/black/white colors, gradients and animations

Quick start

1. Install dependencies

```bash
npm install
```

2. Create an environment file `.env.local` based on `.env.local.example` and set your keys.

3. Start a Postgres database and set `DATABASE_URL` in `.env.local`. Example local URL:

```bash
DATABASE_URL=postgres://postgres:postgres@localhost:5432/electronics
```

4. Initialize Prisma (generate client and run migrations):

```bash
npm run prisma:generate
npm run prisma:migrate
node scripts/seed-admin.js # or `node --loader ts-node/esm scripts/seed-admin.ts` if using ts-node
```

5. Run dev server

```bash
npm run dev
```

Admin

- Default admin credentials are `admin` / `password` unless you set `ADMIN_USER` and `ADMIN_PASS` in `.env.local`.
- Go to `/admin/login` to sign in, then `/admin/dashboard` to edit content.

Email/SMS

- To enable email sending set `SENDGRID_API_KEY` and `FROM_EMAIL`/`CONTACT_EMAIL`.
- To enable SMS set Twilio variables `TWILIO_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM`, `TWILIO_TO`.

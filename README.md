# IBush8 Portfolio

Portfolio frontend + Node.js/Express REST API.

## Stack

- Node.js 20+
- Express 5
- MongoDB + Mongoose
- Helmet
- CORS
- Rate limiting
- Nodemailer (optional contact email notification)

## API

### Health
`GET /api/health`

### Projects
`GET /api/projects?lang=fa`
`GET /api/projects?lang=en`
`GET /api/projects/:slug`

### Contact
`POST /api/contact`

Body:
```json
{
  "name": "Amir",
  "email": "you@example.com",
  "message": "Hello IBush8"
}
```

## Run locally

1. Install Node.js 20+.
2. Install MongoDB locally or create a MongoDB Atlas database.
3. Copy `.env.example` to `.env` and set `MONGO_URI`.
4. Run:

```bash
npm install
npm run seed
npm run dev
```

Open `http://localhost:3000`.

The frontend is served by the same Express app, so the browser can call `/api/...` without hardcoding a production domain.

## Production notes

Before deployment:
- Put the app behind HTTPS.
- Set a real `MONGO_URI`.
- Set `FRONTEND_ORIGIN` to the real origin if frontend/API are separated.
- Configure SMTP if contact email notifications are desired.
- Move secrets only into environment variables.
- Add an admin-authenticated dashboard before exposing contact-message management.

## Admin panel

Open `/admin`.

Set these in `.env` before running `npm run seed`:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=use-a-long-random-password
```

The seed command creates the first admin account. The admin panel can:
- create, edit and delete projects
- view contact messages
- authenticate through `/api/admin/login`

Admin project routes require a Bearer token.

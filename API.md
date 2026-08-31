# IBush8 API Reference

## GET /api/health

Returns API status.

## GET /api/projects?lang=fa|en

Returns all portfolio projects.

## GET /api/projects/:slug

Returns one project.

## POST /api/contact

Creates a contact message.

Validation:
- name: 2-80 chars
- email: valid email
- message: 10-4000 chars

Rate limit:
- 5 requests per 15 minutes per client window.

## Admin

`POST /api/admin/login`
`POST /api/admin/logout`

Admin-only:
`POST /api/projects`
`PATCH /api/projects/:id`
`DELETE /api/projects/:id`
`GET /api/contact`
`PATCH /api/contact/:id`

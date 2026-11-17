# SandaruSeya Photogrphy

SandaruSeya is a responsive photography portfolio and booking website. Visitors can explore the photographer’s work and services, browse the gallery, and send an event enquiry. The admin area uses Supabase authentication and storage to manage gallery photos.

## Features

- Responsive portfolio, services, gallery, and contact pages
- Booking enquiries delivered with EmailJS
- Admin sign-in backed by Supabase Auth
- Gallery photo uploads stored in Supabase Storage
- Light and dark themes

## Tech stack

- React 19 and Vite
- React Router
- Framer Motion
- Supabase
- EmailJS

## Getting started

### Requirements

- Node.js 20.19+ or 22.12+
- npm

### Install and run

```bash
npm install
cp .env.example .env.local
npm run dev
```

On Windows PowerShell, copy the environment file with:

```powershell
Copy-Item .env.example .env.local
```

Set up the required environment variables in `.env.local` before using bookings, admin sign-in, or cloud gallery storage. Restart the Vite server after changing environment variables.

## Environment variables

| Variable | Used for |
| --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS email service |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS booking template |
| `VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID` | EmailJS customer confirmation template |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS browser public key |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key |

These variables are embedded in the client-side app. Use only public/publishable credentials in `VITE_` variables; never put a Supabase `service_role` key, EmailJS private key, or other server secret here. Keep `.env.local` out of version control.

## EmailJS booking setup

1. Create an EmailJS service and booking email template.
2. Set the template recipient to the inbox that should receive enquiries.
3. Include these template variables: `{{name}}`, `{{email}}`, `{{phone}}`, `{{eventType}}`, `{{date}}`, and `{{message}}`.
4. Optionally set Reply-To to `{{email}}` so you can reply directly to the visitor.
5. Add the service ID, template ID, and public key to `.env.local`.

### Customer booking confirmation

Create a second EmailJS template for the automatic reply to the person who booked. Set its **To Email** field to `{{to_email}}`, and use `{{to_name}}` and `{{reply_message}}` in the email. You can also include booking details with `{{eventType}}`, `{{date}}`, `{{phone}}`, and `{{message}}`. Set `VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID` to this template's ID in `.env.local` and in Vercel's project environment variables, then redeploy. The website sends this confirmation after it successfully sends the booking enquiry to the business inbox.

## Supabase admin and gallery setup

1. Create a Supabase project and add its project URL and publishable key to `.env.local`.
2. In Supabase Auth settings, disable public sign-ups. Create the admin user from the Supabase dashboard.
3. Run [`supabase/gallery-setup.sql`](supabase/gallery-setup.sql) in the Supabase SQL Editor. It creates the `gallery-photos` storage bucket, the `gallery_photos` table, and the access policies used by the app.
4. Start the app and open `/admin` to sign in. Upload and manage gallery photos there.

Gallery photos are stored in Supabase so they can be viewed across devices. Photos previously saved only in browser IndexedDB are not transferred automatically; download the originals and upload them again through `/admin`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Deployment

Build the app with `npm run build` and deploy the generated `dist/` directory to a static hosting provider. Configure the five environment variables in the hosting provider’s build settings, then rebuild and deploy. Configure the host to serve the app entry point for client-side routes such as `/admin`.

## Repository

[github.com/VenuriN/SandaruSeya](https://github.com/VenuriN/SandaruSeya)

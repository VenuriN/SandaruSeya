# SandaruSeya

## Booking email setup

1. Create an EmailJS email service and a booking email template in the EmailJS dashboard.
2. Set the template recipient to your inbox. Use these form variables: `{{name}}`, `{{email}}`, `{{phone}}`, `{{eventType}}`, `{{date}}`, and `{{message}}`. Set Reply-To to `{{email}}` if you want to reply directly to the customer.
3. Copy `.env.example` to `.env.local` and fill in the service ID, template ID, and EmailJS public key.
4. Restart the Vite development server after changing environment variables.

The EmailJS public key and IDs are used in the browser. Do not put an EmailJS private key or other secrets in `VITE_` variables.

## Admin login setup

1. Create a Supabase project and copy its Project URL and publishable key from the project API settings.
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` to `.env.local`, then restart Vite.
3. In Supabase Auth settings, turn off new user sign-ups. Create your admin email/password user from the Supabase dashboard.
4. Open `/admin` and sign in with that email and password. The email address is the username.

## Gallery photo storage

Gallery images and their details are stored in Supabase so visitors on other devices can see them.

1. Configure the Supabase URL and publishable key as described above.
2. In the Supabase Dashboard, open SQL Editor and run [`supabase/gallery-setup.sql`](supabase/gallery-setup.sql). This creates the public `gallery-photos` Storage bucket, the `gallery_photos` table, and access policies. Visitors can view photos; signed-in users can manage them.
3. Upload photos from `/admin` while signed in. For a hosted site, set the same `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in the hosting provider's environment settings and rebuild/redeploy.

Previously uploaded photos are still in the browser's local IndexedDB and are not copied automatically. Download those originals and upload them again through `/admin` after the Supabase setup.

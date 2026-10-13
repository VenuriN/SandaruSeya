# SandaruSeya

## Booking email setup

1. Create an EmailJS email service and a booking email template in the EmailJS dashboard.
2. Set the template recipient to your inbox. Use these form variables: `{{name}}`, `{{email}}`, `{{phone}}`, `{{eventType}}`, `{{date}}`, and `{{message}}`. Set Reply-To to `{{email}}` if you want to reply directly to the customer.
3. Copy `.env.example` to `.env.local` and fill in the service ID, template ID, and EmailJS public key.
4. Restart the Vite development server after changing environment variables.

The EmailJS public key and IDs are used in the browser. Do not put an EmailJS private key or other secrets in `VITE_` variables.

# Campus OS

Campus OS is a source-aware campus information MVP for MSRIT. It helps students find locations, browse events and notices, reach official public services, and ask grounded questions.

## Run locally

This build deliberately has no package dependencies. For the simplest path, open [index.html](index.html) directly in a modern browser. It works without a server.

For the local development server, with Node 20+:

```powershell
cd outputs/campus-os
node server.mjs
```

Open `http://localhost:3000`. Run checks with `node --test tests/*.test.mjs`.

### Google Maps and Gemini

For the real Google Maps JavaScript map and Gemini chat, run the local server and set these environment variables before starting it:

```powershell
$env:GOOGLE_MAPS_API_KEY = "your-browser-restricted-maps-key"
$env:GEMINI_API_KEY = "your-server-only-gemini-key"
node server.mjs
```

In Google Cloud, enable **Maps JavaScript API** and restrict the Maps key to your deployed domain (or `http://localhost:3000` during local development). Do not use a Gemini key in browser code. The `/api/ask` route keeps it server-side.

## Architecture

The present MVP is a dependency-free responsive web app with in-browser search and an assistant interface over curated seed data. `schema.sql` is the PostgreSQL/Supabase migration foundation: provenance is attached to content through `sources`, and publishing is gated by a review status.

For production, replace `data.js` with server routes querying Supabase; use a server-only LLM adapter to retrieve structured records and document chunks before generating an answer. Never send `OPENAI_API_KEY` to a browser.

## Supabase and deployment

Create a Supabase project, run `schema.sql` in the SQL editor, add a role-aware profile table/admin policies, and place credentials in `.env` based on `.env.example`. Deploy the resulting Next.js/server implementation to Vercel or host this static MVP behind a Node process. Private SIS, attendance, marks and student records are intentionally outside scope until MSRIT offers supported authentication/API access.

See [ARCHITECTURE.md](ARCHITECTURE.md) and [DATA_SOURCES.md](DATA_SOURCES.md).

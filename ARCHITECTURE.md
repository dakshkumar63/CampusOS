# Architecture

## MVP now

`data.js` provides curated, visibly labeled seed content. `app.js` is a small SPA with client routes, universal search, map selection, a source-aware assistant, and an admin review view. `server.mjs` provides a zero-dependency local server.

## Production path

1. Public browser UI calls authenticated server routes.
2. Server routes validate input, query published Supabase records and preserve `source_id` in each response.
3. Ingestion workers fetch only approved sources, sanitize/parses content, normalize it, run duplicate detection and send it to `pending_review`.
4. An admin publishes reviewed records. Published content is indexed for full-text and vector retrieval.
5. The assistant uses structured records for dates/locations and document embeddings for long-form material, then returns links and verification dates with each answer.

Use a provider adapter shaped as `generateAnswer(query, context)` on the server. Apply authentication, role checks, rate limits, URL allowlists, HTML sanitization and prompt-injection resistant document boundaries at this layer.

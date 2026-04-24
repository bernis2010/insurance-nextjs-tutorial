# Insurance Form App

A schema-driven insurance claims starter built with Next.js App Router, React, and TypeScript.

## Included

- Auto claim form schema
- Home claim form schema
- Dynamic form renderer by part, section, and field
- Conditional logic (`showIf`)
- Real file input handling
- Multipart API submission to `POST /api/claims`
- Validation for required fields and email format
- Notes area, navigation, and error sidebar

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/claims/auto`
- `/claims/home`
- `/api/claims`

## How submission works

The client builds a `FormData` payload with:

- `formId`
- `payload` JSON string containing field values and notes
- attached files under each file field name

The API route reads the multipart data, summarizes uploaded filenames, and returns a demo claim reference.

## Suggested next upgrades

- Persist uploads to S3 or Blob storage
- Save metadata to DynamoDB, Postgres, or MongoDB
- Add AJV or Zod for schema-level validation
- Add authentication and claim status pages

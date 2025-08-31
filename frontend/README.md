
# Products CMS – Frontend (Next.js)

## Setup

1) Copy `.env.example` to `.env.local` and set the backend API base:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

2) Install and run:
```bash
npm install
npm run dev
```
App: `http://localhost:3000`

## Pages
- `/` – Live public page (shows Published & not deleted)
- `/admin/products` – Admin list page
- `/admin/products/new` – Create form
- `/admin/products/[id]/edit` – Edit form


# Products CMS – Backend (Express + MySQL)

## Setup

1) Ensure MySQL is running, then create the DB and table:
```sql
-- In your MySQL client:
SOURCE ./db.sql;
```
Or manually run the statements in `db.sql`.

2) Copy `.env.example` to `.env` and fill in values:
```
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=products_cms
CORS_ORIGIN=http://localhost:3000
```

3) Install and run:
```bash
npm install
npm run dev
```
Server: `http://localhost:4000`

## API

- `GET /api/products?status=Published&includeDeleted=false` – list products
- `GET /api/products/:id` – get one
- `POST /api/products` – create (body: product_name, product_desc?, status?, created_by)
- `PUT /api/products/:id` – update (body can include product_name?, product_desc?, status?, updated_by)
- `PATCH /api/products/:id/status` – set status (body: status, updated_by)
- `DELETE /api/products/:id` – soft delete (body: updated_by)
- `GET /api/live/products` – published+not deleted (for public site)

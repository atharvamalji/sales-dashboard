# 📊 Superstore Insights

A full-stack web application for analyzing, visualizing, and managing retail sales data. Built with Next.js, PostgreSQL (Supabase), Drizzle ORM, and Chart.js, this project enables CRUD operations across customers, products, orders, and sales, while providing interactive dashboards for business insights.

## 🧠 Project Overview

Superstore Insights helps businesses explore sales performance, customer behavior, product profitability, and operational trends.

### Key Features

- **Interactive Dashboards** — Real-time visualization of sales metrics and trends
- **Analytical Visualizations** — Chart.js-powered graphs for data-driven decisions
- **Full Database CRUD** — Complete create, read, update, delete functionality
- **Clean UI** — Intuitive interface for managing retail entities
- **SQL-Backed Operations** — Robust PostgreSQL database with Drizzle ORM

A live hosted version is deployed using Vercel.

## 📁 Repository Structure

```
.
├── app/                    → Next.js routes + table pages + dashboard UI
├── components/app/         → Chart.js components + reusable UI blocks
├── dataset/                → Raw dataset CSV (superstore_raw.csv)
├── lib/                    → Database connection + utilities
├── public/                 → Static assets
├── src/db/                 → Drizzle ORM schema + migrations
├── supabase/migrations/    → SQL migration files
├── README.md               → Project documentation
├── drizzle.config.ts       → Drizzle configuration
├── next.config.ts          → Next.js config
└── package.json            → Project metadata
```

## 🗂 Dataset Description

The application is powered by the **Superstore dataset**, a widely used retail transactional dataset designed for analytics, forecasting, and business intelligence.

### Context

A major retail Superstore seeks to understand which products, regions, categories, and customer segments drive profitability or underperform.

The dataset supports:

- Performance benchmarking
- Customer segmentation
- Profitability analysis

### Raw CSV File Location

```
/dataset/superstore_raw.csv
```

## 🗄️ Database Schema

The relational schema contains the following normalized tables:

### Customers

- `customer_id` (PK)
- `customer_name`
- `segment`
- `country`, `city`, `state`, `postal_code`, `region`

### Products

- `product_id` (PK)
- `product_name`
- `category`, `sub_category`

### Orders

- `order_id` (PK)
- `order_date`, `ship_date`, `ship_mode`
- `customer_id` (FK → customers)
- `product_id` (FK → products)
- `sales`, `quantity`, `discount`, `profit`

### Sales

- `sales_id` (PK)
- `order_id` (FK)
- `product_id` (FK)
- `sales`, `quantity`, `discount`, `profit`

### Raw Data Table

Used for staging CSV data before normalization.

## 🔄 SQL Scripts — Raw Data → Normalized Tables

These scripts populate normalized tables from `raw_data`.

### Insert Customers

```sql
INSERT INTO customers (customer_id, customer_name, segment, country, city, state, postal_code, region)
SELECT DISTINCT customer_id, customer_name, segment, country, city, state, postal_code, region
FROM raw_data
WHERE customer_id IS NOT NULL
ON CONFLICT (customer_id) DO NOTHING;
```

### Insert Products

```sql
INSERT INTO products (product_id, product_name, category, sub_category)
SELECT DISTINCT product_id, product_name, category, sub_category
FROM raw_data
WHERE product_id IS NOT NULL
ON CONFLICT (product_id) DO NOTHING;
```

### Insert Orders

```sql
INSERT INTO orders (order_id, order_date, ship_date, ship_mode, customer_id, product_id, sales, quantity, discount, profit)
SELECT DISTINCT order_id, order_date, ship_date, ship_mode, customer_id, product_id, sales, quantity, discount, profit
FROM raw_data
WHERE order_id IS NOT NULL
ON CONFLICT (order_id) DO NOTHING;
```

### Insert Sales

```sql
INSERT INTO sales (order_id, product_id, sales, quantity, discount, profit)
SELECT order_id, product_id, sales, quantity, discount, profit
FROM raw_data
WHERE order_id IS NOT NULL AND product_id IS NOT NULL;
```

## 🧩 Application Interface & Functionalities

### Dashboard

Displays:

- **Sales over Time** — Line chart showing temporal trends
- **Sales by Category** — Pie chart breaking down revenue sources
- **Order Quantity per Product** — Bar chart for inventory insights

### CRUD Management Pages

- **Customers** — Add, edit, delete, search customer records
- **Orders** — Full order metadata with complete CRUD operations
- **Products** — Comprehensive catalog management
- **Sales** — Line items with prices, discounts, and profit calculations

### Interactive Components

- Built using **Chart.js** for dynamic visualizations
- Real-time table filtering and search
- Drizzle ORM queries powering all API endpoints

## 🔌 Interaction & Querying

### Sample Drizzle ORM Query

```typescript
const customers = await db.select().from(customers);
```

### Sample API Interactions

```
GET  /api/customers      → Fetch all customers
POST /api/products       → Create new product
PUT  /api/orders/:id     → Update order
DELETE /api/sales/:id    → Delete sales record
```

These APIs directly interface with PostgreSQL through Drizzle ORM.

## 🚀 Deployment

The application will be deployed using:

- **Vercel** — Next.js SSR + Edge functions
- **Supabase** — PostgreSQL hosting + automated migrations

## 🧠 What the App Does — Summary

-  Visualizes sales, product, and customer insights
-  Allows full CRUD operations across all retail entities
-  Presents comprehensive dashboard analytics
-  Supports future ML/forecasting extensions
-  Provides modular, scalable Next.js architecture

## 📝 License

This project is open source and available for educational and commercial use at https://sales-dashboard-eight-omega.vercel.app/

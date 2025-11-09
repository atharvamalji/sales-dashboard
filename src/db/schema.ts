import { date, integer, numeric, pgTable, serial, text } from 'drizzle-orm/pg-core';

// Customers table
export const customers = pgTable('customers', {
  customerId: text('customer_id').primaryKey(), // PK
  customerName: text('customer_name').notNull(),
  segment: text('segment').notNull(),
  country: text('country').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  postalCode: text('postal_code').notNull(),
  region: text('region').notNull(),
});

// Products table
export const products = pgTable('products', {
  productId: text('product_id').primaryKey(),
  productName: text('product_name').notNull(),
  category: text('category').notNull(),
  subCategory: text('sub_category').notNull(),
});

// Orders table (metadata)
export const orders = pgTable('orders', {
  orderId: text('order_id').primaryKey(),
  orderDate: date('order_date').notNull(),
  shipDate: date('ship_date').notNull(),
  shipMode: text('ship_mode').notNull(),
  customerId: text('customer_id')
    .notNull()
    .references(() => customers.customerId, { onDelete: 'cascade' }),
});

// Sales table (line items)
export const sales = pgTable('sales', {
  salesId: serial('sales_id').primaryKey(), // auto-increment PK
  orderId: text('order_id')
    .notNull()
    .references(() => orders.orderId, { onDelete: 'cascade' }),
  productId: text('product_id')
    .notNull()
    .references(() => products.productId, { onDelete: 'cascade' }),
  sales: numeric('sales').notNull(),
  quantity: integer('quantity').notNull(),
  discount: numeric('discount').notNull(),
  profit: numeric('profit').notNull(),
});

// Raw data table (original CSV)
export const rawDataTable = pgTable('raw_data', {
  rowId: integer('row_id').notNull(),
  orderId: text('order_id').notNull(),
  orderDate: date('order_date').notNull(),
  shipDate: date('ship_date').notNull(),
  shipMode: text('ship_mode').notNull(),
  customerId: text('customer_id').notNull(),
  customerName: text('customer_name').notNull(),
  segment: text('segment').notNull(),
  country: text('country').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  postalCode: text('postal_code').notNull(),
  region: text('region').notNull(),
  productId: text('product_id').notNull(),
  category: text('category').notNull(),
  subCategory: text('sub_category').notNull(),
  productName: text('product_name').notNull(),
  sales: numeric('sales').notNull(),
  quantity: integer('quantity').notNull(),
  discount: numeric('discount').notNull(),
  profit: numeric('profit').notNull(),
});

// Type inference
export type InsertCustomer = typeof customers.$inferInsert;
export type SelectCustomer = typeof customers.$inferSelect;

export type InsertProduct = typeof products.$inferInsert;
export type SelectProduct = typeof products.$inferSelect;

export type InsertOrder = typeof orders.$inferInsert;
export type SelectOrder = typeof orders.$inferSelect;

export type InsertSale = typeof sales.$inferInsert;
export type SelectSale = typeof sales.$inferSelect;

export type InsertRawData = typeof rawDataTable.$inferInsert;
export type SelectRawData = typeof rawDataTable.$inferSelect;

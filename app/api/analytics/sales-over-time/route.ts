import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { orders, sales } from "@/src/db/schema";
import { sql, eq } from "drizzle-orm";

export async function GET() {
  const result = await db
    .select({
      month: sql<string>`TO_CHAR(DATE_TRUNC('month', ${orders.orderDate}), 'YYYY-MM')`,
      totalSales: sql<number>`SUM(${sales.sales})`,
    })
    .from(orders)
    .innerJoin(sales, eq(orders.orderId, sales.orderId))
    .groupBy(sql`DATE_TRUNC('month', ${orders.orderDate})`)
    .orderBy(sql`DATE_TRUNC('month', ${orders.orderDate})`);

  return NextResponse.json(result);
}

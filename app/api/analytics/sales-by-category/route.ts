import { db } from "@/src/db";
import { products, sales } from "@/src/db/schema";
import { sql, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Aggregate total sales by category
    const result = await db
      .select({
        category: products.category,
        totalSales: sql<number>`SUM(${sales.sales})`,
      })
      .from(sales)
      .innerJoin(products, eq(sales.productId, products.productId))
      .groupBy(products.category)
      .orderBy(sql`SUM(${sales.sales}) DESC`);

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch sales by category" },
      { status: 500 }
    );
  }
}

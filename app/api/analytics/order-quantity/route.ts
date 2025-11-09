import { db } from "@/src/db";
import { sales } from "@/src/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db
      .select({
        productId: sales.productId,
        totalQuantity: sql<number>`SUM(${sales.quantity})`,
      })
      .from(sales)
      .groupBy(sales.productId)
      .orderBy(sql`SUM(${sales.quantity}) DESC`)
      .limit(20); // only top 20 products

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch order quantities" },
      { status: 500 }
    );
  }
}

// app/layout.tsx
import Link from "next/link";
import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salescast.io",
  description: "Sales management and visualization platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <main className="min-h-screen bg-linear-to-b from-blue-50 to-white">
          <header className="sticky top-0 w-full bg-stone-50 border-b border-stone-200 shadow-sm">
            <div className="max-w-6xl mx-auto h-12 px-4 flex items-center justify-between">
              <div>salescast.io</div>
              <div>
                <nav>
                  <ul className="flex gap-8 text-sm">
                    <Link href={"/dashboard"}>
                      <li>Dashboard</li>
                    </Link>

                    <Link href={"/tables/customers"}>
                      <li>Customers</li>
                    </Link>
                    <Link href={"/tables/orders"}>
                      <li>Orders</li>
                    </Link>
                    <Link href={"/tables/products"}>
                      <li>Products</li>
                    </Link>
                    <Link href={"/tables/sales"}>
                      <li>Sales</li>
                    </Link>
                  </ul>
                </nav>
              </div>
              <div className="rounded-full border-2 p-0.5 border-blue-700">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://i.pravatar.cc/150?img=16"
                  alt="User"
                />
              </div>
            </div>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}

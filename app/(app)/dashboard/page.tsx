import OrderQuantityInfocard from "@/components/app/order-quantity-infocard";
import SalesByCategoryInfocard from "@/components/app/sales-by-category-infocard";
import SalesOverTimeInfoCard from "@/components/app/sales-over-time-infocard";

// app/(app)/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      <header className="sticky top-0 w-full bg-stone-50 border-b border-stone-200 shadow-sm">
        <div className="max-w-6xl mx-auto h-12 px-4 flex items-center justify-between">
          <div>salescast.io</div>
          <div>
            <nav>
              <ul className="flex gap-8 text-sm">
                <li>Dashboard</li>
                <li>Tables</li>
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

      <div className="w-full">
        <div className="max-w-6xl mx-auto p-4 grid grid-cols-8 gap-4">
          <div className="col-span-8">
            <SalesOverTimeInfoCard />
          </div>
          <div className="col-span-5">
            <OrderQuantityInfocard />
          </div>
          <div className="col-span-3">
            <SalesByCategoryInfocard />
          </div>
        </div>
      </div>
    </main>
  );
}

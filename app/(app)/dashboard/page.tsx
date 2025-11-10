import OrderQuantityInfocard from "@/components/app/order-quantity-infocard";
import SalesByCategoryInfocard from "@/components/app/sales-by-category-infocard";
import SalesOverTimeInfoCard from "@/components/app/sales-over-time-infocard";

// app/(app)/dashboard/page.tsx
export default function DashboardPage() {
  return (
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
  );
}

"use client";

import ProductivityInsights from "../Components/ProductivityInsights"; // adjust path if needed

export default function ProductivityInsightsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chart View Tasks</h1>
      <ProductivityInsights />
    </div>
  );
}

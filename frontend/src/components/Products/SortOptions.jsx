import React from "react";
import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  const handleChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full sm:w-auto mb-4 sm:mb-0">
      <label className="text-sm font-medium mr-2">Sort By:</label>
      <select
        value={sortBy}
        onChange={handleChange}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
      >
        <option value="">Select</option>
        <option value="priceLowHigh">Price: Low to High</option>
        <option value="priceHighLow">Price: High to Low</option>
        <option value="newest">Newest Arrivals</option>
      </select>
    </div>
  );
};

export default SortOptions;

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [Filter, setFilter] = useState({
    categories: searchParams.getAll("category") || [],
    materials: searchParams.getAll("material") || [],
    deities: searchParams.getAll("deity") || [],
    availability: searchParams.getAll("availability") || [],
    rating: searchParams.get("rating") || "",
    ecoFriendly: searchParams.get("ecoFriendly") === "true",
    sortBy: searchParams.get("sortBy") || "relevance",
    minPrice: parseInt(searchParams.get("minPrice")) || 0,
    maxPrice: parseInt(searchParams.get("maxPrice")) || 10000,
  });

  const categories = ["Gifts", "Arts", "Handcrafted Decor", "DIY & Craft Kits"];
  const materials = ["Wood", "Brass", "Terracotta", "Eco-friendly Materials", "Metal"];
  const deities = ["Ganesha", "Lakshmi", "Hanuman", "Krishna", "Rama"];
  const availabilities = ["inStock", "preOrder"];
  const ratings = [5, 4, 3, 2, 1];


  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    Filter.categories.forEach((c) => params.append("category", c));
    Filter.materials.forEach((m) => params.append("material", m));
    Filter.deities.forEach((d) => params.append("deity", d));
    Filter.availability.forEach((a) => params.append("availability", a));
    if (Filter.rating) params.set("rating", Filter.rating);
    if (Filter.ecoFriendly) params.set("ecoFriendly", "true");
    params.set("minPrice", Filter.minPrice);
    params.set("maxPrice", Filter.maxPrice);
    params.set("sortBy", Filter.sortBy);
    setSearchParams(params);
  }, [Filter]);

  const toggleCheckbox = (key, value) => {
    setFilter((prev) => {
      const exists = prev[key].includes(value);
      const updated = exists
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value];
      return { ...prev, [key]: updated };
    });
  };

  const handleRatingChange = (e) => {
    setFilter((prev) => ({ ...prev, rating: e.target.value }));
  };

  const handleEcoToggle = () => {
    setFilter((prev) => ({ ...prev, ecoFriendly: !prev.ecoFriendly }));
  };

  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value) || 0;
    setFilter((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const resetFilters = () => {
    setFilter({
      categories: [],
      materials: [],
      deities: [],
      availability: [],
      rating: "",
      ecoFriendly: false,
      minPrice: 0,
      maxPrice: 10000,
    });
    setSearchParams({});
  };

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2 text-sm">
      <h2 className="text-xl font-semibold text-indigo-700 mb-3">Filters</h2>

      {/* CATEGORY */}
      <div className="border-b pb-3">
        <p className="font-medium mb-2">Category</p>
        {categories.map((c) => (
          <label key={c} className="block">
            <input
              type="checkbox"
              checked={Filter.categories.includes(c)}
              onChange={() => toggleCheckbox("categories", c)}
              className="mr-2"
            />
            {c}
          </label>
        ))}
      </div>

      {/* MATERIAL */}
      <div className="border-b pb-3">
        <p className="font-medium mb-2">Material</p>
        {materials.map((m) => (
          <label key={m} className="block">
            <input
              type="checkbox"
              checked={Filter.materials.includes(m)}
              onChange={() => toggleCheckbox("materials", m)}
              className="mr-2"
            />
            {m}
          </label>
        ))}
      </div>

      {/* DEITY */}
      <div className="border-b pb-3">
        <p className="font-medium mb-2">Deity</p>
        {deities.map((d) => (
          <label key={d} className="block">
            <input
              type="checkbox"
              checked={Filter.deities.includes(d)}
              onChange={() => toggleCheckbox("deities", d)}
              className="mr-2"
            />
            {d}
          </label>
        ))}
      </div>

      {/* AVAILABILITY */}
      <div className="border-b pb-3">
        <p className="font-medium mb-2">Availability</p>
        {availabilities.map((a) => (
          <label key={a} className="block">
            <input
              type="checkbox"
              checked={Filter.availability.includes(a)}
              onChange={() => toggleCheckbox("availability", a)}
              className="mr-2"
            />
            {a === "inStock" ? "In Stock" : "Pre-order"}
          </label>
        ))}
      </div>

      {/* RATING */}
      <div className="border-b pb-3">
        <label className="block font-medium mb-2">Minimum Rating</label>
        <select
          value={Filter.rating}
          onChange={handleRatingChange}
          className="w-full border p-2 rounded"
        >
          <option value="">All</option>
          {ratings.map((r) => (
            <option key={r} value={r}>
              {r}★ & up
            </option>
          ))}
        </select>
      </div>

      {/* ECO-FRIENDLY */}
      <div className="border-b pb-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={Filter.ecoFriendly}
            onChange={handleEcoToggle}
          />
          Eco-Friendly Only
        </label>
      </div>

      {/* PRICE RANGE */}
      <div className="border-b pb-3">
        <p className="font-medium mb-2">Price Range (₹)</p>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            value={Filter.minPrice}
            onChange={(e) => handlePriceChange(e, "minPrice")}
            className="w-1/2 border p-1 rounded"
            placeholder="Min"
          />
          <input
            type="number"
            min="0"
            value={Filter.maxPrice}
            onChange={(e) => handlePriceChange(e, "maxPrice")}
            className="w-1/2 border p-1 rounded"
            placeholder="Max"
          />
        </div>
      </div>

      

      {/* RESET BUTTON */}
      <div className="pt-2">
        <button
          onClick={resetFilters}
          className="text-sm text-red-600 underline hover:text-red-800"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;

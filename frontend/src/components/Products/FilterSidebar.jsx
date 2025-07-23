import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const defaultFilter = {
  category: [],
  material: [],
  collections: [],
  color: [],
  ratingMin: "",
  ecoFriendly: false,
  sort: "relevance",
  priceMin: 0,
  priceMax: 10000,
};

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [Filter, setFilter] = useState({
    category: searchParams.getAll("category") || [],
    material: searchParams.getAll("material") || [],
    collections: searchParams.getAll("collections") || [],
    color: searchParams.getAll("color") || [],
    ratingMin: searchParams.get("ratingMin") || "",
    ecoFriendly: searchParams.get("ecoFriendly") === "true",
    sort: searchParams.get("sort") || "relevance",
    priceMin: parseInt(searchParams.get("priceMin")) || 0,
    priceMax: parseInt(searchParams.get("priceMax")) || 10000,
  });


  const materials = ["Wood", "Brass", "Terracotta", "Eco-friendly Materials", "Metal"];
  const colors = ["Brown", "Terracotta", "Multicolor", "Black", "White"];
  const collections = ["Arts", "Gifts", "Home Decor", "DIY"];
  const ratings = [5, 4, 3, 2, 1];

  useEffect(() => {
    const params = new URLSearchParams();
    Filter.material.forEach((m) => params.append("material", m));
    Filter.collections.forEach((col) => params.append("collections", col));
    Filter.color.forEach((clr) => params.append("color", clr));
    if (Filter.ratingMin) params.set("ratingMin", Filter.ratingMin);
    if (Filter.ecoFriendly) params.set("ecoFriendly", "true");
    params.set("priceMin", Filter.priceMin);
    params.set("priceMax", Filter.priceMax);
    params.set("sort", Filter.sort);
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
    setFilter((prev) => ({ ...prev, ratingMin: e.target.value }));
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
    setFilter(defaultFilter);
    setSearchParams({});
  };

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2 text-sm">
      <h2 className="text-xl font-semibold text-indigo-700 mb-3">Filters</h2>

      {/* COLLECTIONS */}
      <div className="border-b pb-3">
        <p className="font-medium mb-2">Collections</p>
        {collections.map((col) => (
          <label key={col} className="block">
            <input
              type="checkbox"
              checked={Filter.collections.includes(col)}
              onChange={() => toggleCheckbox("collections", col)}
              className="mr-2"
            />
            {col}
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
              checked={Filter.material.includes(m)}
              onChange={() => toggleCheckbox("material", m)}
              className="mr-2"
            />
            {m}
          </label>
        ))}
      </div>

      {/* COLOR */}
      <div className="border-b pb-3">
        <p className="font-medium mb-2">Color</p>
        {colors.map((clr) => (
          <label key={clr} className="block">
            <input
              type="checkbox"
              checked={Filter.color.includes(clr)}
              onChange={() => toggleCheckbox("color", clr)}
              className="mr-2"
            />
            {clr}
          </label>
        ))}
      </div>

      {/* RATING */}
      <div className="border-b pb-3">
        <label className="block font-medium mb-2">Minimum Rating</label>
        <select
          value={Filter.ratingMin}
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
            value={Filter.priceMin}
            onChange={(e) => handlePriceChange(e, "priceMin")}
            className="w-1/2 border p-1 rounded"
            placeholder="Min"
          />
          <input
            type="number"
            min="0"
            value={Filter.priceMax}
            onChange={(e) => handlePriceChange(e, "priceMax")}
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

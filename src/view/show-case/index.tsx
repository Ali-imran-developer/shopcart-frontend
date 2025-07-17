import { useEffect, useRef, useState } from "react";
import ProductModernCard from "./product-card";
import { routes } from "@/config/routes";
import { useAppSelector } from "@/hooks/store-hook";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { useCategories } from "@/hooks/categories";
import { useResaleProduct } from "@/hooks/resale-hook";
import { Loading } from "@/components/shared/loader";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import { Input, Text } from "rizzui";

export default function ShowCase() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { getPublicCategories } = useCategories();
  const { getAllResaleProducts, isLoading } = useResaleProduct();
  const { allResellerData } = useAppSelector((state) => state?.ResaleProducts);
  const [publicCategories, setPublicCategories] = useState<{ name: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  useEffect(() => {
    getPublicCategories()?.then((categories) => {
      setPublicCategories(ensureArray(categories?.categories)as any)
    });
    getAllResaleProducts();
    getPublicCategories();
  }, []);

  const filteredData = ensureArray(allResellerData?.data)?.filter((product) => {
    const lowerQuery = searchQuery.toLowerCase();
    const matchesName = product?.product?.name?.toLowerCase().includes(lowerQuery);
    const matchesCategory = selectedCategory === "All" || product?.resale?.category === selectedCategory;
    return matchesName && matchesCategory;
  });

  return (
    <div className="@container px-4 py-2">
      <div className="flex items-center mb-10">
        <Text className="font-semibold text-2xl text-black w-60">Search Products</Text>
        <Input
          onChange={(e) => setSearchQuery(e?.target?.value)}
          value={searchQuery}
          className="max-w-full w-full"
          type="search"
          placeholder="Enter Product Name"
        />
      </div>
    <div className="relative mb-8">
      <button onClick={scrollLeft} className="absolute left-0 top-1/3 -translate-y-1/2 z-10 bg-white dark:bg-black p-2 rounded-full shadow-md">
        <PiArrowLeft size={20} />
      </button>

      <div ref={scrollRef} className="flex overflow-x-auto gap-4 no-scrollbar px-8 scroll-smooth">
        {ensureArray(publicCategories)?.map((category, index) => (
          <div key={index} className="flex flex-col items-center gap-2 flex-shrink-0 w-24">
            <div onClick={() => setSelectedCategory(category?.name)} className={`w-20 h-20 flex items-center justify-center rounded-full border cursor-pointer
              ${selectedCategory === category?.name ? "border-blue-500" : "border-gray-300"}`}>
                <img src={category?.image ?? ""} alt={category?.name} className="w-19 h-19 rounded-full" />
            </div>
            <span className="text-gray-600 text-sm font-semibold text-center">
              {category?.name}
            </span>
          </div>
        ))}
      </div>

      <button onClick={scrollRight} className="absolute right-0 top-1/3 -translate-y-1/2 z-10 bg-white dark:bg-black p-2 rounded-full shadow-md">
        <PiArrowRight size={20} />
      </button>
    </div>

      {isLoading ? (
        <Loading />
      ) : filteredData?.length > 0 ? (
        <ProductModernCard
          product={filteredData}
          routes={routes}
        />
      ) : (
        <p className="text-center text-gray-500 text-sm mt-8">
          No selected category matched product available.
        </p>
      )}
    </div>
  );
}

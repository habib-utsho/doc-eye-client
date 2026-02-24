"use client";

import useDebounce from "@/src/hooks/useDebounce";
import { Input } from "@heroui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SpecialtySearchInp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || "",
  );
  const debounceSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debounceSearch) {
      params.set("searchTerm", debounceSearch);
    } else {
      params.delete("searchTerm");
    }
    router.push(`?${params.toString()}`);
  }, [debounceSearch, router, searchParams]);

  return (
    <div>
      <Input
        name="search"
        startContent={<SearchIcon />}
        placeholder="Search specialties..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        isClearable
        onClear={() => setSearchTerm("")}
        className="w-[320px]"
      />
    </div>
  );
};

export default SpecialtySearchInp;

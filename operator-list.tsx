"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OperatorCard } from "./operator-card";
import type { Operator } from "@/lib/types";

interface OperatorListProps {
  operators: Operator[];
}

export function OperatorList({ operators }: OperatorListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("rating_desc");

  const filteredAndSortedOperators = useMemo(() => {
    let filtered = operators.filter((operator) =>
      operator.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
        const getAvgRating = (op: Operator) => {
            const totalReviews = op.reviews.length;
            if (totalReviews === 0) return 0;
            return op.reviews.reduce((acc, rev) => acc + rev.ratings.overall, 0) / totalReviews;
        };

        switch (sortOrder) {
            case 'name_asc':
                return a.name.localeCompare(b.name);
            case 'name_desc':
                return b.name.localeCompare(a.name);
            case 'rating_desc':
                return getAvgRating(b) - getAvgRating(a);
            case 'rating_asc':
                return getAvgRating(a) - getAvgRating(b);
            default:
                return 0;
        }
    });
  }, [operators, searchTerm, sortOrder]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Input
            placeholder="Search operators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-muted-foreground"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
            <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="rating_desc">Rating: High to Low</SelectItem>
                <SelectItem value="rating_asc">Rating: Low to High</SelectItem>
                <SelectItem value="name_asc">Name: A to Z</SelectItem>
                <SelectItem value="name_desc">Name: Z to A</SelectItem>
            </SelectContent>
            </Select>
        </div>
      </div>
      {filteredAndSortedOperators.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedOperators.map((operator) => (
            <OperatorCard key={operator.id} operator={operator} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <h3 className="text-xl font-semibold">No Operators Found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
}

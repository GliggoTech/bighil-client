"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ChevronsLeftRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PaginationControls({ currentPage, totalPages }) {
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const generatePaginationRange = () => {
    const range = [];
    const maxVisiblePages = 5;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        range.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        range.push("...");
      }
    }

    if (start > 1) range.unshift("...");
    if (end < totalPages) range.push("...");

    return range;
  };

  if (totalPages <= 0) return null;

  return (
    <div className="flex flex-col gap-4 w-full sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 gap-1 px-2.5",
            !hasPreviousPage && "opacity-50 pointer-events-none"
          )}
          asChild={hasPreviousPage}
        >
          <Link
            href={`?page=1`}
            aria-label="First page"
            className="max-sm:hidden"
          >
            <ChevronsLeftRight className="w-4 h-4 -mr-1" />
            First
          </Link>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 w-8 p-0",
            !hasPreviousPage && "opacity-50 pointer-events-none"
          )}
          asChild={hasPreviousPage}
        >
          <Link href={`?page=${currentPage - 1}`} aria-label="Previous page">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>

        <div className="flex items-center gap-1.5">
          {generatePaginationRange().map((page, index) =>
            page === "..." ? (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0"
                disabled
              >
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </Button>
            ) : (
              <Button
                key={index}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                className={cn(
                  "h-8 min-w-8 px-2 hidden sm:inline-flex",
                  page === currentPage && "font-bold"
                )}
                asChild={page !== currentPage}
              >
                {page === currentPage ? (
                  <span>{page}</span>
                ) : (
                  <Link href={`?page=${page}`} aria-label={`Page ${page}`}>
                    {page}
                  </Link>
                )}
              </Button>
            )
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 w-8 p-0",
            !hasNextPage && "opacity-50 pointer-events-none"
          )}
          asChild={hasNextPage}
        >
          <Link href={`?page=${currentPage + 1}`} aria-label="Next page">
            <ChevronRight className="w-4 h-4" />
          </Link>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 gap-1 px-2.5",
            !hasNextPage && "opacity-50 pointer-events-none"
          )}
          asChild={hasNextPage}
        >
          <Link
            href={`?page=${totalPages}`}
            aria-label="Last page"
            className="max-sm:hidden"
          >
            Last
            <ChevronsLeftRight className="w-4 h-4 -ml-1" />
          </Link>
        </Button>
      </div>

      <div className="text-sm font-medium text-muted-foreground text-center sm:text-right">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}

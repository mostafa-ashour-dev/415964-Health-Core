"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type GridProps<T> = {
  data?: T[];
  cols?: number;
  gap?: number;
  maxItems?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  scrollable?: boolean;
  scrollDir?: "vertical" | "horizontal";
  footer?: {
    text: string;
    href: string;
  };
  className?: string;
  loading?: boolean;
  loadingComponent?: React.ReactNode | React.ReactElement | React.JSX.Element;
  hideFooter?: boolean;
  scrollFit?: boolean;
};

const columnsOptions = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const gapOptions = {
  2: "gap-2",
  4: "gap-4",
  5: "gap-6",
  6: "gap-8",
};

export default function GridContainer<T>({
  data,
  cols = 3,
  gap = 4,
  maxItems,
  renderItem,
  scrollable,
  footer,
  className = "",
  loading = false,
  loadingComponent = <span>Loading...</span>,
  hideFooter,
  scrollDir = "horizontal",
  scrollFit = false,
}: GridProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerFit, setContainerFit] = useState<number | undefined>(
    undefined,
  );

  const visibleData = useMemo(() => {
    if (!maxItems) return data;
    return data?.slice(0, maxItems);
  }, [data, maxItems]);

  useEffect(() => {
    if (containerRef.current) {
      if (scrollDir === "vertical") {
        const tallestItem = Array.from(containerRef.current.children).reduce(
          (maxHeight, child) =>
            Math.max(maxHeight, (child as HTMLElement).offsetHeight),
          0,
        );
        setContainerFit(tallestItem);
      } else if (scrollDir === "horizontal") {
        const widestItem = Array.from(containerRef.current.children).reduce(
          (maxWidth, child) =>
            Math.max(maxWidth, (child as HTMLElement).offsetWidth),
          0,
        );
        setContainerFit(widestItem);
      }
    }
  }, [visibleData, scrollDir]);

  return (
    <div className="flex flex-col gap-[2rem]">
      <>
        <div
          ref={containerRef}
          style={{
            maxHeight:
              scrollDir === "vertical" && scrollFit ? containerFit : undefined,
            overflowY:
              scrollDir === "vertical" && scrollFit ? "auto" : undefined,
            overflowX:
              scrollDir === "horizontal" && scrollFit ? "auto" : undefined,
            maxWidth:
              scrollDir === "horizontal" && scrollFit ? "100%" : undefined,
          }}
          className={`
          w-full overflow-x-auto grid
          ${
            scrollable
              ? scrollDir === "horizontal"
                ? "grid-flow-col auto-cols-min"
                : "auto-rows-min " +
                  columnsOptions[cols as keyof typeof columnsOptions]
              : columnsOptions[cols as keyof typeof columnsOptions]
          }
          ${gapOptions[gap as keyof typeof gapOptions]}
          ${className}
          relative
        `}
        >
          {data?.length === 0 && !loading && (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              There is no data
            </span>
          )}
          {loading && loadingComponent}
          {visibleData?.map((item, index) => renderItem(item, index))}
        </div>

        {data && maxItems && !hideFooter && data.length > maxItems && (
          <a href={footer?.href || ""} className="place-self-center">
            {footer
              ? footer.text
              : `View ${data.length - visibleData!.length} more`}
          </a>
        )}
      </>
    </div>
  );
}

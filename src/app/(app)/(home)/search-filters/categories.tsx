"use client";

import { Button } from "@/components/ui/button";
import { ListFilterIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { useRef, useState, useEffect } from "react";

import { CategoryDropdown } from "./category-dropdown";
import { CategoriesSidebar } from "./categories-sidebar";
import { CategoriesGetManyOutput } from "@/modules/categories/types";



interface Props {
    data:CategoriesGetManyOutput;
};

export const Categories =({data}:Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const viewAllRef = useRef<HTMLDivElement>(null);

    const [visibleCount, setVisibileCount] = useState(data.length);
    const [isAnyHovered, setIsAnyHovered] = useState(false);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    const activeCategory = "all";

    const activeCategoryIndex = data.findIndex((cat) => cat.slug ===activeCategory);
    const isActiveCategoryHidden = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

    useEffect ( () => {
        const calculatevisible =() => {
            if (!containerRef.current || !measureRef.current || !viewAllRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const viewAllWidth = viewAllRef.current.offsetWidth;
            const availablewidth = containerWidth -viewAllWidth

            const items = Array.from(measureRef.current.children);
            let totalWidth = 0;
            let visible = 0;

            for (const item of items) {
                const width = item.getBoundingClientRect().width;

                if(totalWidth + width > availablewidth) break;
                totalWidth += width;
                visible++;
            }
            setVisibileCount(visible);
        };
        const resizeObserver = new ResizeObserver(calculatevisible);
        resizeObserver.observe(containerRef.current!);

        return () => resizeObserver.disconnect();
    }, [data.length]);


    return (

        <div className=" relative w-full">
            {/* Categories SideBar*/}
            <CategoriesSidebar open={isSideBarOpen} onOpenChange={setIsSideBarOpen} />


        {/*invisible div to measure items */}
            <div
            ref={measureRef}
            className="absolute opacity-0 pointer-events-none flex"
            style={{ position: "fixed", top:-9999, left: -9999}}>
            {/* don't use display none because it will mess up the calculations*/}
                {data.map((category) => (
                    <div key={category.id}>
                        <CategoryDropdown
                        category={category}
                        isActive={activeCategory === category.slug}
                        isNavigationHovered={false}
                        />
                    </div>
                ))}
            </div>

        {/*Visible Items*/ }
            <div
            ref={containerRef}
            className="flex flex-nowrap items-center"
            onMouseEnter={() => setIsAnyHovered(true)}
            onMouseLeave={() => setIsAnyHovered(false)}
            >
                {data.slice(0, visibleCount).map((category) => (
                    <div key={category.id}>
                        <CategoryDropdown
                        category={category}
                        isActive={activeCategory === category.slug}
                        isNavigationHovered={isAnyHovered}
                        />
                    </div>
                ))}

                <div
                ref={viewAllRef}
                className="shrink-0">
                    <Button
                    className={cn(
                    "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
                    isActiveCategoryHidden && !isAnyHovered && "bg-white border-primary",)}
                    onClick ={() => setIsSideBarOpen(true)}
                    >
                        View all
                        <ListFilterIcon className="ml-2"/>
                    </Button>
                </div>
            </div>
        </div>
    );
};
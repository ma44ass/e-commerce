"use client";

import { RefObject } from "react";

export const useDropdownPosition = (ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>) => {
    const getDropDownPosition = () => {
        if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240; // Width of dropdown (w-60 = 15rem = 240px)

    // Position directly under the category element
    const left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    // Safety checks to ensure dropdown stays within viewport
    const adjustedLeft = Math.max(16, Math.min(left, window.innerWidth - dropdownWidth - 16));

        return { top, left: adjustedLeft };
    };

    return { getDropDownPosition };
};
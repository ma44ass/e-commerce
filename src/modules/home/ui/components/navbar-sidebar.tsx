import Link from "next/link";

import {
Sheet,
SheetContent,
SheetHeader,
SheetTitle,
} from "@/components/ui/sheet"

import { ScrollArea } from "@/components/ui/scroll-area"
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";


interface NavbarItem {
    href: string;
    children: React.ReactNode;
}

interface Props {
    items: NavbarItem[];
    open:boolean;
    onOpenChange: (open: boolean) =>void;
}

export const NavbarSidebar = ({items, open, onOpenChange}:Props) => {
        const trpc =useTRPC();
        const session = useQuery(trpc.auth.session.queryOptions());
    return (
        <Sheet
        open={open}
        onOpenChange={onOpenChange}>
            <SheetContent
            side="left"
            className="p-0 transition-none"
            >
                <SheetHeader className="p-4">
                        <SheetTitle>
                            Menu
                        </SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {session.data?.user ? (
                            <div className="border-t">
                                <Link
                                    onClick={() => onOpenChange(false)}
                                    href="/admin"
                                    className="w-full text-left p-4  hover:bg-pink-400 hover:text-white flex items-center text-base font-medium">Dashboard
                                    </Link>
                                <Link
                                    onClick={() => onOpenChange(false)}
                                    href="/library"
                                    className="w-full text-left p-4  hover:bg-pink-400 hover:text-white flex items-center text-base font-medium">Library
                                    </Link>
                            </div>
                            ) : (
                            <div className="border-b">
                                <Link
                                onClick={() => onOpenChange(false)}
                                href="/sign-in"
                                className="w-full text-left p-4  hover:bg-pink-400 hover:text-white flex items-center text-base font-medium">Log in
                                </Link>
                                <Link
                                onClick={() => onOpenChange(false)}
                                href="/sign-up"
                                className="w-full text-left p-4  hover:bg-pink-400 hover:text-white flex items-center text-base font-medium">Start selling
                                </Link>
                            </div>
                        )
                        }
                        <div className="border-t">
                            {items.map((item) => (
                        <Link
                        onClick={()=>onOpenChange(false)}
                        className="w-full text-left p-4 hover:bg-black hover:text-white flex items items-center text-base font-medium"
                        key={item.href}
                        href={item.href}>
                            {item.children}
                        </Link>
                    ))}
                    </div>

                    

                </ScrollArea>
            </SheetContent>
        </Sheet>
    );

};
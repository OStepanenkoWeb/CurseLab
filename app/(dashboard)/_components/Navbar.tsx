import React from 'react';
import MobileSidebar from "@/app/(dashboard)/_components/MobileSidebar";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import Sidebar from "@/app/(dashboard)/_components/Sidebar";
import NavbarRoutes from "@/components/NavbarRoutes";

const Navbar = () => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <MobileSidebar/>
            <NavbarRoutes/>
        </div>
    );
};

export default Navbar;
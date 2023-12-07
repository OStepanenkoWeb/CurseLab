'use client'
import React from 'react';
import {BarChart, Compass, Layout, List} from "lucide-react";
import SidebarItem from "@/app/(dashboard)/_components/SidebarItem";
import {usePathname} from "next/navigation";

const guestRoutes = [
    {
        icon: Layout,
        label: "Панель управления",
        href: "/"
    },
    {
        icon: Compass,
        label: "Обзор курсов",
        href: "/search"
    }
]

const teacherRoutes = [
    {
        icon: List,
        label: "Курсы",
        href: "/teacher/courses"
    },
    {
        icon: BarChart,
        label: "Аналитика",
        href: "/teacher/analytics"
    }
]

const SidebarRoutes = () => {
    const pathname = usePathname()

    const isTeacherPage = pathname?.startsWith("/teacher")

    const routes = isTeacherPage ? teacherRoutes : guestRoutes

    return (
        <div className="flex flex-col w-full">
            {
                routes.map((route) => (
                    <SidebarItem
                        key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                ))
            }
        </div>
    );
};

export default SidebarRoutes;
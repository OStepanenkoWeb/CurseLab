"use client";

import { Category } from "@prisma/client";
import {
    FcEngineering,
    FcFilmReel,
    FcMultipleDevices,
    FcMusic,
    FcOldTimeCamera,
    FcSalesPerformance,
    FcSportsMode
} from "react-icons/fc";
import { IconType } from "react-icons";
import CategoryItem from "./CategoryItem";

interface ICategoriesProps {
    items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
    "Музыка": FcMusic,
    "Фотография": FcOldTimeCamera,
    "Фитнесс": FcSportsMode,
    "Бухгалтерский учет": FcSalesPerformance,
    "Компьютер и информатика": FcMultipleDevices,
    "Блогинг": FcFilmReel,
    "Инженерия": FcEngineering,
};

export const Categories = ({ items }: ICategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    )
}
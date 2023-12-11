"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import ConfirmModal from "@/components/modals/ConfirmModal";

interface IActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
};

const Actions = ({ disabled, isPublished, courseId }: IActionsProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/unpublish`);
                toast.success("Курс не опубликован");
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`);
                toast.success("Курс опубликован");
                confetti.onOpen();
            }

            router.refresh();
        } catch {
            toast.error("Что то пошло не так");
        } finally {
            setIsLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/courses/${courseId}`);

            toast.success("Курс удален");
            router.refresh();
            router.push(`/teacher/courses`);
        } catch {
            toast.error("Что то пошло не так");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "Не опубликован" : "Опубликован"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    )
}

export default Actions
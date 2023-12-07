"use client"
import * as z from "zod"
import axios from "axios"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"

import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import toast from "react-hot-toast";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Pencil} from "lucide-react";

interface ITitleForm {
    initialData: {
        title: string,
        id: string
    }
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Название курса обязательно"
    })
})

const TitleForm = ({ initialData }:ITitleForm) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const {isSubmitting, isValid} = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
        try {
            const response = await axios.post(`/api/courses/${initialData.id}`, values);

            toast.success("Курс обновлен");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Что то пошло не так");
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Название курса
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Отмена</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Редактировать
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className="text-sm mt-2">
                    {initialData.title}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="Продвинутая веб разработка"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Сохранить
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
};

export default TitleForm;
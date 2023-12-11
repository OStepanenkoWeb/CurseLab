"use client"
import * as z from "zod"
import {undefined} from "zod"
import axios from "axios"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"
import Link from "next/link";
import toast from "react-hot-toast";

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {useRouter} from "next/navigation";


const formSchema = z.object({
    title: z.string().min(1, {
        message: "Название курса обязательно"
    })
})

const CreateCoursePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    })

    const {isSubmitting, isValid} = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
        try {
            const response = await axios.post("/api/courses", values);
            console.log(response.data)
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success("Курс создан");
        } catch {
            toast.error("Что то пошло не так");
        }
    }
    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">
                    Название вашего курса
                </h1>
                <p className="text-sm text-slate-600">
                    Как вы хотите назвать свой курс? Вы сможете изменить его позже.
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Название курса
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="Продвинутая веб разработка"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Чему вы хотите научить в этом курсе?
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button
                                    type="button"
                                    variant="ghost"
                                >
                                    Закрыть
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                Продолжить
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

        </div>
    );
};

export default CreateCoursePage;
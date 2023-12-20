import {redirect} from "next/navigation";
import {auth} from "@clerk/nextjs";
import {BadgeRussianRubleIcon, CircleDollarSign, File, LayoutDashboard, ListChecks} from "lucide-react";

import {db} from "@/lib/db";
import {IconBadge} from "@/components/IconBadge";
import TitleForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/TitleForm";
import DescriptionForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/DescriptionForm";
import {ImageForm} from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/ImageForm";
import ChaptersForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/ChaptersForm";
import {CategoryForm} from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/CategoryForm";
import {Attachment, Chapter, Course} from "@prisma/client";
import PriceForm from "./_components/PriceForm";
import {AttachmentForm} from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/AttachmentForm";
import Actions from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/Actions";
import {Banner} from "@/components/Banner";

interface ICourseIdPage {
    params: {
        courseId: string
    }
}

const Page = async ({ params }:ICourseIdPage) => {
    const { userId } = auth()

    if(!userId) {
        return redirect("/")
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc",
                },
            },
            attachments: {
                orderBy: {
                    createdAt: "desc",
                },
            }
        }
    }) as Course & { chapters: Chapter[], attachments: Attachment[] }

    if(!course) {
        return redirect("/")
    }

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished),
    ]

    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length

    console.log(completedFields, totalFields)
    const completionText = `(${completedFields}/${totalFields})`

    const isComplete = requiredFields.every(Boolean);

    return (
        <>
            {!course.isPublished && (
                <Banner
                    label="Этот курс не опубликован. Студенты не смогут его увидеть."
                />
            )}
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">
                            Создание курса
                        </h1>
                        <span className="text-sm text-slate-700">
                        Заполните все поля {completionText}
                    </span>
                    </div>
                    <Actions
                        disabled={!isComplete}
                        courseId={params.courseId}
                        isPublished={course.isPublished}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard}/>
                            <h2 className="text-xl">
                                Настройте свой курс
                            </h2>
                        </div>
                        <TitleForm
                            initialData={course}
                        />
                        <DescriptionForm
                            initialData={course}
                        />
                        <ImageForm
                            initialData={course}
                        />
                        <CategoryForm
                            initialData={course}
                            options={categories.map((category) => ({
                                label: category.name,
                                value: category.id,
                            }))}
                        />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={ListChecks}/>
                                <h2 className="text-xl">
                                    Главы курса
                                </h2>
                            </div>
                            <ChaptersForm
                                initialData={course}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={BadgeRussianRubleIcon}/>
                                <h2 className="text-xl">
                                    Стоимость
                                </h2>
                            </div>
                            <PriceForm
                                initialData={course}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={File}/>
                                <h2 className="text-xl">
                                    Ресурсы и вложения
                                </h2>
                            </div>
                            <AttachmentForm
                                initialData={course}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
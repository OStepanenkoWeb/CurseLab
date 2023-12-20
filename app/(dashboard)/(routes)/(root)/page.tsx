import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import InfoCard from "@/app/(dashboard)/(routes)/(root)/_components/InfoCard";
import CoursesList from "@/components/CoursesList";



export default async function Dashboard() {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const {
        completedCourses,
        coursesInProgress
    } = await getDashboardCourses(userId);

    return (
        <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard
                    icon={Clock}
                    label="В процессе"
                    numberOfItems={coursesInProgress.length}
                />
                <InfoCard
                    icon={CheckCircle}
                    label="Завершено"
                    numberOfItems={completedCourses.length}
                    variant="success"
                />
            </div>
            <CoursesList
                items={[...coursesInProgress, ...completedCourses]}
            />
        </div>
    )
}
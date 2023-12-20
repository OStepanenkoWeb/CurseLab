import {DataTable} from "@/app/(dashboard)/(routes)/teacher/courses/_components/DataTable";
import Columns from "@/app/(dashboard)/(routes)/teacher/courses/_components/Columns";
import { db } from "@/lib/db";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";

const CoursesPage = async () => {

    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const courses = await db.course.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="p-6">
            <DataTable columns={Columns} data={courses}/>
        </div>
    );
};

export default CoursesPage;
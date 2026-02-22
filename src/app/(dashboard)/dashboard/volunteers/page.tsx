import prisma from "@/db/db.config";
import { Users } from "lucide-react";
import VolunteersTable from "@/app/(dashboard)/_components/VolunteersTable";

export default async function VolunteersPage() {
    const volunteers = await prisma.volunteer.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Volunteers</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {volunteers.length} registered volunteer{volunteers.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <div className="rounded-xl bg-green-50 p-3">
                    <Users className="h-6 w-6 text-green-700" />
                </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <VolunteersTable volunteers={volunteers} />
            </div>
        </div>
    );
}

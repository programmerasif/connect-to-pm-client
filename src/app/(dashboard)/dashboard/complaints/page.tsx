import prisma from "@/db/db.config";
import { MessageSquareWarning } from "lucide-react";
import ComplaintsTable from "@/app/(dashboard)/_components/ComplaintsTable";

export default async function ComplaintsPage() {
    const complaints = await prisma.complaint.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Complaints</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {complaints.length} total complaint{complaints.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <div className="rounded-xl bg-red-50 p-3">
                    <MessageSquareWarning className="h-6 w-6 text-red-500" />
                </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <ComplaintsTable complaints={complaints} />
            </div>
        </div>
    );
}

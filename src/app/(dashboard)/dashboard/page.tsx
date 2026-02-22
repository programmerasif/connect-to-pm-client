
import prisma from "@/db/db.config";
import { MessageSquareWarning, Users, Clock } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const [totalComplaints, totalVolunteers, recentComplaints, recentVolunteers] =
    await Promise.all([
      prisma.complaint.count(),
      prisma.volunteer.count(),
      prisma.complaint.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, name: true, message: true, createdAt: true },
      }),
      prisma.volunteer.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, name: true, email: true, createdAt: true },
      }),
    ]);

    console.log(totalComplaints, totalVolunteers, recentComplaints, recentVolunteers)
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back. Here&apos;s what&apos;s happening.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Link
          href="/dashboard/complaints"
          className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Complaints
              </p>
              <p className="mt-1 text-4xl font-bold text-gray-900">
                {totalComplaints}
              </p>
            </div>
            <div className="rounded-xl bg-red-50 p-3">
              <MessageSquareWarning className="h-7 w-7 text-red-500" />
            </div>
          </div>
          <p className="mt-4 text-xs font-medium text-green-700 group-hover:underline">
            View all complaints →
          </p>
        </Link>

        <Link
          href="/dashboard/volunteers"
          className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Volunteers
              </p>
              <p className="mt-1 text-4xl font-bold text-gray-900">
                {totalVolunteers}
              </p>
            </div>
            <div className="rounded-xl bg-green-50 p-3">
              <Users className="h-7 w-7 text-green-700" />
            </div>
          </div>
          <p className="mt-4 text-xs font-medium text-green-700 group-hover:underline">
            View all volunteers →
          </p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Complaints */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 className="font-semibold text-gray-900">Recent Complaints</h2>
            <Link
              href="/dashboard/complaints"
              className="text-xs font-medium text-green-700 hover:underline"
            >
              See all
            </Link>
          </div>
          <ul className="divide-y divide-gray-50">
            {recentComplaints.length === 0 && (
              <li className="px-6 py-8 text-center text-sm text-gray-400">
                No complaints yet.
              </li>
            )}
            {recentComplaints.map((c) => (
              <li key={c.id} className="px-6 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {c.name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-gray-500">
                      {c.message}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1 text-xs text-gray-400">
                    <Clock size={12} />
                    {new Date(c.createdAt).toLocaleDateString("en-GB")}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Volunteers */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 className="font-semibold text-gray-900">Recent Volunteers</h2>
            <Link
              href="/dashboard/volunteers"
              className="text-xs font-medium text-green-700 hover:underline"
            >
              See all
            </Link>
          </div>
          <ul className="divide-y divide-gray-50">
            {recentVolunteers.length === 0 && (
              <li className="px-6 py-8 text-center text-sm text-gray-400">
                No volunteers yet.
              </li>
            )}
            {recentVolunteers.map((v) => (
              <li key={v.id} className="flex items-center gap-4 px-6 py-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  {v.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {v.name}
                  </p>
                  <p className="truncate text-xs text-gray-500">{v.email}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1 text-xs text-gray-400">
                  <Clock size={12} />
                  {new Date(v.createdAt).toLocaleDateString("en-GB")}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
import type { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            {/* Offset content for desktop sidebar */}
            <main className="md:pl-60">
                <div className="px-4 py-8 md:px-8">{children}</div>
            </main>
        </div>
    );
}

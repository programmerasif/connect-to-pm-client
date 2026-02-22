"use client";

import { useState } from "react";
import { X, MessageSquareWarning } from "lucide-react";

type Complaint = {
    id: string;
    name: string;
    email: string | null;
    number: string;
    address: string;
    message: string;
    createdAt: Date;
};

export default function ComplaintsTable({ complaints }: { complaints: Complaint[] }) {
    const [selected, setSelected] = useState<Complaint | null>(null);

    return (
        <>
            {complaints.length === 0 ? (
                <div className="px-6 py-16 text-center">
                    <MessageSquareWarning className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                    <p className="text-sm text-gray-500">No complaints submitted yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-175 text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Address</th>
                                <th className="px-6 py-4">Message</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {complaints.map((c, index) => (
                                <tr key={c.id} className="transition-colors hover:bg-gray-50/60">
                                    <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900">{c.name}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-gray-700">{c.number}</p>
                                        {c.email && (
                                            <p className="mt-0.5 text-xs text-gray-400">{c.email}</p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="max-w-40 truncate text-gray-600">{c.address}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="max-w-55 truncate text-gray-600">{c.message}</p>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-gray-400">
                                        {new Date(c.createdAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            type="button"
                                            onClick={() => setSelected(c)}
                                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-[#00C833] hover:bg-[#00C833]/5 hover:text-[#00C833]"
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="w-full max-w-md rounded-2xl bg-white shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-red-50 p-2">
                                    <MessageSquareWarning className="h-5 w-5 text-red-500" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{selected.name}</p>
                                    <p className="text-xs text-gray-400">Complaint</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelected(null)}
                                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="divide-y divide-gray-50 px-6 py-2">
                            {[
                                { label: "Full Name", value: selected.name },
                                { label: "Phone", value: selected.number },
                                { label: "Email", value: selected.email ?? "—" },
                                { label: "Address", value: selected.address },
                                {
                                    label: "Date",
                                    value: new Date(selected.createdAt).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    }),
                                },
                            ].map(({ label, value }) => (
                                <div key={label} className="flex justify-between gap-4 py-3">
                                    <span className="text-sm font-medium text-gray-500">{label}</span>
                                    <span className="text-right text-sm text-gray-900">{value}</span>
                                </div>
                            ))}

                            {/* Message full text */}
                            <div className="py-3">
                                <p className="mb-2 text-sm font-medium text-gray-500">Message</p>
                                <p className="rounded-xl bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">
                                    {selected.message}
                                </p>
                            </div>
                        </div>

                        <div className="px-6 py-4">
                            <button
                                type="button"
                                onClick={() => setSelected(null)}
                                className="w-full rounded-xl bg-[#00C833] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#00a828]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

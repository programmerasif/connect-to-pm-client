"use client";

import { useState } from "react";
import { X, Users } from "lucide-react";

type Volunteer = {
    id: string;
    name: string;
    email: string;
    number: string;
    address: string;
    createdAt: Date;
};

export default function VolunteersTable({ volunteers }: { volunteers: Volunteer[] }) {
    const [selected, setSelected] = useState<Volunteer | null>(null);

    return (
        <>
            {volunteers.length === 0 ? (
                <div className="px-6 py-16 text-center">
                    <Users className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                    <p className="text-sm text-gray-500">No volunteers registered yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-150 text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Volunteer</th>
                                <th className="px-6 py-4">Phone</th>
                                <th className="px-6 py-4">Address</th>
                                <th className="px-6 py-4">Registered</th>
                                <th className="px-6 py-4" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {volunteers.map((v, index) => (
                                <tr key={v.id} className="transition-colors hover:bg-gray-50/60">
                                    <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                                                {v.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{v.name}</p>
                                                <p className="text-xs text-gray-400">{v.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{v.number}</td>
                                    <td className="px-6 py-4">
                                        <p className="max-w-50 truncate text-gray-600">{v.address}</p>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-gray-400">
                                        {new Date(v.createdAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            type="button"
                                            onClick={() => setSelected(v)}
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
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-base font-bold text-green-700">
                                    {selected.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{selected.name}</p>
                                    <p className="text-xs text-gray-400">Volunteer</p>
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
                                { label: "Email", value: selected.email },
                                { label: "Phone", value: selected.number },
                                { label: "Address", value: selected.address },
                                {
                                    label: "Registered",
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

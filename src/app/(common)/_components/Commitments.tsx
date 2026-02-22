import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const commitmentCards = [
    {
        id: 1,
        title: "দরিদ্র মানুষের জীবনমান উন্নয়ন",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        image: "/commitment-1.png",
    },
    {
        id: 2,
        title: "মানিদ্র মানুষের জীবনমান উন্নয়ন",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        image: "/commitment-2.png",
    },
    {
        id: 3,
        title: "দরিদ্র মানুষের জীবনমান উন্নয়ন",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        image: "/commitment-3.png",
    },
    {
        id: 4,
        title: "দরিদ্র মানুষের জীবনমান উন্নয়ন",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        image: "/commitment-4.png",
    },
    {
        id: 5,
        title: "মানিদ্র মানুষের জীবনমান উন্নয়ন",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        image: "/commitment-5.png",
    },
    {
        id: 6,
        title: "দরিদ্র মানুষের জীবনমান উন্নয়ন",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        image: "/commitment-6.png",
    },
];

export default function Commitments() {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                {/* Section Title */}
                <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 md:text-3xl">
                    <span className="relative inline-block">
                        অঙ্গীকার সমূহ
                        <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-green-700" />
                    </span>
                </h2>

                {/* Cards Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {commitmentCards.map((card) => (
                        <div
                            key={card.id}
                            className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg"
                        >
                            {/* Card Image */}
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {/* Green overlay badge */}
                                <div className="absolute left-3 top-3 z-10">
                                    <Image
                                        src="/badge-sobar-age.png"
                                        alt="Badge"
                                        width={50}
                                        height={50}
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-5">
                                <h3 className="mb-2 text-lg font-bold text-gray-900">
                                    {card.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="mt-10 flex justify-center">
                    <Link
                        href="/commitments"
                        className="inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-green-800"
                    >
                        আরো দেখুন
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

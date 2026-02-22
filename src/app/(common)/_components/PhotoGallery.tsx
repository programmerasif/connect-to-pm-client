import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const photos = [
    { id: 1, src: "/gallery-1.png", alt: "Gallery photo 1" },
    { id: 2, src: "/gallery-2.png", alt: "Gallery photo 2" },
    { id: 3, src: "/gallery-3.png", alt: "Gallery photo 3" },
    { id: 4, src: "/gallery-4.png", alt: "Gallery photo 4" },
    { id: 5, src: "/gallery-5.png", alt: "Gallery photo 5" },
    { id: 6, src: "/gallery-6.png", alt: "Gallery photo 6" },
];

export default function PhotoGallery() {
    return (
        <section className="bg-gray-50 py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                {/* Section Title */}
                <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 md:text-3xl">
                    <span className="relative inline-block">
                        ফটো গ্যালারী
                        <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-green-700" />
                    </span>
                </h2>

                {/* Photo Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {photos.map((photo) => (
                        <div
                            key={photo.id}
                            className="group relative aspect-4/3 overflow-hidden rounded-2xl shadow-sm transition-all hover:shadow-lg"
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="mt-10 flex justify-center">
                    <Link
                        href="/gallery"
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

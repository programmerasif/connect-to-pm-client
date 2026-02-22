import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

const videos = [
    { id: 1, thumbnail: "/video-thumb-1.png", alt: "Video 1" },
    { id: 2, thumbnail: "/video-thumb-2.png", alt: "Video 2" },
    { id: 3, thumbnail: "/video-thumb-3.png", alt: "Video 3" },
];

export default function VideoGallery() {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                {/* Section Title */}
                <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 md:text-3xl">
                    <span className="relative inline-block">
                        ভিডিও গ্যালারী
                        <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-green-700" />
                    </span>
                </h2>

                {/* Video Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            className="group relative aspect-video cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-all hover:shadow-lg"
                        >
                            <Image
                                src={video.thumbnail}
                                alt={video.alt}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
                            {/* Play button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                                    <Play size={28} className="ml-1 text-green-700" fill="currentColor" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="mt-10 flex justify-center">
                    <Link
                        href="/videos"
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

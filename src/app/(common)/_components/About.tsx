import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const commitments = [
    "দরিদ্র জনগণের জীবনমান উন্নয়ন",
    "প্রান্তিক মানুষের অধিকার ও শিক্ষাব্যবস্থা",
    "নারীর ক্ষমতায়ন ও নিরাপত্তা নিশ্চিতকরণ",
    "জনস্বাস্থ্যবিকাশ ও আধুনিক চিকিৎসা প্রতিষ্ঠা",
    "কৃষকভিত্তিক মুক্তি ও কার্যক্রিটিক উদ্যোগ",
    "সামাজিক নিরাপত্তা ও কল্যাণ রাষ্ট্র প্রতিষ্ঠা",
];

export default function About() {
    return (
        <section className="bg-gray-50 py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                {/* Section Title */}
                <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 md:text-3xl">
                    <span className="relative inline-block">
                        আমাদের সম্পর্কে
                        <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-green-700" />
                    </span>
                </h2>

                <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
                    {/* Left - Image */}
                    <div className="relative">
                        <div className="overflow-hidden rounded-2xl shadow-2xl">
                            <Image
                                src="/about-pm.png"
                                alt="আমাদের সম্পর্কে"
                                width={600}
                                height={450}
                                className="h-auto w-full object-cover"
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-2xl bg-green-700/10" />
                    </div>

                    {/* Right - Content */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 md:text-2xl lg:text-3xl">
                            জনগণের প্রতি আমাদের অঙ্গীকার
                        </h3>
                        <p className="leading-relaxed text-gray-600">
                            এদেশ বেকারত্বের, দারিদ্র্য, ভূমি অপরিকল্পিত জনজীবনের প্রত্যেকটি সংকটিত
                            দূর করে সমৃদ্ধ বাংলাদেশ গড়ার পথে. স্বচ্ছ প্রশাসন নিয়ে ব্যবস্থাপনা,
                            প্রতিটি জেলায় আমি বিশ্বাস করি রাজনীতি সেবাই মূল দায়িত্ব।
                        </p>

                        {/* Badge */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white">
                                <CheckCircle2 size={20} />
                            </div>
                            <span className="text-lg font-semibold text-gray-900">
                                আমাদের অঙ্গীকার
                            </span>
                        </div>

                        {/* Commitment List */}
                        <ul className="space-y-3">
                            {commitments.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                                        <CheckCircle2 size={14} />
                                    </span>
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-green-800"
                        >
                            আরো দেখুন
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

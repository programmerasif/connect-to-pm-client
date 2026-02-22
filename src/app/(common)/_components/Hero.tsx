import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-white">
            {/* Background brush strokes */}
            <div className="absolute inset-0 z-0">
                {/* Green brush stroke - left side */}
                <div className="absolute -left-10 top-0 h-full w-[60%] skew-x-[-6deg] bg-gradient-to-br from-green-700/10 via-green-600/5 to-transparent" />
                {/* Red accent - top */}
                <div className="absolute left-[10%] top-4 h-8 w-40 rounded-full bg-red-600/80" />
                {/* Green accent label */}
                <div className="absolute left-[5%] top-6 z-10">
                    <span className="rounded bg-green-700 px-3 py-1 text-xs font-bold text-white">
                        বাংলাদেশ
                    </span>
                    <span className="ml-1 rounded bg-red-600 px-3 py-1 text-xs font-bold text-white">
                        জিন্দাবাদ
                    </span>
                </div>
            </div>

            <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20 lg:px-8">
                {/* Left Content */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
                        তারেক সাহেবের <span className="italic text-green-700">অঙ্গীকার</span>
                        <br />
                        সবার আগে <span className="text-red-600">বাংলাদেশ</span>
                    </h1>
                    <p className="max-w-lg text-base leading-relaxed text-gray-600 md:text-lg">
                        বাংলাদেশের উন্নয়নে পরিবর্তন প্রত্যাশায় করো, গণতন্ত্র, ন্যায়বিচার ও
                        জনগণতান্ত্রিকতার প্রতি দৃঢ়, সমৃদ্ধিশীল ও গণতান্ত্রিক বাংলাদেশ
                        গড়ার অঙ্গীকারে।
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/commitments"
                            className="inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-green-800 hover:shadow-xl"
                        >
                            প্রতিশ্রুতি দেখুন
                            <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-green-700 px-6 py-3 text-sm font-semibold text-green-700 transition-all hover:bg-green-50"
                        >
                            পরিচয় জানুন
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

                {/* Right Side - PM Image with branding */}
                <div className="relative flex items-center justify-center">
                    {/* Background decoration */}
                    <div className="absolute -right-4 -top-4 h-[90%] w-[85%] rounded-3xl bg-gradient-to-br from-green-100 to-green-50" />

                    {/* Branding badge top-right */}
                    <div className="absolute -right-2 top-0 z-20">
                        <div className="rounded-xl bg-white p-2 shadow-lg">
                            <Image
                                src="/badge-sobar-age.png"
                                alt="সবার আগে বাংলাদেশ"
                                width={120}
                                height={120}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* PM Image */}
                    <div className="relative z-10 w-full max-w-md">
                        <Image
                            src="/hero-pm.png"
                            alt="Prime Minister"
                            width={500}
                            height={600}
                            className="h-auto w-full object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

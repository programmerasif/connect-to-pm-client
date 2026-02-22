"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { ComplaintSchema, type ComplaintFormData } from "@/schema/complaint.schema";

export default function ComplaintsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ComplaintFormData>({
    resolver: zodResolver(ComplaintSchema),
  });

  const onSubmit = async (data: ComplaintFormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        setServerError(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      reset();
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  };

  if (submitted) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4">
        <div className="flex max-w-md flex-col items-center gap-4 text-center">
          <CheckCircle className="h-14 w-14 text-[#00C833]" />
          <h2 className="text-2xl font-bold text-gray-900">অভিযোগ জমা হয়েছে</h2>
          <p className="text-gray-500">
            আপনার অভিযোগ সফলভাবে নথিভুক্ত হয়েছে। এটি শীঘ্রই পর্যালোচনা করা হবে।
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="rounded-full bg-[#00C833] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#00a828]"
          >
            আরেকটি জমা দিন
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Compact inline header */}
        <div className="mb-6">
          <span className="mb-2 inline-block rounded bg-red-600 px-2.5 py-0.5 text-xs font-bold text-white">
            অভিযোগ
          </span>
          <h1 className="text-2xl font-bold text-gray-900">অভিযোগ দাখিল করুন</h1>
          <p className="mt-1 text-sm text-gray-500">
            আপনার সমস্যা জানান — সঠিক কর্তৃপক্ষের কাছে পৌঁছে দেওয়া হবে।
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {serverError && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {serverError}
            </p>
          )}

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              পূর্ণ নাম <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="আপনার পূর্ণ নাম লিখুন"
              {...register("name")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#00C833] focus:ring-2 focus:ring-[#00C833]/20"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              ইমেইল ঠিকানা{" "}
              <span className="text-xs font-normal text-gray-400">(ঐচ্ছিক)</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="আপনার ইমেইল লিখুন"
              {...register("email")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#00C833] focus:ring-2 focus:ring-[#00C833]/20"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="number"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              মোবাইল নম্বর <span className="text-red-600">*</span>
            </label>
            <input
              id="number"
              type="tel"
              placeholder="০১XXXXXXXXX"
              {...register("number")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#00C833] focus:ring-2 focus:ring-[#00C833]/20"
            />
            {errors.number && (
              <p className="mt-1 text-xs text-red-600">{errors.number.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              ঠিকানা <span className="text-red-600">*</span>
            </label>
            <input
              id="address"
              type="text"
              placeholder="গ্রাম / থানা / জেলা"
              {...register("address")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#00C833] focus:ring-2 focus:ring-[#00C833]/20"
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              অভিযোগের বিবরণ <span className="text-red-600">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="বিস্তারিত অভিযোগ লিখুন..."
              {...register("message")}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#00C833] focus:ring-2 focus:ring-[#00C833]/20"
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#00C833] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#00a828] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? "জমা হচ্ছে…" : "অভিযোগ জমা দিন"}
          </button>
        </form>
      </div>
    </section>
  );
}
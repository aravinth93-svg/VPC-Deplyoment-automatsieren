"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { getTopicById } from "@/data/quizzes";
import QuizRunner from "@/components/QuizRunner";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function QuizPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = use(params);
  const topic = getTopicById(topicId);
  const { t } = useLanguage();

  if (!topic) {
    notFound();
  }

  return (
    <main className="flex-1 bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          &larr; {t.backToTopics}
        </Link>
        <QuizRunner topic={topic} />
      </div>
    </main>
  );
}

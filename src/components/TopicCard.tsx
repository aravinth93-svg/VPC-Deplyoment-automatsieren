"use client";

import Link from "next/link";
import { Topic } from "@/types/quiz";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";

export default function TopicCard({ topic }: { topic: Topic }) {
  const { t } = useLanguage();

  const descriptionKey =
    `topic.${topic.id}.description` as TranslationKey;
  const description = (t[descriptionKey] as string) || topic.description;

  return (
    <Link
      href={`/quiz/${topic.id}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-blue-300"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-lg font-bold text-blue-700">
        {topic.icon}
      </div>
      <h2 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
        {topic.name}
      </h2>
      <p className="text-sm text-gray-500">{description}</p>
      <p className="mt-3 text-xs text-gray-400">
        {t.questionsCount(topic.questions.length)}
      </p>
    </Link>
  );
}

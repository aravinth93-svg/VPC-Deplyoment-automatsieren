"use client";

import { topics } from "@/data/quizzes";
import TopicCard from "@/components/TopicCard";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="flex-1 bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            {t.homeHeading}
          </h1>
          <p className="mt-3 text-gray-500">{t.homeSubheading}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { Topic } from "@/types/quiz";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function QuizRunner({ topic }: { topic: Topic }) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(topic.questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  const question = topic.questions[currentIndex];

  function selectAnswer(optionIndex: number) {
    if (submitted) return;
    const updated = [...answers];
    updated[currentIndex] = optionIndex;
    setAnswers(updated);
  }

  function next() {
    if (currentIndex < topic.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function prev() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  function submit() {
    setSubmitted(true);
  }

  const score = answers.reduce<number>((acc, answer, i) => {
    return acc + (answer === topic.questions[i].correctIndex ? 1 : 0);
  }, 0);

  if (submitted) {
    const percentage = Math.round((score / topic.questions.length) * 100);
    return (
      <div className="mx-auto max-w-lg text-center">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            {t.quizComplete}
          </h2>
          <p className="mb-6 text-gray-500">{topic.name}</p>
          <div className="mb-6">
            <span className="text-5xl font-bold text-blue-600">
              {percentage}%
            </span>
            <p className="mt-2 text-gray-500">
              {t.correct(score, topic.questions.length)}
            </p>
          </div>
          <div className="space-y-3">
            {topic.questions.map((q, i) => (
              <div
                key={q.id}
                className={`rounded-lg p-3 text-left text-sm ${
                  answers[i] === q.correctIndex
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                <span className="font-medium">Q{i + 1}:</span> {q.question}
                {answers[i] !== q.correctIndex && (
                  <p className="mt-1 text-xs">
                    {t.correctAnswer} {q.options[q.correctIndex]}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3 justify-center">
            <button
              onClick={() => {
                setAnswers(new Array(topic.questions.length).fill(null));
                setCurrentIndex(0);
                setSubmitted(false);
              }}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {t.retry}
            </button>
            <Link
              href="/"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {t.allTopics}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
        <span>{topic.name}</span>
        <span>
          {currentIndex + 1} / {topic.questions.length}
        </span>
      </div>

      <div className="mb-2 h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-blue-600 transition-all"
          style={{
            width: `${((currentIndex + 1) / topic.questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-gray-900">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => selectAnswer(i)}
              className={`w-full rounded-lg border p-3 text-left text-sm transition ${
                answers[currentIndex] === i
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40"
        >
          {t.previous}
        </button>

        {currentIndex === topic.questions.length - 1 ? (
          <button
            onClick={submit}
            disabled={answers.some((a) => a === null)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-40"
          >
            {t.submit}
          </button>
        ) : (
          <button
            onClick={next}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {t.next}
          </button>
        )}
      </div>
    </div>
  );
}

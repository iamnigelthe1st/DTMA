'use client';

import { Question } from '@/lib/questions';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: number | undefined;
  onAnswer: (score: number) => void;
  animationDelay: number;
}

export default function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  onAnswer,
  animationDelay,
}: QuestionCardProps) {
  return (
    <div className="animate-slide-up bg-white/30 p-6 rounded-2xl backdrop-blur-sm" style={{ animationDelay: `${animationDelay}s` }}>
      <h3 className="text-xl font-bold mb-5 text-gray-900 flex items-start gap-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center text-sm font-black">
          {questionNumber}
        </span>
        <span className="flex-1">{question.question}</span>
      </h3>
      <div className="space-y-3 pl-11">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.score;
          return (
            <label
              key={option.score}
              className={`flex items-center p-5 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl scale-[1.02] border-purple-400'
                  : 'bg-white/80 hover:bg-white hover:shadow-lg text-gray-800 border-white/60 hover:border-purple-300'
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={option.score}
                checked={isSelected}
                onChange={() => onAnswer(option.score)}
                className="mr-4 w-6 h-6 accent-purple-600"
              />
              <span className="flex-1 font-semibold text-lg">{option.text}</span>
              <span
                className={`px-4 py-2 rounded-lg text-sm font-black ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700'
                }`}
              >
                {option.score}/5
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

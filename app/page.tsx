"use client";

import { useMemo, useEffect, useState } from "react";
import {
  assessmentCategories,
  getMaturityLevel,
  getRecommendations,
} from "@/lib/questions";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";
import CategoryScoreCard from "@/components/CategoryScoreCard";
import Toast from "@/components/Toast";
import { useAssessment } from "@/hooks/useAssessment";
import { useToast } from "@/hooks/useToast";
import { useKeyboard } from "@/hooks/useKeyboard";

export default function Home() {
  const { toasts, showToast, removeToast } = useToast();
  const [showAutoSave, setShowAutoSave] = useState(false);
  const {
    currentStep,
    answers,
    showResults,
    isLoaded,
    currentCategory,
    totalSteps,
    handleAnswer,
    canProceed,
    handleNext,
    handlePrevious,
    handleRestart,
    calculateScores,
    handleDownloadPDF,
    handleExportJSON,
  } = useAssessment(showToast);

  const getCategoryIcon = (categoryId: string) => {
    const icons: { [key: string]: string } = {
      technology: "🚀",
      data: "📊",
      process: "⚙️",
      customer: "👥",
      workforce: "💼",
    };
    return icons[categoryId] || "📋";
  };

  // Memoize expensive calculations
  const resultsData = useMemo(() => {
    if (!showResults) return null;

    const { categoryScores, overallPercentage } = calculateScores();
    const maturityInfo = getMaturityLevel(overallPercentage);
    const recommendations = getRecommendations(categoryScores);
    const radarData = assessmentCategories.map((category) => ({
      category: category.name.split(" ")[0],
      score: (categoryScores[category.id] / 20) * 100,
      fullMark: 100,
    }));

    return {
      categoryScores,
      overallPercentage,
      maturityInfo,
      recommendations,
      radarData,
    };
  }, [showResults, calculateScores]);

  // Auto-save indicator
  useEffect(() => {
    if (isLoaded && Object.keys(answers).length > 0) {
      setShowAutoSave(true);
      const timer = setTimeout(() => setShowAutoSave(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [answers, isLoaded]);

  // Keyboard shortcuts
  useKeyboard([
    {
      key: "ArrowRight",
      callback: () => {
        if (!showResults && canProceed()) {
          handleNext();
        }
      },
    },
    {
      key: "ArrowLeft",
      callback: () => {
        if (!showResults && currentStep > 0) {
          handlePrevious();
        }
      },
    },
  ]);

  if (!isLoaded) {
    return null; // Prevent hydration mismatch
  }

  if (showResults) {
    if (!resultsData) return null;

    const {
      categoryScores,
      overallPercentage,
      maturityInfo,
      recommendations,
      radarData,
    } = resultsData;

    return (
      <div className="min-h-screen py-12 px-6 md:px-8 lg:px-12 animate-fade-in flex flex-col items-center justify-center">
        {/* Toast notifications */}
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}

        {/* Auto-save indicator */}
        {showAutoSave && (
          <div
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg animate-slide-up"
            role="status"
            aria-live="polite"
          >
            <span className="text-lg">✓</span>
            <span className="text-sm font-semibold">Progress saved</span>
          </div>
        )}

        <div className="max-w-7xl mx-auto w-full">
          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div
            className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Header */}
          <div className="text-center mb-16 animate-slide-up relative z-10">
            <div className="inline-block mb-6">
              <div className="text-7xl mb-4 animate-pulse-slow">🎉</div>
            </div>
            <h1 className="text-6xl font-extrabold text-white mb-6 tracking-tight">
              Assessment Complete!
            </h1>
            <p className="text-2xl text-white/90 font-light">
              Here's your Digital Transformation Maturity Report
            </p>
          </div>

          {/* Overall Score Card - Enhanced */}
          <div className="card-gradient rounded-3xl shadow-2xl p-10 mb-10 animate-scale-in border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-8 text-center">
                <span className="gradient-text">Overall Maturity Score</span>
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                <div className="relative">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 opacity-20 blur-lg"></div>
                  <div
                    className="relative w-56 h-56 rounded-full flex items-center justify-center shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${maturityInfo.color} 0%, ${maturityInfo.color}dd 100%)`,
                    }}
                  >
                    <div className="text-center">
                      <div className="text-7xl font-black text-white mb-2">
                        {overallPercentage}%
                      </div>
                      <div className="text-white/90 text-sm font-semibold tracking-wider">
                        SCORE
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center md:text-left max-w-lg">
                  <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                    <span className="text-sm font-semibold text-gray-700">
                      Maturity Level
                    </span>
                  </div>
                  <h3
                    className="text-5xl font-black mb-4"
                    style={{ color: maturityInfo.color }}
                  >
                    {maturityInfo.level}
                  </h3>
                  <p className="text-gray-700 text-xl leading-relaxed">
                    {maturityInfo.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Radar Chart - Enhanced */}
          <div
            className="card-gradient rounded-3xl shadow-2xl p-10 mb-10 animate-scale-in border border-white/20"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-2">
                Category Performance
              </h2>
              <p className="text-gray-600">
                Visual breakdown across all dimensions
              </p>
            </div>
            <div className="bg-white/30 rounded-2xl p-6 backdrop-blur-sm">
              <ResponsiveContainer width="100%" height={450}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#cbd5e1" strokeWidth={1.5} />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: "#1e293b", fontSize: 15, fontWeight: 700 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: "#64748b", fontWeight: 600 }}
                  />
                  <Radar
                    name="Your Score"
                    dataKey="score"
                    stroke="#667eea"
                    fill="#667eea"
                    fillOpacity={0.7}
                    strokeWidth={3}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: "20px", fontWeight: 600 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Scores - Enhanced */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Detailed Category Scores
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assessmentCategories.map((category, index) => {
                const score = categoryScores[category.id];

                return (
                  <CategoryScoreCard
                    key={category.id}
                    categoryName={category.name}
                    description={category.description}
                    score={score}
                    maxScore={20}
                    animationDelay={0.2 + index * 0.08}
                    icon={getCategoryIcon(category.id)}
                  />
                );
              })}
            </div>
          </div>

          {/* Recommendations - Enhanced */}
          {recommendations.length > 0 && (
            <div
              className="card-gradient rounded-3xl shadow-2xl p-10 mb-10 animate-scale-in border border-white/20"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold gradient-text mb-2">
                  💡 Recommendations for Improvement
                </h2>
                <p className="text-gray-600">
                  Actionable insights to enhance your digital maturity
                </p>
              </div>
              <div className="space-y-5">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex gap-5 p-6 bg-white/60 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-white/40"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg">
                      {index + 1}
                    </div>
                    <p className="text-gray-800 leading-relaxed text-lg flex-1">
                      {rec}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons - Enhanced */}
          <div
            className="flex flex-wrap gap-6 justify-center animate-scale-in"
            style={{ animationDelay: "0.8s" }}
          >
            <button
              onClick={handleDownloadPDF}
              aria-label="Download PDF report of your assessment results"
              className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 border-2 border-purple-400/50"
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl group-hover:animate-bounce">📄</span>
                Download PDF
              </span>
            </button>
            <button
              onClick={handleExportJSON}
              aria-label="Export assessment results as JSON file"
              className="group px-10 py-5 bg-white text-purple-600 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-purple-600"
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl">💾</span>
                Export JSON
              </span>
            </button>
            <button
              onClick={handleRestart}
              aria-label="Start a new assessment"
              className="group px-10 py-5 bg-white text-purple-600 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-purple-600"
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl group-hover:rotate-180 transition-transform duration-500">
                  🔄
                </span>
                Start New
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 md:px-8 lg:px-12 relative flex flex-col items-center justify-center">
      {/* Toast notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      {/* Auto-save indicator */}
      {showAutoSave && (
        <div
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg animate-slide-up"
          role="status"
          aria-live="polite"
        >
          <span className="text-lg">✓</span>
          <span className="text-sm font-semibold">Progress saved</span>
        </div>
      )}

      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        {/* Header - Enhanced */}
        {currentStep === 0 && (
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-block mb-6 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full">
              <span className="text-white font-semibold text-sm tracking-wider">
                DIGITAL MATURITY ASSESSMENT
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
              Digital Transformation
              <br />
              <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Maturity Assessment
              </span>
            </h1>
            <p className="text-lg text-white/80 font-medium mb-6">
              Made by Keegan Kinyanjui
            </p>
            <p className="text-2xl text-white/90 mb-4 font-light">
              Evaluate your organization's digital readiness across 5 key
              dimensions
            </p>
            <p className="text-lg text-white/70">
              📋 20 comprehensive questions • ⏱️ 5 minutes • 📊 Instant results
            </p>
          </div>
        )}

        {/* Progress Bar - Enhanced */}
        <ProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          categories={assessmentCategories}
        />

        {/* Category Card - Enhanced */}
        <div className="card-gradient rounded-3xl shadow-2xl p-10 mb-10 animate-scale-in border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">
                  {getCategoryIcon(currentCategory.id)}
                </div>
                <div className="flex-1">
                  <div className="inline-block px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-sm font-bold mb-3 shadow-lg">
                    Category {currentStep + 1} of {totalSteps}
                  </div>
                  <h2 className="text-4xl font-black gradient-text">
                    {currentCategory.name}
                  </h2>
                </div>
              </div>
              <p className="text-gray-700 text-xl leading-relaxed bg-white/40 p-5 rounded-2xl border border-white/60">
                {currentCategory.description}
              </p>
            </div>

            {/* Questions - Enhanced */}
            <div className="space-y-10">
              {currentCategory.questions.map((question, qIndex) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  questionNumber={qIndex + 1}
                  selectedAnswer={answers[question.id]}
                  onAnswer={(score) => handleAnswer(question.id, score)}
                  animationDelay={qIndex * 0.1}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons - Enhanced */}
        <div className="flex justify-between gap-6 animate-fade-in">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            aria-label="Go to previous category"
            aria-disabled={currentStep === 0}
            className={`px-10 py-5 rounded-2xl font-bold text-xl shadow-xl transition-all duration-300 ${
              currentStep === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                : "bg-white text-purple-600 hover:shadow-2xl hover:scale-105 border-2 border-white/60"
            }`}
          >
            <span className="flex items-center gap-2">
              <span>←</span> Previous
            </span>
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            aria-label={
              currentStep === totalSteps - 1
                ? "View your assessment results"
                : "Go to next category"
            }
            aria-disabled={!canProceed()}
            className={`px-10 py-5 rounded-2xl font-bold text-xl shadow-xl transition-all duration-300 ${
              !canProceed()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 border-2 border-purple-400/50"
            }`}
          >
            <span className="flex items-center gap-2">
              {currentStep === totalSteps - 1 ? (
                <>
                  View Results <span className="text-2xl">🎯</span>
                </>
              ) : (
                <>
                  Next <span>→</span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

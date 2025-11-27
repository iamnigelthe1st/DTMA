import { useState, useEffect, useCallback, useMemo } from "react";
import {
  assessmentCategories,
  getMaturityLevel,
  getRecommendations,
} from "@/lib/questions";
import { generatePDFReport } from "@/lib/pdfGenerator";

export const useAssessment = (
  showToast?: (message: string, type: "success" | "error" | "info") => void
) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem("dta_answers");
      const savedStep = localStorage.getItem("dta_step");

      if (savedAnswers) {
        const parsed = JSON.parse(savedAnswers);
        // Validate data structure
        if (typeof parsed === "object" && parsed !== null) {
          setAnswers(parsed);
        }
      }
      if (savedStep) {
        const step = parseInt(savedStep);
        if (!isNaN(step) && step >= 0 && step < assessmentCategories.length) {
          setCurrentStep(step);
        }
      }
    } catch (error) {
      console.error("Failed to load saved progress:", error);
      // Clear corrupted data
      localStorage.removeItem("dta_answers");
      localStorage.removeItem("dta_step");
      if (showToast) {
        showToast("Failed to load saved progress. Starting fresh.", "error");
      }
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("dta_answers", JSON.stringify(answers));
        localStorage.setItem("dta_step", currentStep.toString());
      } catch (error) {
        console.error("Failed to save progress:", error);
        if (showToast) {
          showToast("Failed to save progress automatically", "error");
        }
      }
    }
  }, [answers, currentStep, isLoaded]);

  const currentCategory = assessmentCategories[currentStep];
  const totalSteps = assessmentCategories.length;

  const handleAnswer = useCallback((questionId: string, score: number) => {
    // Validate score
    if (score < 1 || score > 5) {
      console.error("Invalid score:", score);
      return;
    }
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  }, []);

  const canProceed = useCallback(() => {
    return currentCategory.questions.every((q) => answers[q.id] !== undefined);
  }, [currentCategory.questions, answers]);

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep, totalSteps]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  const handleRestart = useCallback(() => {
    if (
      confirm(
        "Are you sure you want to start over? This will clear your current progress."
      )
    ) {
      setCurrentStep(0);
      setAnswers({});
      setShowResults(false);
      try {
        localStorage.removeItem("dta_answers");
        localStorage.removeItem("dta_step");
      } catch (error) {
        console.error("Failed to clear saved data:", error);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const calculateScores = useCallback(() => {
    const categoryScores: { [key: string]: number } = {};
    let totalScore = 0;

    assessmentCategories.forEach((category) => {
      const categoryScore = category.questions.reduce((sum, question) => {
        return sum + (answers[question.id] || 0);
      }, 0);
      categoryScores[category.id] = categoryScore;
      totalScore += categoryScore;
    });

    const maxScore = assessmentCategories.length * 4 * 5;
    const overallPercentage = (totalScore / maxScore) * 100;

    return { categoryScores, overallPercentage: Math.round(overallPercentage) };
  }, [answers]);

  const handleDownloadPDF = useCallback(() => {
    try {
      const { categoryScores, overallPercentage } = calculateScores();
      const recommendations = getRecommendations(categoryScores);
      generatePDFReport(categoryScores, overallPercentage, recommendations);
      if (showToast) {
        showToast("PDF report generated successfully!", "success");
      }
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      if (showToast) {
        showToast("Failed to generate PDF report. Please try again.", "error");
      }
    }
  }, [calculateScores, showToast]);

  const handleExportJSON = useCallback(() => {
    try {
      const { categoryScores, overallPercentage } = calculateScores();
      const data = {
        date: new Date().toISOString(),
        overallScore: overallPercentage,
        categoryScores,
        answers,
        recommendations: getRecommendations(categoryScores),
        maturityLevel: getMaturityLevel(overallPercentage),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `assessment-results-${
        new Date().toISOString().split("T")[0]
      }.json`;
      a.click();
      URL.revokeObjectURL(url);
      if (showToast) {
        showToast("Assessment results exported successfully!", "success");
      }
    } catch (error) {
      console.error("Failed to export JSON:", error);
      if (showToast) {
        showToast("Failed to export data. Please try again.", "error");
      }
    }
  }, [calculateScores, answers, showToast]);

  return {
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
  };
};

import { renderHook, act } from '@testing-library/react';
import { useAssessment } from './useAssessment';

jest.mock('@/lib/pdfGenerator', () => ({
  generatePDFReport: jest.fn(),
}));

describe('useAssessment Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useAssessment());
    
    // Wait for useEffect to run
    expect(result.current.currentStep).toBe(0);
    expect(result.current.answers).toEqual({});
    expect(result.current.showResults).toBe(false);
  });

  it('updates answers correctly', () => {
    const { result } = renderHook(() => useAssessment());
    
    act(() => {
      result.current.handleAnswer('tech_1', 5);
    });

    expect(result.current.answers['tech_1']).toBe(5);
  });

  it('persists answers to localStorage', () => {
    const { result } = renderHook(() => useAssessment());
    
    act(() => {
      result.current.handleAnswer('tech_1', 5);
    });

    // Wait for useEffect to save
    const saved = JSON.parse(localStorage.getItem('dta_answers') || '{}');
    expect(saved['tech_1']).toBe(5);
  });

  it('loads persisted state on mount', () => {
    localStorage.setItem('dta_answers', JSON.stringify({ 'tech_1': 3 }));
    localStorage.setItem('dta_step', '1');

    const { result } = renderHook(() => useAssessment());

    expect(result.current.answers['tech_1']).toBe(3);
    expect(result.current.currentStep).toBe(1);
  });

  it('calculates scores correctly', () => {
    const { result } = renderHook(() => useAssessment());
    
    act(() => {
      // Answer all questions with max score (5)
      // 5 categories * 4 questions * 5 points = 100 points
      const questions = result.current.currentCategory.questions;
      questions.forEach(q => result.current.handleAnswer(q.id, 5));
    });

    // We only answered one category fully
    const { categoryScores } = result.current.calculateScores();
    expect(categoryScores['technology']).toBe(20);
  });
});

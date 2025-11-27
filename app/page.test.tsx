import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Home from './page';

expect.extend(toHaveNoViolations);

// Mock Recharts since it doesn't render well in JSDOM
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: any }) => <div>{children}</div>,
  RadarChart: () => <div>RadarChart</div>,
  PolarGrid: () => null,
  PolarAngleAxis: () => null,
  PolarRadiusAxis: () => null,
  Radar: () => null,
  Legend: () => null,
}));

describe('Assessment Page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the landing page correctly', () => {
    render(<Home />);
    expect(screen.getByText('Digital Transformation')).toBeInTheDocument();
    expect(screen.getByText('Maturity Assessment')).toBeInTheDocument();
  });

  it('has no accessibility violations on initial load', async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('allows navigation when questions are answered', async () => {
    render(<Home />);
    
    // Find all radio inputs
    const radios = screen.getAllByRole('radio');
    
    // Answer first 4 questions (Category 1)
    // Each question has 5 options, so we need to click one for each of the 4 questions
    // Question 1
    fireEvent.click(radios[0]); 
    // Question 2 (index 5)
    fireEvent.click(radios[5]);
    // Question 3 (index 10)
    fireEvent.click(radios[10]);
    // Question 4 (index 15)
    fireEvent.click(radios[15]);

    const nextButton = screen.getByText(/Next/i);
    expect(nextButton).not.toBeDisabled();
    
    fireEvent.click(nextButton);
    
    // Should be on step 2
    await waitFor(() => {
      expect(screen.getByText('Step 2')).toBeInTheDocument();
    });
  });

  it('disables next button if questions are unanswered', () => {
    render(<Home />);
    const nextButton = screen.getByText(/Next/i);
    expect(nextButton).toBeDisabled();
  });
});

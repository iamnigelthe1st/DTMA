import jsPDF from 'jspdf';
import { getMaturityLevel, assessmentCategories } from './questions';

export const generatePDFReport = (
  categoryScores: { [key: string]: number },
  overallScore: number,
  recommendations: string[]
) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Title
  pdf.setFontSize(24);
  pdf.setTextColor(59, 130, 246);
  pdf.text('Digital Transformation', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;
  pdf.text('Maturity Assessment Report', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  
  // Date
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  const date = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  pdf.text(`Generated on: ${date}`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 20;

  // Overall Score Section
  pdf.setFontSize(16);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Overall Maturity Score', 20, yPosition);
  yPosition += 10;
  
  const maturityInfo = getMaturityLevel(overallScore);
  
  // Score box
  pdf.setFillColor(59, 130, 246);
  pdf.rect(20, yPosition, 50, 20, 'F');
  pdf.setFontSize(24);
  pdf.setTextColor(255, 255, 255);
  pdf.text(`${overallScore}%`, 45, yPosition + 13, { align: 'center' });
  
  // Maturity level
  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 0);
  pdf.text(maturityInfo.level, 80, yPosition + 10);
  
  yPosition += 25;
  
  // Description
  pdf.setFontSize(10);
  pdf.setTextColor(60, 60, 60);
  const descLines = pdf.splitTextToSize(maturityInfo.description, pageWidth - 40);
  pdf.text(descLines, 20, yPosition);
  yPosition += descLines.length * 5 + 10;

  // Category Scores Section
  pdf.setFontSize(16);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Category Breakdown', 20, yPosition);
  yPosition += 10;

  Object.entries(categoryScores).forEach(([categoryId, score]) => {
    const category = assessmentCategories.find(c => c.id === categoryId);
    if (!category) return;
    
    const percentage = (score / 20) * 100;
    
    // Check if we need a new page
    if (yPosition > pageHeight - 30) {
      pdf.addPage();
      yPosition = 20;
    }
    
    // Category name
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(category.name, 20, yPosition);
    
    // Score
    pdf.setFontSize(11);
    pdf.setTextColor(60, 60, 60);
    pdf.text(`${score}/20 (${percentage.toFixed(0)}%)`, pageWidth - 50, yPosition);
    
    yPosition += 5;
    
    // Progress bar
    const barWidth = pageWidth - 40;
    const fillWidth = (barWidth * percentage) / 100;
    
    pdf.setFillColor(230, 230, 230);
    pdf.rect(20, yPosition, barWidth, 6, 'F');
    
    // Color based on score
    let barColor = [220, 38, 38]; // Red
    if (percentage >= 70) barColor = [16, 185, 129]; // Green
    else if (percentage >= 50) barColor = [59, 130, 246]; // Blue
    else if (percentage >= 30) barColor = [245, 158, 11]; // Orange
    
    pdf.setFillColor(barColor[0], barColor[1], barColor[2]);
    pdf.rect(20, yPosition, fillWidth, 6, 'F');
    
    yPosition += 12;
  });

  // Recommendations Section
  if (recommendations.length > 0) {
    yPosition += 10;
    
    // Check if we need a new page
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Recommendations for Improvement', 20, yPosition);
    yPosition += 10;
    
    recommendations.forEach((rec, index) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.setFontSize(10);
      pdf.setTextColor(60, 60, 60);
      
      // Number
      pdf.setTextColor(59, 130, 246);
      pdf.text(`${index + 1}.`, 20, yPosition);
      
      // Recommendation text
      pdf.setTextColor(60, 60, 60);
      const recLines = pdf.splitTextToSize(rec, pageWidth - 50);
      pdf.text(recLines, 28, yPosition);
      
      yPosition += recLines.length * 5 + 5;
    });
  }

  // Footer
  const footerY = pageHeight - 15;
  pdf.setFontSize(8);
  pdf.setTextColor(150, 150, 150);
  pdf.text(
    'This assessment provides a snapshot of your digital transformation maturity.',
    pageWidth / 2,
    footerY,
    { align: 'center' }
  );
  pdf.text(
    'Use these insights to guide your digital transformation strategy.',
    pageWidth / 2,
    footerY + 4,
    { align: 'center' }
  );

  // Save the PDF
  pdf.save('digital-transformation-assessment.pdf');
};

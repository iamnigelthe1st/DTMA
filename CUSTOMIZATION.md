# 🎨 Customization Guide

## Overview

This guide will help you customize the Digital Transformation Maturity Assessment tool to match your organization's needs, branding, and specific assessment criteria.

## 1. Customizing Questions

### Location
`lib/questions.ts`

### Adding New Questions

```typescript
{
  id: 'tech-5', // Unique ID
  question: 'Your question text here?',
  options: [
    { text: 'Option 1 description', score: 1 },
    { text: 'Option 2 description', score: 2 },
    { text: 'Option 3 description', score: 3 },
    { text: 'Option 4 description', score: 4 },
    { text: 'Option 5 description', score: 5 },
  ],
}
```

### Adding New Categories

```typescript
{
  id: 'innovation', // Unique category ID
  name: 'Innovation & R&D',
  description: 'Evaluate your innovation capabilities',
  questions: [
    // Add 4 questions here
  ],
}
```

**Important:** If you add/remove categories, update:
- The total steps calculation in `app/page.tsx`
- The radar chart to accommodate new dimensions
- The PDF generator for new categories

### Modifying Scoring

Change the score values in options:
```typescript
options: [
  { text: 'Poor', score: 0 },      // Changed from 1
  { text: 'Fair', score: 25 },     // Changed from 2
  { text: 'Good', score: 50 },     // Changed from 3
  { text: 'Very Good', score: 75 }, // Changed from 4
  { text: 'Excellent', score: 100 }, // Changed from 5
]
```

## 2. Customizing Colors & Branding

### Location
`app/globals.css`

### Primary Gradient

```css
:root {
  /* Change these values */
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  /* Example alternatives: */
  /* Blue to Teal */
  --primary-gradient: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  
  /* Green to Blue */
  --primary-gradient: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
  
  /* Orange to Pink */
  --primary-gradient: linear-gradient(135deg, #f97316 0%, #ec4899 100%);
}
```

### Body Background

```css
body {
  /* Change to solid color */
  background: #1e293b;
  
  /* Or use your custom gradient */
  background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}
```

### Button Colors

In `app/page.tsx`, find button classes:

```tsx
// Current purple gradient
className="bg-gradient-to-r from-purple-600 to-indigo-600"

// Change to your brand colors
className="bg-gradient-to-r from-blue-600 to-cyan-600"
className="bg-gradient-to-r from-green-600 to-emerald-600"
className="bg-gradient-to-r from-orange-600 to-red-600"
```

### Progress Bar Colors

```tsx
// In ProgressBar component
className="bg-gradient-to-r from-green-400 to-blue-500"

// Change to match your brand
className="bg-gradient-to-r from-blue-400 to-purple-500"
```

## 3. Customizing Typography

### Change Font Family

In `app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

body {
  font-family: 'Poppins', sans-serif; /* Changed from Inter */
}
```

Popular alternatives:
- **Poppins**: Modern, geometric
- **Roboto**: Clean, professional
- **Montserrat**: Bold, contemporary
- **Open Sans**: Friendly, readable
- **Raleway**: Elegant, sophisticated

### Font Sizes

```css
/* Headings */
h1 { font-size: 3.5rem; } /* Adjust as needed */
h2 { font-size: 2.5rem; }
h3 { font-size: 1.5rem; }

/* Body text */
body { font-size: 16px; }
```

## 4. Customizing Maturity Levels

### Location
`lib/questions.ts` - `getMaturityLevel` function

### Change Level Names & Thresholds

```typescript
export const getMaturityLevel = (score: number) => {
  if (score >= 85) { // Changed from 90
    return {
      level: 'World Class', // Changed from 'Digital Leader'
      description: 'Your custom description',
      color: '#10b981',
    };
  }
  // Add more levels or modify existing ones
};
```

### Custom Level Colors

```typescript
color: '#10b981', // Green
color: '#3b82f6', // Blue
color: '#f59e0b', // Orange
color: '#ef4444', // Red
color: '#8b5cf6', // Purple
```

## 5. Customizing Recommendations

### Location
`lib/questions.ts` - `getRecommendations` function

### Add Custom Recommendations

```typescript
if (categoryId === 'technology' && percentage < 70) {
  recommendations.push(
    `Your custom recommendation for technology improvements.`
  );
}

// Add recommendations for new categories
if (categoryId === 'innovation' && percentage < 70) {
  recommendations.push(
    `Innovation: Establish an innovation lab and allocate R&D budget.`
  );
}
```

### Change Recommendation Thresholds

```typescript
// Current: recommendations for scores < 70%
if (percentage < 70) { ... }

// Change to < 80% for stricter recommendations
if (percentage < 80) { ... }
```

## 6. Customizing PDF Report

### Location
`lib/pdfGenerator.ts`

### Add Company Logo

```typescript
// At the top of generatePDFReport function
const logoUrl = '/your-logo.png';
pdf.addImage(logoUrl, 'PNG', 20, 10, 40, 20);
yPosition = 35; // Adjust starting position
```

### Change PDF Colors

```typescript
// Title color
pdf.setTextColor(59, 130, 246); // Blue
// Change to your brand color
pdf.setTextColor(16, 185, 129); // Green

// Score box color
pdf.setFillColor(59, 130, 246);
// Change to your brand color
pdf.setFillColor(16, 185, 129);
```

### Add Custom Sections

```typescript
// Add a new section before recommendations
yPosition += 10;
pdf.setFontSize(16);
pdf.text('Action Plan', 20, yPosition);
yPosition += 10;

pdf.setFontSize(10);
const actionPlan = 'Your custom action plan text...';
const planLines = pdf.splitTextToSize(actionPlan, pageWidth - 40);
pdf.text(planLines, 20, yPosition);
yPosition += planLines.length * 5 + 10;
```

### Change PDF Filename

```typescript
// At the end of the function
pdf.save('digital-transformation-assessment.pdf');

// Change to custom name
pdf.save('your-company-assessment-report.pdf');
```

## 7. Customizing Animations

### Location
`app/globals.css`

### Animation Duration

```css
.animate-slide-up {
  animation: slideUp 0.5s ease-out; /* Change 0.5s to your preference */
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out; /* Adjust timing */
}
```

### Disable Animations

```css
/* Remove or comment out animation classes */
.animate-slide-up {
  /* animation: slideUp 0.5s ease-out; */
}
```

### Custom Animation

```css
@keyframes customAnimation {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.custom-animate {
  animation: customAnimation 0.7s ease-out;
}
```

## 8. Customizing Radar Chart

### Location
`app/page.tsx` - Results section

### Change Colors

```tsx
<Radar
  name="Your Score"
  dataKey="score"
  stroke="#667eea"        // Change line color
  fill="#667eea"          // Change fill color
  fillOpacity={0.6}       // Adjust transparency
  strokeWidth={2}         // Adjust line thickness
/>
```

### Add Comparison Line

```tsx
// Add a second Radar for benchmark
<Radar
  name="Industry Average"
  dataKey="benchmark"
  stroke="#f59e0b"
  fill="#f59e0b"
  fillOpacity={0.3}
/>
```

### Change Chart Size

```tsx
<ResponsiveContainer width="100%" height={400}>
  {/* Change height value */}
</ResponsiveContainer>
```

## 9. Adding New Features

### Add Email Report Feature

```typescript
// In app/page.tsx
const handleEmailReport = () => {
  const { categoryScores, overallPercentage } = calculateScores();
  const subject = 'Digital Transformation Assessment Results';
  const body = `My overall score: ${overallPercentage}%`;
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
};
```

### Add Print Functionality

```typescript
const handlePrint = () => {
  window.print();
};
```

### Add Social Sharing

```typescript
const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: 'My Digital Transformation Score',
      text: `I scored ${overallPercentage}% on the assessment!`,
      url: window.location.href,
    });
  }
};
```

## 10. Localization (Multi-Language)

### Create Translation Files

```typescript
// lib/translations/en.ts
export const en = {
  title: 'Digital Transformation Maturity Assessment',
  subtitle: 'Evaluate your organization\'s digital readiness',
  // ... more translations
};

// lib/translations/es.ts
export const es = {
  title: 'Evaluación de Madurez de Transformación Digital',
  subtitle: 'Evalúe la preparación digital de su organización',
  // ... more translations
};
```

### Use Translations

```tsx
import { en, es } from '@/lib/translations';

const [language, setLanguage] = useState('en');
const t = language === 'en' ? en : es;

<h1>{t.title}</h1>
```

## 11. White-Label Customization

### Complete Rebranding Checklist

- [ ] Update `app/layout.tsx` metadata (title, description)
- [ ] Change color scheme in `globals.css`
- [ ] Replace logo/favicon in `public/` folder
- [ ] Update PDF header with company name
- [ ] Customize maturity level names
- [ ] Adjust questions to industry-specific terms
- [ ] Update README with company info
- [ ] Change repository name and URLs

## 12. Advanced Customizations

### Add Data Export (JSON)

```typescript
const handleExportJSON = () => {
  const data = {
    timestamp: new Date().toISOString(),
    answers,
    scores: categoryScores,
    overallScore: overallPercentage,
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'assessment-data.json';
  a.click();
};
```

### Add Local Storage Persistence

```typescript
// Save answers
useEffect(() => {
  localStorage.setItem('assessment-answers', JSON.stringify(answers));
}, [answers]);

// Load answers on mount
useEffect(() => {
  const saved = localStorage.getItem('assessment-answers');
  if (saved) {
    setAnswers(JSON.parse(saved));
  }
}, []);
```

## Tips for Successful Customization

1. **Test After Each Change**: Make small changes and test immediately
2. **Keep Backups**: Use Git to commit before major changes
3. **Document Changes**: Keep notes on what you've customized
4. **Maintain Consistency**: Ensure colors, fonts, and styles are consistent
5. **Consider Accessibility**: Maintain good contrast ratios
6. **Mobile Testing**: Always test on mobile after UI changes

## Need Help?

- Check the main README.md for architecture details
- Review TESTING.md for validation procedures
- Refer to component files for implementation examples

---

**Happy Customizing! 🎨**

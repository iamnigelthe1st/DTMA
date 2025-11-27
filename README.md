# Digital Transformation Maturity Assessment Tool

A comprehensive, interactive web application built with **Next.js 14** and **Tailwind CSS** that helps organizations evaluate their digital transformation maturity across five critical dimensions.

![Assessment Welcome Screen](/.gemini/antigravity/brain/84b45041-392a-4ef2-9a5f-f4d3c8c405f8/assessment_welcome_screen_1764242278164.png)

## 🌟 Features

### Multi-Step Questionnaire
- **5 Categories** with 4 questions each (20 total questions)
- **5-point scoring system** for each question
- Real-time progress tracking
- Smooth animations and transitions
- Mobile-responsive design

### Assessment Categories

1. **Technology Infrastructure** - Evaluate IT systems, cloud readiness, cybersecurity, and mobile capabilities
2. **Data Management** - Assess data strategy, analytics capabilities, and governance
3. **Process Automation** - Measure automation maturity and process optimization
4. **Customer Experience** - Evaluate digital engagement and omnichannel capabilities
5. **Workforce Digital Skills** - Assess digital literacy, training, and innovation culture

### Interactive Results Dashboard

![Assessment Results Screen](/.gemini/antigravity/brain/84b45041-392a-4ef2-9a5f-f4d3c8c405f8/assessment_results_screen_1764242312953.png)

- **Overall Maturity Score** with level classification:
  - Digital Leader (90-100%)
  - Digital Advanced (70-89%)
  - Digital Intermediate (50-69%)
  - Digital Emerging (30-49%)
  - Digital Beginner (0-29%)

- **Radar Chart Visualization** using Recharts showing performance across all categories
- **Category Breakdown** with visual progress bars and scores
- **Personalized Recommendations** based on assessment results

### PDF Report Generation
- Professional PDF report with jsPDF
- Includes overall score and maturity level
- Category-by-category breakdown with visual progress bars
- Customized improvement recommendations
- Downloadable for sharing and record-keeping

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd digital-transformation-assessment
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Design Features

### Premium Aesthetics
- **Vibrant gradient backgrounds** with purple-to-indigo color scheme
- **Glassmorphism effects** on cards with backdrop blur
- **Smooth animations** including fade-in, slide-up, and scale effects
- **Custom scrollbar** styling
- **Interactive hover states** with elevation changes
- **Modern typography** using Inter font family

### Responsive Design
- Fully responsive layout adapting to all screen sizes
- Mobile-first approach
- Touch-friendly interface elements

## 📊 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **PDF Generation**: jsPDF
- **Font**: Inter (Google Fonts)

## 🏗️ Project Structure

```
digital-transformation-assessment/
├── app/
│   ├── page.tsx              # Main assessment component
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles and animations
├── lib/
│   ├── questions.ts          # Question bank and scoring logic
│   └── pdfGenerator.ts       # PDF report generation
├── public/                   # Static assets
└── package.json              # Dependencies
```

## 🔧 Key Components

### Assessment Flow
1. **Welcome Screen** - Introduction and instructions
2. **Question Steps** - 5 sequential category assessments
3. **Results Dashboard** - Comprehensive visualization of scores
4. **PDF Export** - Downloadable report generation

### Scoring System
- Each question scored 1-5
- Category score: Sum of 4 questions (max 20)
- Overall score: Percentage of total possible points (max 100)
- Maturity level determined by overall percentage

### Recommendation Engine
- Analyzes category scores
- Provides targeted recommendations for areas scoring below 70%
- Prioritizes critical areas (below 40%)
- Actionable insights for improvement

## 🎯 Usage

1. **Start Assessment** - Read the introduction and begin
2. **Answer Questions** - Select one option for each question
3. **Navigate** - Use Previous/Next buttons to move between categories
4. **View Results** - See comprehensive analysis with radar chart
5. **Download Report** - Generate and save PDF for future reference
6. **Restart** - Begin a new assessment anytime

## 📈 Maturity Levels

| Level | Score Range | Description |
|-------|-------------|-------------|
| Digital Leader | 90-100% | Forefront of digital transformation |
| Digital Advanced | 70-89% | Strong capabilities with optimization opportunities |
| Digital Intermediate | 50-69% | Solid foundation with advancement potential |
| Digital Emerging | 30-49% | Beginning digital journey |
| Digital Beginner | 0-29% | Significant transformation needed |

## 🎨 Customization

### Modify Questions
Edit `lib/questions.ts` to customize:
- Question text
- Answer options
- Scoring values
- Categories

### Adjust Styling
Modify `app/globals.css` to change:
- Color gradients
- Animation timings
- Typography
- Spacing

### PDF Report Layout
Edit `lib/pdfGenerator.ts` to customize:
- Report structure
- Visual elements
- Branding
- Content sections

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is open source and available for educational and commercial use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💡 Future Enhancements

- Multi-language support
- Historical tracking of assessments
- Comparison with industry benchmarks
- Team collaboration features
- Integration with analytics platforms
- Custom branding options
- Email report delivery

## 📞 Support

For questions or support, please open an issue in the repository.

---

**Built with ❤️ using Next.js 14 and Tailwind CSS**

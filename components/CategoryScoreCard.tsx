'use client';

interface CategoryScoreCardProps {
  categoryName: string;
  description: string;
  score: number;
  maxScore: number;
  animationDelay: number;
  icon: string;
}

export default function CategoryScoreCard({
  categoryName,
  description,
  score,
  maxScore,
  animationDelay,
  icon,
}: CategoryScoreCardProps) {
  const percentage = (score / maxScore) * 100;

  return (
    <div
      className="card-gradient rounded-2xl shadow-xl p-7 card-hover animate-scale-in border border-white/20 relative overflow-hidden"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="absolute top-0 right-0 text-8xl opacity-5">{icon}</div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{icon}</div>
          <div className="text-right">
            <div className="text-3xl font-black text-gray-800">{score}<span className="text-xl text-gray-500">/{maxScore}</span></div>
            <div className="text-sm font-semibold text-gray-500">{percentage.toFixed(0)}%</div>
          </div>
        </div>
        <h3 className="text-lg font-bold mb-3 text-gray-800">{categoryName}</h3>
        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full transition-all duration-1000 shadow-lg"
              style={{
                width: `${percentage}%`,
                background: percentage >= 70 
                  ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)' 
                  : percentage >= 50 
                  ? 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)' 
                  : percentage >= 30 
                  ? 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)' 
                  : 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)'
              }}
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

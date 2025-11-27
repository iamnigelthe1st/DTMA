'use client';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  categories: { id: string; name: string }[];
}

export default function ProgressBar({ currentStep, totalSteps, categories }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-10 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-xl">Step {currentStep + 1}</span>
          <span className="text-white/60 text-lg">of {totalSteps}</span>
        </div>
        <div className="px-5 py-2 bg-white/20 backdrop-blur-md rounded-full">
          <span className="text-white font-bold text-lg">{Math.round(progress)}%</span>
        </div>
      </div>
      <div className="h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out shadow-lg"
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Step indicators */}
      <div className="flex justify-between mt-3">
        {categories.map((cat, idx) => (
          <div key={cat.id} className={`text-center transition-all duration-300 ${idx <= currentStep ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${idx < currentStep ? 'bg-green-400' : idx === currentStep ? 'bg-blue-400 animate-pulse' : 'bg-white/40'}`}></div>
            <div className="text-white/80 text-xs font-medium hidden md:block">{cat.name.split(' ')[0]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <React.Fragment key={stepNumber}>
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
                ${isCompleted 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                  : isCurrent 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg ring-4 ring-blue-100' 
                    : 'bg-gray-200 text-gray-500'
                }
              `}>
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  stepNumber
                )}
              </div>
              
              {stepNumber < totalSteps && (
                <div className={`
                  w-8 h-0.5 transition-all duration-300
                  ${stepNumber < currentStep ? 'bg-green-500' : 'bg-gray-200'}
                `} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
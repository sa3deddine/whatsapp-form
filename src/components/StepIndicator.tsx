import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        
        return (
          <React.Fragment key={stepNumber}>
            <div className={`step-item ${isCompleted ? 'completed' : isCurrent ? 'current' : 'pending'}`}>
              {isCompleted ? '✓' : stepNumber}
            </div>
            
            {stepNumber < totalSteps && (
              <div className={`step-connector ${stepNumber < currentStep ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
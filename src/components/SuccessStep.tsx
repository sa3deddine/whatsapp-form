import React from 'react';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { FormData } from './AuthForm';

interface SuccessStepProps {
  formData: FormData;
}

const SuccessStep: React.FC<SuccessStepProps> = ({ formData }) => {
  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">الدعوة للانضمام إلى مجموعة</h2>
        <p className="text-gray-600">اتبع هذا الرابط للانضمام</p>
      </div>

      <button className="w-full bg-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
        الانضمام إلى الدردشة
      </button>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">اتبع هذا الرابط للانضمام</p>
        <p className="text-xs text-emerald-600 mt-2">استخدم واتساب ويب</p>
      </div>
    </div>
  );
};

export default SuccessStep;
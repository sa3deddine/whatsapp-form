import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorStepProps {
  onRestart: () => void;
}

const ErrorStep: React.FC<ErrorStepProps> = ({ onRestart }) => {
  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-rose-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">رمز خاطئ غير صحيح</h2>
        <p className="text-gray-600">تحقق من رمزك ثم أعد المحاولة</p>
      </div>

      <button
        onClick={onRestart}
        className="w-full bg-gray-100 text-gray-800 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <RotateCcw className="w-5 h-5" />
        <span>العودة إلى الواجهة الأولى</span>
      </button>
    </div>
  );
};

export default ErrorStep;




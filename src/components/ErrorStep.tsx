import React from 'react';

interface ErrorStepProps {
  onRestart: () => void;
}

const ErrorStep: React.FC<ErrorStepProps> = ({ onRestart }) => {
  return (
    <div className="form-card animate-fade-in">
      <div className="form-content">
        <div className="form-icon" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>⚠️</div>
        <h2 className="form-title">رمز خاطئ غير صحيح</h2>
        <p className="form-subtitle">تحقق من رمزك ثم أعد المحاولة</p>
        
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          border: '1px solid rgba(239, 68, 68, 0.2)', 
          borderRadius: '12px', 
          padding: '1.5rem', 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
          <p style={{ color: '#dc2626', fontSize: '1rem', fontWeight: '500', margin: 0 }}>
            لم يتم التحقق من الرمز بنجاح
          </p>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
            يرجى المحاولة مرة أخرى
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onRestart}
            className="btn btn-primary btn-full"
            style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
          >
            <span>🔄</span>
            <span>العودة إلى الواجهة الأولى</span>
          </button>
          
          <div style={{ marginTop: '1.5rem' }}>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              هل تحتاج إلى مساعدة؟
            </p>
            <a href="#" className="link" style={{ color: '#3b82f6' }}>
              اتصل بنا للحصول على الدعم
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorStep;
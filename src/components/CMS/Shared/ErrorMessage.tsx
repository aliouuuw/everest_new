import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center">
        <FaExclamationTriangle className="text-red-400 mr-3" />
        <div>
          <p className="text-sm text-red-800">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;

import { useLocation } from '@tanstack/react-router';
import { FaWhatsapp } from 'react-icons/fa';

export const WhatsAppButton: React.FC = () => {
  const location = useLocation();
  
  // Check if user is in admin portal
  const isInAdminPortal = location.pathname.startsWith('/admin');
  
  // Hide WhatsApp button if in admin portal
  if (isInAdminPortal) {
    return null;
  }

  const handleClick = () => {
    // Replace with actual WhatsApp number
    const phoneNumber = '+221000000000';
    const message = encodeURIComponent('Bonjour, je souhaite en savoir plus sur vos services d\'investissement.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
      aria-label="Contacter Everest Finance sur WhatsApp"
      title="Discuter sur WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6" />
    </button>
  );
};


// frontend/src/components/WhatsAppButton.jsx

import React from 'react';
import './WhatsAppButton.css';

function WhatsAppButton({ numero }) {
  // O link do WhatsApp é sempre neste formato
  const whatsappUrl = `https://wa.me/${numero}`;

  return (
    <a 
      href={whatsappUrl} 
      className="whatsapp-float" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      {/* Usaremos um SVG (imagem vetorial) para o ícone do WhatsApp, 
          pois ele se adapta a qualquer tamanho sem perder qualidade. */}
      <svg viewBox="0 0 32 32" className="whatsapp-icon">
        <path 
          d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.546-.577-1.45-1.16-1.45-.586 0-1.16.21-1.36.42-.2.21-.577.63-.577 1.29 0 .658.63 1.45 1.002 1.962.37  .515.99 1.49 2.162 2.622l.142.142c1.46 1.448 3.255 2.095 4.225 2.095.836 0 1.356-.37 1.356-1.21 0-.84-.99-1.21-1.46-1.21z M16 2.003C7.16 2.003 0 9.162 0 18.002c0 3.04.825 5.862 2.296 8.293l-1.63 5.955 6.115-1.59c2.338 1.36 5.06 2.11 7.942 2.11 8.84 0 16-7.16 16-16.002C32 9.163 24.84 2.003 16 2.003z" 
          fillRule="evenodd"
        ></path>
      </svg>
    </a>
  );
}

export default WhatsAppButton;
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ChatScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getChat, sendMessage, activeOrder } = useApp();
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // En una app real, sabríamos quién es el usuario actual por el Auth
  // Aquí simulamos ser el cliente por defecto, o el rider si venimos del dashboard
  // Para simplificar la demo visual, alternaremos el remitente al enviar
  const [currentUserType, setCurrentUserType] = useState<'user' | 'rider'>('user');

  const chat = getChat(id || '');

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !id) return;
    
    sendMessage(id, inputText, currentUserType);
    setInputText('');
  };

  if (!chat) {
    return <div className="p-8 text-white">Chat no encontrado</div>;
  }

  return (
    <div className="bg-[#f8f6f5] dark:bg-[#120a07] h-screen flex flex-col font-display">
      {/* Header */}
      <div className="bg-white dark:bg-[#1e130f] p-4 flex items-center shadow-sm z-10 border-b border-gray-100 dark:border-white/5">
        <Link to={-1 as any} className="mr-3 text-slate-900 dark:text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex-1">
          <h2 className="font-bold text-slate-900 dark:text-white">
             {currentUserType === 'user' ? 'Repartidor' : 'Cliente'}
          </h2>
          <p className="text-xs text-[#f46325] font-medium">
             Pedido #{chat.orderId} • En curso
          </p>
        </div>
        <button 
            onClick={() => setCurrentUserType(prev => prev === 'user' ? 'rider' : 'user')}
            className="text-xs bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-slate-600 dark:text-gray-300"
        >
            Ver como: {currentUserType === 'user' ? 'Cliente' : 'Rider'}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map((msg) => {
          const isMe = msg.sender === currentUserType;
          const isSystem = msg.sender === 'system';
          
          if (isSystem) {
             return (
                 <div key={msg.id} className="flex justify-center my-4">
                     <span className="text-xs text-gray-400 bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full">
                         {msg.text}
                     </span>
                 </div>
             )
          }

          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  isMe 
                    ? 'bg-[#f46325] text-white rounded-br-none' 
                    : 'bg-white dark:bg-[#2d1e17] text-slate-800 dark:text-gray-200 border border-gray-100 dark:border-white/5 rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-white/70' : 'text-gray-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="bg-white dark:bg-[#1e130f] p-4 flex gap-2 border-t border-gray-100 dark:border-white/5">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-gray-100 dark:bg-[#2d1e17] border-none rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-[#f46325] text-slate-900 dark:text-white"
        />
        <button 
          type="submit"
          className="bg-[#f46325] text-white p-3 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined filled">send</span>
        </button>
      </form>
    </div>
  );
};

export default ChatScreen;
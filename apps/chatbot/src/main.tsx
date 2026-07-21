import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatbotRemote from './ChatbotRemote';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChatbotRemote apiBaseUrl={import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'} />
  </React.StrictMode>
);

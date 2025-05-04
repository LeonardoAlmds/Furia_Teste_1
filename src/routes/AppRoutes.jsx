import { Routes, Route, Navigate } from 'react-router-dom';
import Chatbot from '../pages/Chatbot/Chatbot';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Chatbot />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

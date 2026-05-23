// src/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import Ecommerce from './pages/Ecommerce'; // Change to match your file name

const Placeholder = ({ title }: { title: string }) => <h1 className="text-2xl font-bold">{title}</h1>;

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Placeholder title="Dashboard Home" />} />
      <Route path="/ecommerce" element={<Ecommerce />} /> {/* Match the import name */}
      <Route path="/analytics" element={<Placeholder title="Analytics Page" />} />
      {/* ... rest of your routes */}
    </Routes>
  );
};
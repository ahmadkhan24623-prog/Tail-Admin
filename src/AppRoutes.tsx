import { Routes, Route } from 'react-router-dom';
import Ecommerce from './pages/Ecommerce'; 
import Analytics from './pages/Analytics';
import Marketing from './pages/Marketing';
import Stock from './pages/Stock';

export const AppRoutes = () => {
 return (
    <Routes>
      <Route path="/" element={<Ecommerce />} /> 
      
      <Route path="/ecommerce" element={<Ecommerce />} /> 
      
      <Route path="/analytics" element={<Analytics />} />

      <Route path="/marketing" element={<Marketing />} />

      <Route path="/stocks" element={<Stock />} />
    </Routes>
  ); 
};
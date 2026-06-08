import { Routes, Route } from 'react-router-dom';
import Ecommerce from './pages/Ecommerce'; 

const Placeholder = ({ title }: { title: string }) => <h1 className="text-2xl font-bold">{title}</h1>;

export const AppRoutes = () => {
 return (
    <Routes>
      <Route path="/" element={<Ecommerce />} /> 
      
      <Route path="/ecommerce" element={<Ecommerce />} /> 
      
      <Route path="/analytics" element={<Placeholder title="Analytics Page" />} />
    </Routes>
  ); 
};
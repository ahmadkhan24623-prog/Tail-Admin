// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './features/navagation/DashboardLayout';

// Placeholder components - create these in a 'pages' folder later!
const DashboardPage = () => <h1 className="text-2xl font-bold">Dashboard</h1>;
const AIAssistantPage = () => <h1 className="text-2xl font-bold">AI Assistant Page</h1>;
const EcommercePage = () => <h1 className="text-2xl font-bold">E-commerce Page</h1>;

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<DashboardPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/ecommerce" element={<EcommercePage />} />
          
          {/* Add more routes here as you build them */}
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
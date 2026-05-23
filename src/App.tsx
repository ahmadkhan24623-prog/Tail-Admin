// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { DashboardLayout } from './features/navagation/DashboardLayout';
import { AppRoutes } from './AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <AppRoutes />
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
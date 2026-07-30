// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { DashboardLayout } from './features/navagation/DashboardLayout';
import { AppRoutes } from './AppRoutes';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <DashboardLayout>
          <AppRoutes />
        </DashboardLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
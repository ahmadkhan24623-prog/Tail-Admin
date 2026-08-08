import { Routes, Route } from 'react-router-dom';
import Ecommerce from './pages/Ecommerce';
import Analytics from './pages/Analytics';
import Marketing from './pages/Marketing';
import Stock from './pages/Stock';
import Crm from './pages/Crm';
import SaaS from './pages/SaaS';
import Logistics from './pages/Logistics';
import Ai from './pages/Ai';
import Sales from './pages/Sales';
import Finance from './pages/Finance';
import AiAssistant from './pages/AiAssistant';
import EcommerceMain from './pages/EcommerceMain';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import Forms from './pages/Forms';
import Tables from './pages/Tables';
import Pages from './pages/Pages';
import Layouts from './pages/Layouts';
import Chat from './pages/Chat';
import Support from './pages/Support';
import Email from './pages/Email';
import Charts from './pages/Charts';
import UiElements from './pages/UiElements';
import Auth from './pages/Auth';

export const AppRoutes = () => {
 return (
    <Routes>
      <Route path="/" element={<Ecommerce />} />

      <Route path="/ecommerce" element={<Ecommerce />} />

      <Route path="/analytics" element={<Analytics />} />

      <Route path="/marketing" element={<Marketing />} />

      <Route path="/stocks" element={<Stock />} />

      <Route path="/crm" element={<Crm />} />

      <Route path="/saas" element={<SaaS />} />

      <Route path="/logistics" element={<Logistics />} />

      <Route path="/ai" element={<Ai />} />

      <Route path="/sales" element={<Sales />} />

      <Route path="/finance" element={<Finance />} />

      <Route path="/ai-assistant" element={<AiAssistant />} />

      <Route path="/ecommerce-main" element={<EcommerceMain />} />

      <Route path="/calendar" element={<Calendar />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/tasks" element={<Tasks />} />

      <Route path="/forms" element={<Forms />} />

      <Route path="/tables" element={<Tables />} />

      <Route path="/pages" element={<Pages />} />

      <Route path="/layouts" element={<Layouts />} />

      <Route path="/chat" element={<Chat />} />

      <Route path="/support" element={<Support />} />

      <Route path="/email" element={<Email />} />

      <Route path="/charts" element={<Charts />} />

      <Route path="/ui-elements" element={<UiElements />} />

      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import HomePage from './pages/Home';
import UserManagementPage from './pages/users/UserManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota para a página de Login (exemplo) */}
        {/* <Route path="/login" element={ <LoginPage /> } /> */}

        {/* Rotas que usam o Layout com a Sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/usuarios" element={<UserManagementPage />} />
          {/* Adicione outras rotas aqui, como "/relatorios", etc. */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
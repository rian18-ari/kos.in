import Dashboard from './pages/dashboard/page';
import KamarPenghuni from './pages/kamar_penghuni/page';
import TagihanMeteran from './pages/tagihan_meteran/page';
import Komplain from './pages/komplain/page';
import { Route, Routes } from 'react-router';
import MainLayout from './MainLayout';

function App() {
 return (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Dashboard />}></Route>
      <Route path="/kamar-penghuni" element={<KamarPenghuni />}></Route>
      <Route path="/tagihan-meteran" element={<TagihanMeteran />}></Route>
      <Route path="/komplain" element={<Komplain />}></Route>
    </Route>
  </Routes>
 )
}

export default App;

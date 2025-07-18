import './index.css';
import { Routes, Route } from "react-router-dom";
import WeddingInvitation from './WeddingInvitation';

function App() {
  return (
    <Routes>
      {/* Ruta principal (ej. landing) */}
      <Route path="/" element={<WeddingInvitation />} />

      {/* Ruta personalizada por apellido */}
      <Route path="/:apellido" element={<WeddingInvitation />} />
    </Routes>
  );
}

export default App;

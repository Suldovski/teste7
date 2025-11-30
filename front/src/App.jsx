import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Reserva from "./components/pages/hotel/reserva";
import Recepcao from "./components/pages/hotel/recepcao";
import Servico from "./components/pages/hotel/servico";
import Pagamento from "./components/pages/hotel/pagamento";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav style={{ background: "#333", padding: "10px" }}>
          <Link to="/" style={{ color: "white", margin: "0 10px" }}>Home</Link>
          <Link to="/reserva" style={{ color: "white", margin: "0 10px" }}>Reserva</Link>
          <Link to="/recepcao" style={{ color: "white", margin: "0 10px" }}>Recepção</Link>
          <Link to="/servico" style={{ color: "white", margin: "0 10px" }}>Serviço de Quarto</Link>
          <Link to="/pagamento" style={{ color: "white", margin: "0 10px" }}>Pagamento</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Sistema de Hotelaria</h1>} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/recepcao" element={<Recepcao />} />
          <Route path="/servico" element={<Servico />} />
          <Route path="/pagamento" element={<Pagamento />} />
        </Routes>

        <footer style={{ textAlign: "center", marginTop: "50px", padding: "20px", background: "#f0f0f0" }}>
          Desenvolvido por Luan Suldovski
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

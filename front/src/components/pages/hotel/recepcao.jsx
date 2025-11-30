import { useState, useEffect } from "react";
import axios from "axios";

function Recepcao() {
  const [reservas, setReservas] = useState([]);

  const carregarReservas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reserva/listar");
      // Filtrar apenas reservas com status "Reservado"
      const reservasFiltradas = response.data.filter(r => r.status === "Reservado");
      setReservas(reservasFiltradas);
    } catch (error) {
      alert("Erro ao carregar reservas: " + error.message);
    }
  };

  useEffect(() => {
    carregarReservas();
  }, []);

  const confirmarChegada = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/reserva/checkin/${id}`);
      alert("Check-in realizado com sucesso!");
      carregarReservas(); // Recarregar lista
    } catch (error) {
      alert("Erro ao realizar check-in: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Recepção - Check-in</h2>
      <p>Reservas aguardando chegada:</p>
      
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th>#</th>
            <th>Hóspede</th>
            <th>Tipo de Quarto</th>
            <th>Data Entrada</th>
            <th>Data Saída</th>
            <th>Valor Diária</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservas.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>Nenhuma reserva aguardando check-in</td>
            </tr>
          ) : (
            reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td>{reserva.hospede}</td>
                <td>{reserva.tipoQuarto}</td>
                <td>{new Date(reserva.dataEntrada).toLocaleString()}</td>
                <td>{new Date(reserva.dataSaida).toLocaleString()}</td>
                <td>R$ {reserva.valorDiaria.toFixed(2)}</td>
                <td>{reserva.status}</td>
                <td>
                  <button
                    onClick={() => confirmarChegada(reserva.id)}
                    style={{ padding: "5px 10px", background: "#007bff", color: "white", border: "none", cursor: "pointer" }}
                  >
                    Confirmar Chegada
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Recepcao;

import { useState, useEffect } from "react";
import axios from "axios";

function Pagamento() {
  const [hospedados, setHospedados] = useState([]);

  const carregarHospedados = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reserva/listar");
      // Filtrar apenas hóspedes com status "Hospedado"
      const hospedesFiltrados = response.data.filter(r => r.status === "Hospedado");
      setHospedados(hospedesFiltrados);
    } catch (error) {
      alert("Erro ao carregar hóspedes: " + error.message);
    }
  };

  useEffect(() => {
    carregarHospedados();
  }, []);

  const fecharConta = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/reserva/checkout/${id}`);
      
      // Exibir o valor total calculado pelo back-end
      const reserva = response.data;
      alert(`Conta Fechada!\n\nTotal a pagar: R$ ${reserva.valorTotal.toFixed(2)}\n\nDetalhes:\n- Diárias: R$ ${(reserva.valorTotal - reserva.valorConsumo).toFixed(2)}\n- Consumo: R$ ${reserva.valorConsumo.toFixed(2)}`);
      
      carregarHospedados(); // Recarregar lista
    } catch (error) {
      alert("Erro ao realizar check-out: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Pagamento - Check-out</h2>
      <p>Hóspedes prontos para sair:</p>
      
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th>#</th>
            <th>Hóspede</th>
            <th>Tipo de Quarto</th>
            <th>Data Entrada</th>
            <th>Data Saída</th>
            <th>Valor Diária</th>
            <th>Consumo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {hospedados.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>Nenhum hóspede pronto para check-out</td>
            </tr>
          ) : (
            hospedados.map((hospede) => (
              <tr key={hospede.id}>
                <td>{hospede.id}</td>
                <td>{hospede.hospede}</td>
                <td>{hospede.tipoQuarto}</td>
                <td>{new Date(hospede.dataEntrada).toLocaleString()}</td>
                <td>{new Date(hospede.dataSaida).toLocaleString()}</td>
                <td>R$ {hospede.valorDiaria.toFixed(2)}</td>
                <td>R$ {hospede.valorConsumo.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => fecharConta(hospede.id)}
                    style={{ padding: "5px 10px", background: "#dc3545", color: "white", border: "none", cursor: "pointer" }}
                  >
                    Fechar Conta
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

export default Pagamento;

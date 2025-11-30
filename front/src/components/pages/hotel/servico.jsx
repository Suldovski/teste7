import { useState, useEffect } from "react";
import axios from "axios";

function Servico() {
  const [hospedados, setHospedados] = useState([]);
  const [valores, setValores] = useState({});

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

  const handleValorChange = (id, valor) => {
    setValores({ ...valores, [id]: valor });
  };

  const lancarConsumo = async (id) => {
    const valor = parseFloat(valores[id]);
    
    if (!valor || valor <= 0) {
      alert("Por favor, insira um valor válido!");
      return;
    }

    try {
      await axios.patch(`http://localhost:5000/api/reserva/consumir/${id}`, {
        valor: valor
      });
      
      alert(`Consumo de R$ ${valor.toFixed(2)} lançado com sucesso!`);
      setValores({ ...valores, [id]: "" });
      carregarHospedados(); // Recarregar para atualizar valorConsumo
    } catch (error) {
      alert("Erro ao lançar consumo: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Serviço de Quarto</h2>
      <p>Hóspedes ativos - Lançamento de consumo:</p>
      
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th>#</th>
            <th>Hóspede</th>
            <th>Tipo de Quarto</th>
            <th>Consumo Atual</th>
            <th>Lançar Valor (R$)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {hospedados.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>Nenhum hóspede ativo no momento</td>
            </tr>
          ) : (
            hospedados.map((hospede) => (
              <tr key={hospede.id}>
                <td>{hospede.id}</td>
                <td>{hospede.hospede}</td>
                <td>{hospede.tipoQuarto}</td>
                <td>R$ {hospede.valorConsumo.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={valores[hospede.id] || ""}
                    onChange={(e) => handleValorChange(hospede.id, e.target.value)}
                    placeholder="0.00"
                    style={{ padding: "5px", width: "100px" }}
                  />
                </td>
                <td>
                  <button
                    onClick={() => lancarConsumo(hospede.id)}
                    style={{ padding: "5px 10px", background: "#ffc107", color: "black", border: "none", cursor: "pointer" }}
                  >
                    Lançar
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

export default Servico;

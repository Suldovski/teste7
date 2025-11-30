import { useState } from "react";
import axios from "axios";

function Reserva() {
  const [hospede, setHospede] = useState("");
  const [tipoQuarto, setTipoQuarto] = useState("Standard");
  const [dataEntrada, setDataEntrada] = useState("");
  const [dataSaida, setDataSaida] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/api/reserva/criar", {
        hospede,
        tipoQuarto,
        dataEntrada,
        dataSaida
      });
      
      alert("Reserva criada com sucesso!");
      setHospede("");
      setTipoQuarto("Standard");
      setDataEntrada("");
      setDataSaida("");
    } catch (error) {
      alert("Erro ao criar reserva: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Criar Reserva</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Nome do Hóspede:</label><br />
          <input
            type="text"
            value={hospede}
            onChange={(e) => setHospede(e.target.value)}
            required
            style={{ padding: "5px", width: "300px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Tipo de Quarto:</label><br />
          <select
            value={tipoQuarto}
            onChange={(e) => setTipoQuarto(e.target.value)}
            style={{ padding: "5px", width: "312px" }}
          >
            <option value="Standard">Standard (R$ 150,00)</option>
            <option value="Luxo">Luxo (R$ 300,00)</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Data de Entrada:</label><br />
          <input
            type="datetime-local"
            value={dataEntrada}
            onChange={(e) => setDataEntrada(e.target.value)}
            required
            style={{ padding: "5px", width: "300px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Data de Saída:</label><br />
          <input
            type="datetime-local"
            value={dataSaida}
            onChange={(e) => setDataSaida(e.target.value)}
            required
            style={{ padding: "5px", width: "300px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px", background: "#28a745", color: "white", border: "none", cursor: "pointer" }}>
          Criar Reserva
        </button>
      </form>
    </div>
  );
}

export default Reserva;

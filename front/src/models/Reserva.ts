export interface Reserva {
  id?: number;
  hospede: string;
  tipoQuarto: string;
  dataEntrada: string;
  dataSaida: string;
  valorDiaria: number;
  valorConsumo: number;
  valorTotal: number;
  status: string;
}

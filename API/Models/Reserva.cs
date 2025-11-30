namespace API.Models;

public class Reserva
{
    public int Id { get; set; }
    public string Hospede { get; set; } = string.Empty;
    public string TipoQuarto { get; set; } = string.Empty;
    public DateTime DataEntrada { get; set; }
    public DateTime DataSaida { get; set; }
    public double ValorDiaria { get; set; }
    public double ValorConsumo { get; set; }
    public double ValorTotal { get; set; }
    public string Status { get; set; } = "Reservado";
}

# API Hotel - Luan Suldovski

Sistema de gerenciamento de reservas, check-in, check-out e consumo de hotel.

## Tecnologias
- .NET 8 Minimal API
- SQLite + Entity Framework Core
- Banco: LuanSuldovski.db

## Endpoints

### POST /api/reserva/criar
Cria nova reserva. Calcula automaticamente o valor da diária (Standard: R$ 150, Luxo: R$ 300).

### PATCH /api/reserva/checkin/{id}
Confirma entrada do hóspede. Altera status de "Reservado" para "Hospedado".

### PATCH /api/reserva/consumir/{id}
Adiciona valor ao consumo do hóspede. Body: `{"valor": 55.90}`

### PATCH /api/reserva/checkout/{id}
Finaliza estadia. Calcula total: (dias × diária) + consumo.

### GET /api/reserva/listar
Lista todas as reservas.

## Porta
http://localhost:5000

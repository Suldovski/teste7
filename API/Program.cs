using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.WebHost.UseUrls("http://localhost:5000");

var app = builder.Build();

app.UseCors("AllowAll");

app.MapPost("/api/reserva/criar", async (AppDataContext ctx, Reserva reserva) =>
{
    reserva.ValorDiaria = reserva.TipoQuarto == "Luxo" ? 300.00 : 150.00;
    reserva.ValorConsumo = 0;
    reserva.ValorTotal = 0;
    reserva.Status = "Reservado";

    ctx.Reservas.Add(reserva);
    await ctx.SaveChangesAsync();

    return Results.Created($"/api/reserva/{reserva.Id}", reserva);
});

app.MapPatch("/api/reserva/checkin/{id}", async (AppDataContext ctx, int id) =>
{
    var reserva = await ctx.Reservas.FindAsync(id);

    if (reserva == null)
        return Results.NotFound("Reserva não encontrada");

    if (reserva.Status != "Reservado")
        return Results.BadRequest("Reserva não está com status Reservado");

    reserva.Status = "Hospedado";
    await ctx.SaveChangesAsync();

    return Results.Ok(reserva);
});

app.MapPatch("/api/reserva/consumir/{id}", async (AppDataContext ctx, int id, ConsumoRequest request) =>
{
    var reserva = await ctx.Reservas.FindAsync(id);

    if (reserva == null)
        return Results.NotFound("Reserva não encontrada");

    if (reserva.Status != "Hospedado")
        return Results.BadRequest("Só é possível lançar consumo para hóspedes com status Hospedado");

    reserva.ValorConsumo += request.Valor;
    await ctx.SaveChangesAsync();

    return Results.Ok(reserva);
});

app.MapPatch("/api/reserva/checkout/{id}", async (AppDataContext ctx, int id) =>
{
    var reserva = await ctx.Reservas.FindAsync(id);

    if (reserva == null)
        return Results.NotFound("Reserva não encontrada");

    if (reserva.Status != "Hospedado")
        return Results.BadRequest("Só é possível fazer checkout de hóspedes com status Hospedado");

    var dias = (reserva.DataSaida - reserva.DataEntrada).Days;
    if (dias == 0) dias = 1;

    var valorDasDiarias = dias * reserva.ValorDiaria;
    reserva.ValorTotal = valorDasDiarias + reserva.ValorConsumo;
    reserva.Status = "Finalizado";

    await ctx.SaveChangesAsync();

    return Results.Ok(reserva);
});

app.MapGet("/api/reserva/listar", async (AppDataContext ctx) =>
{
    var reservas = await ctx.Reservas.ToListAsync();
    return Results.Ok(reservas);
});

app.Run();

public record ConsumoRequest(double Valor);

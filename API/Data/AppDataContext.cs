using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Data;

public class AppDataContext : DbContext
{
    public DbSet<Reserva> Reservas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=LuanSuldovski.db");
    }
}

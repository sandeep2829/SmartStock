using Microsoft.EntityFrameworkCore;
using SmartStockAPI.Models;

namespace SmartStockAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; } = null!;
    }
}

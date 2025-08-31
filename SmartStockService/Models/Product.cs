using System.ComponentModel.DataAnnotations;

namespace SmartStockAPI.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public string Unit { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public DateTime ExpiryDate { get; set; }
    }
}

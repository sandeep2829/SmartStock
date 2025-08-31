using Dapper;
using Npgsql;
using SmartStockAPI.Models;
using Microsoft.Extensions.Configuration;

namespace SmartStockAPI.Services
{
    public class ProductService
    {
        private readonly string _connectionString;

        public ProductService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }

        // Helper: get a new connection
        private NpgsqlConnection GetConnection()
        {
            return new NpgsqlConnection(_connectionString);
        }

        // GET all products
        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            using var conn = GetConnection();
            var query = $@"SELECT * FROM ""Products""";
            Console.WriteLine("Executing query: " + query);

            return await conn.QueryAsync<Product>(query);
        }

        // GET by Id
        public async Task<Product> GetByIdAsync(int id)
        {
            using var conn = GetConnection();
            var query = $@"SELECT * FROM ""Products"" WHERE ""Id"" = {id}";
            Console.WriteLine("Executing query: " + query);

            return await conn.QueryFirstOrDefaultAsync<Product>(query);
        }

        // ADD product
        public async Task<Product> AddAsync(Product product)
        {
            using var conn = GetConnection();
            var query = $@"
                INSERT INTO ""Products"" 
                (""Name"", ""Quantity"", ""Unit"", ""Category"", ""ExpiryDate"")
                VALUES ('{product.Name}', {product.Quantity}, '{product.Unit}', '{product.Category}', '{product.ExpiryDate:yyyy-MM-dd}')
                RETURNING ""Id""";
            Console.WriteLine("Executing query: " + query);

            product.Id = await conn.ExecuteScalarAsync<int>(query);
            return product;
        }

        // UPDATE product
        public async Task<bool> UpdateAsync(Product product)
        {
            using var conn = GetConnection();
            var query = $@"
                UPDATE ""Products"" 
                SET 
                    ""Name"" = '{product.Name}',
                    ""Quantity"" = {product.Quantity},
                    ""Unit"" = '{product.Unit}',
                    ""Category"" = '{product.Category}',
                    ""ExpiryDate"" = '{product.ExpiryDate:yyyy-MM-dd}'
                WHERE ""Id"" = {product.Id}";
            Console.WriteLine("Executing query: " + query);

            var affected = await conn.ExecuteAsync(query);
            return affected > 0;
        }

        // DELETE product
        public async Task<bool> DeleteAsync(int id)
        {
            using var conn = GetConnection();
            var query = $@"DELETE FROM ""Products"" WHERE ""Id"" = {id}";
            Console.WriteLine("Executing query: " + query);

            var affected = await conn.ExecuteAsync(query);
            return affected > 0;
        }
    }
}

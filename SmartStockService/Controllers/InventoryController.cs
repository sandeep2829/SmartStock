using Microsoft.AspNetCore.Mvc;
using SmartStockAPI.Models;
using SmartStockAPI.Services;

namespace SmartStockAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _service;

        public ProductController(ProductService service)
        {
            _service = service;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll()
        {
            var products = await _service.GetAllAsync();
            return Ok(products);
        }

        [HttpGet("GetById")]
        public async Task<ActionResult<Product>> GetById([FromQuery] int id)
        {
            var product = await _service.GetByIdAsync(id);
            if (product == null) return NotFound($"Product with Id {id} not found.");
            return Ok(product);
        }

        [HttpPost("Add")]
        public async Task<ActionResult<Product>> Add(Product product)
        {
            var added = await _service.AddAsync(product);
            return CreatedAtAction(nameof(GetById), new { id = added.Id }, added);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromQuery] int id, Product product)
        {
            if (id != product.Id) return BadRequest("Id mismatch");

            var updated = await _service.UpdateAsync(product);
            if (!updated) return NotFound();

            return NoContent();
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted) return NotFound();

            return NoContent();
        }
    }
}

// File: backend/ProductComparisonApi/Controllers/ProductsController.cs
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using ProductComparisonApi.Models; // Asegúrate de que el namespace coincida

namespace ProductComparisonApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public ProductsController(IWebHostEnvironment env)
        {
            _env = env;
        }

        /// <summary>
        /// Obtiene una lista de productos para comparación desde un archivo JSON local.
        /// </summary>
        /// <returns>Una lista de objetos Producto.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            // Construye la ruta al archivo JSON
            var filePath = Path.Combine(_env.ContentRootPath, "Data", "products.json");

            // Verifica si el archivo existe
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("Product data file not found."); // Manejo básico de error
            }

            try
            {
                // Lee el contenido del archivo
                var jsonString = await System.IO.File.ReadAllTextAsync(filePath);
                // Deserializa el JSON a una lista de productos
                var products = JsonSerializer.Deserialize<List<Product>>(jsonString, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true // Permite que las propiedades del JSON sean case-insensitive
                });

                if (products == null || !products.Any())
                {
                    return NoContent(); // No hay contenido si la lista está vacía
                }

                return Ok(products); // Retorna los productos
            }
            catch (JsonException ex)
            {
                // Manejo de errores si el JSON no es válido
                return StatusCode(500, $"Error deserializing product data: {ex.Message}");
            }
            catch (Exception ex)
            {
                // Manejo de otros errores inesperados
                return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
            }
        }
    }
}
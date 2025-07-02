// File: backend/ProductComparisonApi/Models/Product.cs
namespace ProductComparisonApi.Models
{
    public class Product
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public decimal OriginalPrice { get; set; }
        public string? Discount { get; set; }
        public double Rating { get; set; }
        public int Reviews { get; set; }
        public string? Seller { get; set; }
        public bool FreeShipping { get; set; }
        public Specifications? Specifications { get; set; }
    }

    public class Specifications
    {
        public string? Type { get; set; }
        public string? Connectivity { get; set; }
        public string? BatteryDuration { get; set; }
    }
}
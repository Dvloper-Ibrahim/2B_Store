using _2B_Store.Application.Services;
using _2B_Store.Application11.Services;
using _2B_Store.DTO;
using Microsoft.AspNetCore.Mvc;

namespace _2B_Store.MVC.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductServices _productService;
        private readonly ISubCategoryServices _subCategService;

        public ProductController(
            IProductServices productService,
            ISubCategoryServices subCategService
            )
        {
            _productService = productService;
            _subCategService = subCategService;
        }

        public async Task<IActionResult> allproducts()
        {
            var products = await _productService.GetAllProducts();
            return View(products);
        }

        public async Task<IActionResult> addNew()
        {
            var product = new ProductDTO();
            product.SubCategories = await _subCategService.GetAllSubCategories() ??
                new List<SubCategoryDTO>();
            return View(product);
        }

        [HttpPost]
        public async Task<IActionResult> addNew(ProductDTO prod)
        {
            if (ModelState.IsValid)
            {
                prod.IsAvailable = true;
                _productService.AddProduct(prod);
                return RedirectToAction("allproducts");
            }
            return await addNew();
        }

        public IActionResult CheckPriceValue(int Price)
        {
            return Price > 0 ? Json(true) : Json(false);
        }

        public IActionResult CheckStockValue(int Stock)
        {
            return Stock > 0 ? Json(true) : Json(false);
        }
    }
}

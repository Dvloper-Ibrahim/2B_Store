using _2B_Store.Application.Services;
using _2B_Store.Application11.Services;
using _2B_Store.DTO;
using Microsoft.AspNetCore.Mvc;

namespace _2B_Store.MVC.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductServices _productService;
        private readonly ISubCategoryServices _subCategoryServices;

        public ProductController(
            IProductServices productService,
            ISubCategoryServices subCategService
            )
        {
            _productService = productService;
            _subCategoryServices = subCategService;
        }

        public async Task<IActionResult> allproducts()
        {
            var products = await _productService.GetAllProducts();
            return View(products);
        }

        public async Task<IActionResult> addNew()
        {
            var product = new ProductDTO();
            product.SubCategories = await _subCategoryServices.GetAllSubCategories();
            return View(product);
        }

        [HttpPost]
        public async Task<IActionResult> addNew(ProductDTO prod)
        {
            if (ModelState.IsValid)
            {
                prod.IsAvailable = true;
                prod.Stock = (int)Math.Floor((decimal)prod.Stock);
                await _productService.AddProduct(prod);
                return RedirectToAction("allproducts");
            }
            return View(prod);
        }

        public IActionResult CheckPriceValue(decimal Price)
        {
            return Price > 0 ? Json(true) : Json(false);
        }

        public IActionResult CheckStockValue(decimal Stock)
        {
            return Stock > 0 ? Json(true) : Json(false);
        }

        public async Task<IActionResult> Edit(int id)
        {
            var product = await _productService.GetProductById(id);
            if (product == null)
                return NotFound();

            product.SubCategories = await _subCategoryServices.GetAllSubCategories();
            return View(product);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, ProductDTO productDTO)
        {
            if (ModelState.IsValid)
            {
                await _productService.UpdateProduct(id, productDTO);
                return RedirectToAction("allproducts");
            }
            return View(productDTO);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            await _productService.DeleteProduct(id);
            return RedirectToAction("allproducts");
        }
    }
}

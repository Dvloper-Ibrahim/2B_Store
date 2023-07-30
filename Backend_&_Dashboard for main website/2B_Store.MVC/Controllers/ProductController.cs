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
        private readonly IProductImageServices _productImageServices;

        public ProductController(
            IProductServices productService,
            ISubCategoryServices subCategService,
            IProductImageServices productImageServices
            )
        {
            _productService = productService;
            _subCategoryServices = subCategService;
            _productImageServices = productImageServices;
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
        public async Task<IActionResult> addNew(ProductDTO prod, IFormFile image)
        {
            if (ModelState.IsValid)
            {
                prod.IsAvailable = true;
                prod.Stock = (int)Math.Floor((decimal)prod.Stock);
                if (image != null && image.Length > 0)
                {
                    prod.Image = await SaveImageAsync(image);

                    //var productImg = new ProductImageDTO();
                    //productImg.ImageUrl = prod.Image;

                    var newProd = await _productService.AddProduct(prod);
                    //prod.Image.ProductId = newProd.Id;
                    //await _productImageServices.AddProductImage(productImg);
                    return RedirectToAction("allproducts");
                }
                else
                    ModelState.AddModelError("Image", "The image field is required");
            }
            prod.SubCategories = await _subCategoryServices.GetAllSubCategories();
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

            product.SubCategories = await _subCategoryServices.GetAllSubCategories();// ??
                //new List<SubCategoryDTO>();
            return View(product);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, ProductDTO productDTO, IFormFile image)
        {
            if (ModelState.IsValid)
            {
                productDTO.IsAvailable = true;
                productDTO.Stock = (int)Math.Floor((decimal)productDTO.Stock);
                if (image != null && image.Length > 0)
                {
                    productDTO.Image = await SaveImageAsync(image);

                    //var productImg = new ProductImageDTO();
                    //productImg.ImageUrl = productDTO.Image;
                    //productImg.ProductId = id;

                    //await _productImageServices.AddProductImage(productImg);
                    await _productService.UpdateProduct(id, productDTO);
                    return RedirectToAction("allproducts");
                }
                else
                    ModelState.AddModelError("Image", "The image field is required");
            }
            productDTO.SubCategories = await _subCategoryServices.GetAllSubCategories();
            return View(productDTO);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            await _productService.DeleteProduct(id);
            return RedirectToAction("allproducts");
        }

        private async Task<string> SaveImageAsync(IFormFile image)
        {
            string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);

            string imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "products", uniqueFileName);
            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            return "/images/products/" + uniqueFileName;
        }
    }
}

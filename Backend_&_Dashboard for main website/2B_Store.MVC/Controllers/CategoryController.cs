using _2B_Store.Application.Services;
using _2B_Store.DTO;
using Microsoft.AspNetCore.Mvc;

namespace _2B_Store.MVC.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ICategoryServices _categoryServices;
        public CategoryController(ICategoryServices categoryServices)
        {
            _categoryServices = categoryServices;
        }

        public async Task<IActionResult> Index()
        {
            var categories = await _categoryServices.GetAllCategories();
            return View(categories);
        }

        public async Task<IActionResult> Edit(int id)
        {
            var category = await _categoryServices.GetCategoryById(id);
            if (category == null)
                return NotFound();
            return View(category);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, CategoryDTO categoryDTO, IFormFile image)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (image != null && image.Length > 0)
                        categoryDTO.Image = await SaveImageAsync(image);

                    var updatedCategory = await _categoryServices.UpdateCategory(id, categoryDTO);
                    return RedirectToAction("Index");
                }
                catch (Exception)
                {
                    ModelState.AddModelError("Image", "The Image field is required");
                    //ModelState.AddModelError(string.Empty, "An error occurred while updating the category. Please try again later.");
                }
            }

            return View(categoryDTO);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(CategoryDTO categoryDTO, IFormFile image)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (image != null && image.Length > 0)
                        categoryDTO.Image = await SaveImageAsync(image);

                    await _categoryServices.AddCategory(categoryDTO);
                    return RedirectToAction("Index");
                }
                catch (Exception)
                {
                    ModelState.AddModelError("Image", "The Image field is required");
                }
            }
            return View(categoryDTO);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            await _categoryServices.DeleteCategory(id);
            return RedirectToAction("Index");
        }

        private async Task<string> SaveImageAsync(IFormFile image)
        {
            string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);

            string imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "categories", uniqueFileName);
            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            return "/images/categories/" + uniqueFileName;
        }
    }
}




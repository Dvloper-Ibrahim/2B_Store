using _2B_Store.Application.Services;
using _2B_Store.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Scripting;

namespace _2B_Store.MVC.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserServices _userServices;

        public UserController(IUserServices userServices)
        {
            _userServices = userServices;
        }

        public async Task<IActionResult> Index(string role)
        {
            var users = await _userServices.GetAllUsers();

            if (!string.IsNullOrEmpty(role) && Enum.TryParse(role, out Role roleEnum))
            {
            users = users.Where(u => u.Role == roleEnum).ToList();
            }

            return View(users);
        }

        public IActionResult Create()
        {
            var userDto = new UserSignUpDto();
            return View(userDto);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(UserSignUpDto userDto)
        {
            if (ModelState.IsValid)
            {
                
             //   string hashedPassword = BCrypt.HashPassword(userDto.Password);

                var newUser = new UserDTO
                {
                    FirstNameEN = userDto.FirstNameEN,
                  
                    LastNameEN = userDto.LastNameEN,
                    Email = userDto.Email,
                    PhoneNumber = userDto.PhoneNumber,
                 //   Password = hashedPassword // Save the hashed password
                };

               // var addedUser = await _userServices.AddUser(newUser);

                return RedirectToAction("Index");
            }

            return View(userDto);
        }
    }


}


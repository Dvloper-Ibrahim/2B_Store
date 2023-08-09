using _2B_Store.Application.Services;
using _2B_Store.DTO;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Scripting;
using System.Security.Claims;

namespace _2B_Store.MVC.Controllers
{
    //[Authorize(Roles = "admin")]
    public class AccountController : Controller
    {

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IUserServices _userService;
        private readonly IMapper _mapper;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager,
            IUserServices userService, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _userService = userService;
            _mapper = mapper;
        }

        public async Task<IActionResult> Index()
        {
            var users = await _userService.GetAllUsers();

            return View(users);
            //if (string.IsNullOrEmpty(roleName))
            //{
            //    var allUsers = await _userService.GetAllUsers();
            //    return View(allUsers);
            //}

            //var usersInRole = await _userManager.GetUsersInRoleAsync(roleName);
            //var userDtoList = _mapper.Map<List<UserSignUpDto>>(usersInRole);
            //return View(userDtoList);

        }

        // [HttpGet]

        //public IActionResult Index()
        //{
        //    return View();
        //}
        
        public async Task<IActionResult> Login()
        {
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(UserSignInDto userLogin)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByNameAsync(userLogin.UserName);
                if (user != null)
                {
                    var result = await _signInManager.PasswordSignInAsync(user, userLogin.Password, userLogin.RememberMe, false);

                    bool isAdmin = await _userManager.IsInRoleAsync(user, "Admin");
                    bool isSupAdmin = await _userManager.IsInRoleAsync(user, "Sup_Admin");

                    if (result.Succeeded && isAdmin && isSupAdmin)
                        return RedirectToAction("Index", "Home");
                    else
                        ModelState.AddModelError("", "Invalid username or password");
                }
                else
                {
                    ModelState.AddModelError("", "Invalid username or password");
                }
            }
            return View();
        }

        //[Authorize(Roles = "admin")]
        public IActionResult Register()
        {
            UserSignUpDto userSignUp = new UserSignUpDto();
            
            
            return View(userSignUp);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(UserSignUpDto userSignUpDto)
        {
            if (ModelState.IsValid)
            {
                var user = _mapper.Map<ApplicationUser>(userSignUpDto);
                IdentityResult result = await _userManager.CreateAsync(user, userSignUpDto.Password);
                if (result.Succeeded)
                {
                    // If user creation succeeds, sign in the user and redirect to the home page
                    await _signInManager.SignInAsync(user, isPersistent: false);//session cookie
                    //return RedirectToAction("Index", "Home");

                    //var id = await _userManager.GetUserIdAsync(user);
                    //var claims = new List<Claim>
                    //    {
                    //        new Claim(ClaimTypes.Name, user.UserName),
                    //        new Claim(ClaimTypes.NameIdentifier,id)
                    //    };

                    await _userManager.AddToRoleAsync(user, "Admin");
                    //await _signInManager.SignInAsync(user,false);
                    //await _signInManager.SignInWithClaimsAsync(user, false, claims);
                    return RedirectToAction("login");
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }
            return View(userSignUpDto);
        }

        public async Task<IActionResult> Edit(string id)
        {
            UserSignUpDto userToEdit = await _userService.GetUserById(id);
            return View(userToEdit);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(UserSignUpDto userSignUpDto)
        {
            if (ModelState.IsValid)
             {
                var user = _mapper.Map<ApplicationUser>(userSignUpDto);
                //user.Id = id;
                IdentityResult result = await _userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    // If user creation succeeds, sign in the user and redirect to the home page
                    // await _signInManager.SignInAsync(user, isPersistent: false);//session cookie
                    //return RedirectToAction("Index", "Home");

                    //var userId = await _userManager.GetUserIdAsync(user);
                    //var claims = new List<Claim>
                    //    {
                    //        new Claim(ClaimTypes.Name, user.UserName),
                    //        new Claim(ClaimTypes.NameIdentifier,userId)
                    //    };

                    await _userManager.AddToRoleAsync(user, "Admin");
                    //await _signInManager.SignInAsync(user,false);
                    //await _signInManager.SignInWithClaimsAsync(user, false, claims);
                    return RedirectToAction("login");
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }
            return View(userSignUpDto);
        }

        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Login");
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Profile()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound();
            }

            var userProfileDto = _mapper.Map<UserProfileDto>(user);
            return View(userProfileDto);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Profile(UserProfileDto userProfileDto)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.GetUserAsync(User);
                if (user != null)
                {
                    _mapper.Map(userProfileDto, user);
                    var result = await _userManager.UpdateAsync(user);
                    if (result.Succeeded)
                    {
                        return RedirectToAction("index");
                    }
                    else
                    {
                        foreach (var error in result.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                        }
                    }
                }
            }
            return View(userProfileDto);
        }

        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(string id)
        {
            //var user = await _userManager.GetUserAsync(User);
            //await _userManager.DeleteAsync(user);
            await _userService.DeleteUser(id);
            return RedirectToAction("Index");
        }
















        //        else
        //        {
        //            foreach (var error in result.Errors)
        //            {
        //                ModelState.AddModelError("", error.Description);
        //            }
        //        }
        //    }

        //    return View(userSignUpDto);
        //}

        // [HttpGet]
        //public IActionResult Login()
        //{
        //    return View();
        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Login(UserSignInDto userSignInDto)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var result = await _signInManager.PasswordSignInAsync(userSignInDto.Email, userSignInDto.Password,
        //            userSignInDto.RememberMe, lockoutOnFailure: false);
        //        if (result.Succeeded)
        //        {
        //            return RedirectToAction("Index", "Home");
        //        }
        //        else
        //        {
        //            ModelState.AddModelError("", "Invalid login attempt.");
        //        }
        //    }

        //    return View(userSignInDto);
        //}

        //[Authorize]

        //[Authorize]
        //public async Task<IActionResult> Details(string id)
        //{
        //    var user = await _userService.GetUserById(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(user);
        //}

        //[Authorize]
        //[HttpGet]
        //public async Task<IActionResult> Edit(string id)
        //{
        //    var user = await _userService.GetUserById(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(user);
        //}

        //[Authorize]
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Edit(string id, UserSignUpDto userDto)
        //{
        //    if (id != userDto.Id)
        //    {
        //        return NotFound();
        //    }

        //    if (ModelState.IsValid)
        //    {
        //        var updatedUser = await _userService.UpdateUser(id, userDto);
        //        if (updatedUser == null)
        //        {
        //            return NotFound();
        //        }

        //        return RedirectToAction("Index");
        //    }

        //    return View(userDto);
        //}

        //[Authorize(Roles = "Admin")]
        //public async Task<IActionResult> Delete(string id)
        //{
        //    await _userService.DeleteUser(id);
        //    return RedirectToAction("Index");
        //}






    }


}




//private readonly IUserServices _userServices;

//public UserAccountController(IUserServices userServices)
//{
//    _userServices = userServices;
//}


//public IActionResult Registration()
//{
//    return View();
//}

//[HttpPost]
//[ValidateAntiForgeryToken]
//public IActionResult Registration (UserSignUpDto applicationUser)
//{
//    if (ModelState.IsValid)
//    {

//    }
//    return View();
//}

//public async Task<IActionResult> Index(string role)
//{
//    var users = await _userServices.GetAllUsers();

//    if (!string.IsNullOrEmpty(role) && Enum.TryParse(role, out Role roleEnum))
//    {
//        users = users.Where(u => u.Role == roleEnum).ToList();
//    }

//    return View(users);
//}

//public IActionResult Create()
//{
//    var userDto = new UserSignUpDto();
//    return View(userDto);
//}

//[HttpPost]
//[ValidateAntiForgeryToken]
//public async Task<IActionResult> Create(UserSignUpDto userDto)
//{
//    if (ModelState.IsValid)
//    {

//        //   string hashedPassword = BCrypt.HashPassword(userDto.Password);

//        var newUser = new UserDTO
//        {
//            FirstNameEN = userDto.FirstNameEN,

//            LastNameEN = userDto.LastNameEN,
//            Email = userDto.Email,
//            PhoneNumber = userDto.PhoneNumber,
//            //   Password = hashedPassword // Save the hashed password
//        };

//        // var addedUser = await _userServices.AddUser(newUser);

//        return RedirectToAction("Index");
//    }

//    return View(userDto);
//}

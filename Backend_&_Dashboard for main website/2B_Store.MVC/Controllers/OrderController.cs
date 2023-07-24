using _2B_Store.Application11.Services;
using Microsoft.AspNetCore.Mvc;

namespace _2B_Store.MVC.Controllers
{
    public class OrderController : Controller
    {
        private readonly IOrderServices _orderServices;

        public OrderController(IOrderServices orderServices)
        {
            _orderServices = orderServices;
        }

        public async Task<IActionResult> Index()
        {
            var allOrders = await _orderServices.GetAllOrders();
            return View(allOrders);
        }

        public async Task<IActionResult> UserOrders(int userId)
        {
            var userOrders = await _orderServices.GetOrdersByUserId(userId);
            return View(userOrders);
        }







    }
}

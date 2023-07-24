using _2B_Store.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store.Application11.Services
{
    public interface IOrderServices
    {
        Task<List<OrderDTO>> GetAllOrders();

        Task<List<OrderDTO>> GetOrdersByUserId(int userId);
        Task<OrderDTO> AddOrder(OrderDTO orderDTO);
        Task<OrderDTO> UpdateOrder(int orderId, OrderDTO orderDTO);
        Task DeleteOrder(int orderId);
    }
}

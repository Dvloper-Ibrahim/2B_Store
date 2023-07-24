using _2B_Store.Application.Contracts;
using _2B_Store.Application11.Services;
using _2B_Store.DTO;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store.Application.Services
{
    public class OrderServices : IOrderServices

    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public OrderServices(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        public async Task<List<OrderDTO>> GetAllOrders()
        {
            var orders = await _orderRepository.GetAllAsync();
            return _mapper.Map<List<OrderDTO>>(orders);
        }

        public async Task<List<OrderDTO>> GetOrdersByUserId(int userId)
        {
            var orders = await _orderRepository.GetOrdersByUserId(userId);
            return _mapper.Map<List<OrderDTO>>(orders);
        }

        public async Task<OrderDTO> AddOrder(OrderDTO orderDTO)
        {
            var order = _mapper.Map<Order>(orderDTO);
            order = await _orderRepository.AddAsync(order);
            await _orderRepository.SaveChangesAsync();
            return _mapper.Map<OrderDTO>(order);
        }

        public async Task<OrderDTO> UpdateOrder(int orderId, OrderDTO orderDTO)
        {
            var existingOrder = await _orderRepository.GetByIdAsync(orderId);
            if (existingOrder == null)
                throw new ArgumentException("Order not found");

            _mapper.Map(orderDTO, existingOrder);
            existingOrder = await _orderRepository.UpdateAsync(existingOrder);
            await _orderRepository.SaveChangesAsync();
            return _mapper.Map<OrderDTO>(existingOrder);
        }

        public async Task DeleteOrder(int orderId)
        {
            var existingOrder = await _orderRepository.GetByIdAsync(orderId);
            if (existingOrder == null)
                throw new ArgumentException("Order not found");

            await _orderRepository.DeleteAsync(existingOrder);
            await _orderRepository.SaveChangesAsync();
        }
    }
}

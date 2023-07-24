using _2B_Store.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store.Application.Services
{
    public interface IUserServices
    {
        Task<List<UserDTO>> GetAllUsers();

        Task<UserDTO> GetUserById(int userId);
        Task<UserDTO> AddUser(UserSignUpDto userSignUpDto);
        Task<UserDTO> UpdateUser(int userId, UserDTO userDto);
        Task DeleteUser(int userId);
        Task<UserDTO> SignIn(UserSignInDto userSignInDto);

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store.Application.Contracts
{
    public interface IUserRepository : IRepository<User, int>
    {
        //  Task<User> GetUserById(int userId);8
        //Task<User> GetUserByUsername(string username);
        Task<User> GetUserByEmail(string email);
        Task<User> CheckforUser(string email, string password);

    }
}

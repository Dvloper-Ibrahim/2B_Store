using _2B_Store.Application.Contracts;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store.Application.Services
{
    public class UserServices : IUserServices
    {
         IUserRepository _userRepository;
        IMapper _mapper;

        public UserServices(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }









    }
}

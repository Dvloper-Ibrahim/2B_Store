using _2B_Store.Application.Contracts;
using _2B_Store.DTO;
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

        public async Task<List<UserDTO>> GetAllUsers()
        {
            var users = await _userRepository.GetAllAsync();
            return _mapper.Map<List<UserDTO>>(users);
        }

        public async Task<UserDTO> GetUserById(int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            return _mapper.Map<UserDTO>(user);
        }

        public async Task<UserDTO> AddUser(UserSignUpDto userSignUpDto)
        {
            
            var user = _mapper.Map<User>(userSignUpDto);
            
            user = await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();
            return _mapper.Map<UserDTO>(user);
        }

        public async Task<UserDTO> UpdateUser(int userId, UserDTO userDto)
        {
            
            var existingUser = await _userRepository.GetByIdAsync(userId);
            if (existingUser == null)
                throw new ArgumentException("User not found");

            _mapper.Map(userDto, existingUser);
            existingUser = await _userRepository.UpdateAsync(existingUser);
            await _userRepository.SaveChangesAsync();
            return _mapper.Map<UserDTO>(existingUser);
        }


        public async Task DeleteUser(int userId)
        {
           
            var existingUser = await _userRepository.GetByIdAsync(userId);
            if (existingUser == null)
                throw new ArgumentException("User not found");

            await _userRepository.DeleteAsync(existingUser);
            await _userRepository.SaveChangesAsync();
        }

        public async Task<UserDTO> SignIn(UserSignInDto userSignInDto)
        {
          
            var user = await _userRepository.GetUserByEmail(userSignInDto.Email);
            if (user == null || user.Password != userSignInDto.Password)
            {
               
                throw new UnauthorizedAccessException("Invalid email or password.");
            }

            return _mapper.Map<UserDTO>(user);
        }


    }
}

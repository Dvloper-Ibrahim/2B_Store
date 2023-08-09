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

        public async Task<List<GetAllUsersDTO>> GetAllUsers()
        {
            var users = await _userRepository.GetAllAsync();
            return _mapper.Map<List<GetAllUsersDTO>>(users);
        }

        public async Task<UserSignUpDto> GetUserById(string userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            return _mapper.Map<UserSignUpDto>(user);
        }

        public async Task<UserSignUpDto> RegisterUser(UserSignUpDto userSignUpDto)
        {
            var user = _mapper.Map<ApplicationUser>(userSignUpDto);
            user = await _userRepository.AddAsync(user);
            return _mapper.Map<UserSignUpDto>(user);
        }

        public async Task<UserSignInDto> SignInUser(UserSignInDto userSignInDto)
        {

            var user = await _userRepository.CheckforUser(userSignInDto.UserName, userSignInDto.Password);
            if (user == null)
            {
                throw new UnauthorizedAccessException("Invalid email or password.");
            }
            return _mapper.Map<UserSignInDto>(user);
        }

        public async Task<UserSignUpDto> UpdateUser(string userId, UserSignUpDto userDto)
        {
            var existingUser = await _userRepository.GetByIdAsync(userId);
            if (existingUser == null)
                throw new ArgumentException("User not found");

            _mapper.Map(userDto, existingUser);
            existingUser = await _userRepository.UpdateAsync(existingUser);
            return userDto;
            //return _mapper.Map<UserDTO>(existingUser);
        }

        public async Task DeleteUser(string userId)
        {
            var existingUser = await _userRepository.GetByIdAsync(userId);
            if (existingUser == null)
                throw new ArgumentException("User not found");

            await _userRepository.DeleteAsync(existingUser);
        }
    }
}

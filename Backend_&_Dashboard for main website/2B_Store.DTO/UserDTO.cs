using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
      //  public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstNameEN { get; set; }
        public string FirstNameAR { get; set; }
        public string LastNameEN { get; set; }
        public string LastNameAR { get; set; }
        public int PhoneNumber { get; set; }
        public Role Role { get; set; }
    }
}

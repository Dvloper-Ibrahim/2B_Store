using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store.DTO
{
    public class UserSignUpDto
    {
        [Required(ErrorMessage = "This is a required field.")]
        public string FirstName { get; set; }


        [Required(ErrorMessage = "This is a required field.")]
        public string LastName { get; set; }


        [Required(ErrorMessage = "This is a required field.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address (Ex: johndoe@domain.com).")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Please enter a valid number in this field.")]
        [RegularExpression(@"^\d{11}$", ErrorMessage = "Please enter at least 11 characters.")]
        public string PhoneNumber { get; set; }


        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$", ErrorMessage = "password must contain (capital+small+numbers) digits.")]
        public string Password { get; set; }


        [Required(ErrorMessage = "Please confirm your password.")]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Please enter the same value again.")]
        public string ConfirmPassword { get; set; }

        public bool SignUpForNewsletter { get; set; }

    }
}

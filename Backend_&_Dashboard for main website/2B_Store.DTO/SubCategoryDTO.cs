using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store.DTO
{
    public class SubCategoryDTO
    {
        public string NameEN { get; set; }
        public string NameAR { get; set; }

        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }

        public virtual ICollection<SubCategory> SubCategories { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}

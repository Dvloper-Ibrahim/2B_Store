using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store.DTO
{
    public class CategoryDTO
    {

        public int Id { get; set; }
        public string NameEN { get; set; }
        public string NameAR { get; set; }

        public string Type { get; set; }
        public string Image { get; set; }
        public string DescriptionEN { get; set; }
        public string DescriptionAR { get; set; }

        public virtual ICollection<SubCategory> SubCategories { get; set; }
    
    }
}

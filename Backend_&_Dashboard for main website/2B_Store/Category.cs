using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store
{
    public class Category
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }

        public virtual ICollection<SubCategory> SubCategories { get; set; }


        //
        //public int? ParentCategoryId { get; set; }
        //public virtual Category ParentCategory { get; set; }
        // public virtual ICollection<Category> SubCategories { get; set; }


    }
}

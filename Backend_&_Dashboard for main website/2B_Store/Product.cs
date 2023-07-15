using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string Brand { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string Description { get; set; }
        public bool IsAvailable { get; set; }
       

        public int SubcategoryId { get; set; }
        public virtual SubCategory SubCategory { get; set; }
        public virtual ICollection<ProductImage> Images { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<LocationStore> LocationStores { get; set; }

    }
}

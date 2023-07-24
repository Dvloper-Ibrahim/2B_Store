using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store.DTO
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string ProductNameEN { get; set; }
        public string ProductNameAR { get; set; }
        public string BrandEN { get; set; }
        public string BrandAR { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string DescriptionEN { get; set; }
        public string DescriptionAR { get; set; }
        public bool IsAvailable { get; set; }
        public int SubcategoryId { get; set; }
        public SubCategoryDTO SubCategory { get; set; }


        public List<ProductImageDTO> Images { get; set; }
        public List<ReviewDTO>? Reviews { get; set; }
        public List<LocationStoreDTO> LocationStores { get; set; }
        public List<ProductAdditionalInfoDTO> AdditionalInformation { get; set; }
        public List<ProductDetailsDTO> Details { get; set; }




        //public ICollection<ProductImageDTO> Images { get; set; }
        //public ICollection<ReviewDTO> Reviews { get; set; }
        //public ICollection<LocationStoreDTO> LocationStores { get; set; }
        //public Dictionary<string, string> AdditionalInformation { get; set; }
        //public Dictionary<string, string> Details { get; set; }



    }
}

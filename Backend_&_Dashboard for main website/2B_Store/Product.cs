namespace _2B_Store
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductNameEN { get; set; } // English product name
        public string ProductNameAR { get; set; } // Arabic product name
        public string BrandEN { get; set; }
        public string BrandAR { get; set; }

        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string DescriptionEN { get; set; }
        public string DescriptionAR { get; set; }

        public bool IsAvailable { get; set; }


        public int SubcategoryId { get; set; }
        public virtual SubCategory SubCategory { get; set; }
        public virtual ICollection<ProductImage> Images { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<LocationStore> LocationStores { get; set; }


        public Dictionary<string, string> AdditionalInformation { get; set; }
        public Dictionary<string, string> Details { get; set; }



        // Additional property to store the product MoreInformation as JSON
        //  public string AdditionalInformation { get; set; }


    }
}

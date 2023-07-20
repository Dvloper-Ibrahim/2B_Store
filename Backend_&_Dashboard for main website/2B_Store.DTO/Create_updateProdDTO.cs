namespace _2B_Store.DTO
{
    public class Create_updateProdDTO
    {
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
        public virtual SubCategory SubCategory { get; set; }
        public virtual ICollection<ProductImage> Images { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<LocationStore> LocationStores { get; set; }
    }
}
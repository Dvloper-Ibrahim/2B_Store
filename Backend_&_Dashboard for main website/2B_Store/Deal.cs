namespace _2B_Store
{
    public class Deal
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public decimal DiscountPercentage { get; set; }
        

        public virtual ICollection<Product> Products { get; set; }

    }
}
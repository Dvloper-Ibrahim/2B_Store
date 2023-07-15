﻿namespace _2B_Store
{
    public class Cart
    {

        public int Id { get; set; }
        public int Quantity { get; set; }


        public int UserId { get; set; }
        public virtual User User { get; set; }

        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

    }
}
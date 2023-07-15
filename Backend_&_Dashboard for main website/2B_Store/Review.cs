﻿namespace _2B_Store
{
    public class Review
    {

        public int Id { get; set; }
        public int Rating { get; set; }
        public string Rev_Comment { get; set; }
      

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

    }
}
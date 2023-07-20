﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store.DTO
{
    public class GetAllProdImgsDTO
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }

        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
    }
}

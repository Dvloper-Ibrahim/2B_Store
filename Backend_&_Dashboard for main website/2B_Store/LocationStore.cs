﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store
{
    public class LocationStore
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string ImageStore { get; set; }
        public int Tel_Number { get; set; }


        //add properties!?
        public virtual ICollection<Product> Products { get; set; }

    }
}

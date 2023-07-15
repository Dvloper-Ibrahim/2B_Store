using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store
{
    public class Shipping
    {
        public int Id { get; set; }
        public string ShippingMethod { get; set; }
        public string TrackingNumber { get; set; }
        public decimal Cost { get; set; }
        public string Provider { get; set; }
       

        public int OrderId { get; set; }
        public virtual Order Order { get; set; }
    }
}

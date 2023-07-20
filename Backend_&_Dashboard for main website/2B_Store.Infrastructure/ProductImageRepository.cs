using _2B_Store.Application.Contracts;
using _2B_Store.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store.Infrastructure
{
    public class ProductImageRepository : Repository<ProductImage, string>, IProductImageRepository
    {
        public ProductImageRepository(StoreContext dbContext) : base(dbContext) { }

        
    
    }
}

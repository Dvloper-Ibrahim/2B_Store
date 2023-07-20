using _2B_Store.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store.Application.Services
{
 
    public interface IProductServices
    {

        public Task<List<GetAllProdsDTO>> GetProductallPagination(int Item, int pagenumber);
        public Task<GetAllProdsDTO> GetProductById(int Categoryid);

        public Task<Create_updateProdDTO> AddProduct(Create_updateProdDTO productDTO);
        public Task<Create_updateProdDTO> UpdateProduct(int categoryId, Create_updateProdDTO productDTO);

        public Task<CategoryDTO> DeleteProduct(int categoryId);
    }
}

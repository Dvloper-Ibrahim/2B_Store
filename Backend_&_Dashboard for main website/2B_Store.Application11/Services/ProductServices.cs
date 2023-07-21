using _2B_Store.Application.Contracts;
using _2B_Store.DTO;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store.Application.Services
{
    public class ProductServices : IProductServices
    {

        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductServices(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<List<GetAllProdsDTO>> GetProductallPagination(int Item, int pagenumber)
        {
            var products = await _productRepository.GetAllAsync();
            var pagedProducts = products.Skip((pagenumber - 1) * Item).Take(Item).ToList();
            return _mapper.Map<List<GetAllProdsDTO>>(pagedProducts);
        }

        public async Task<GetAllProdsDTO> GetProductById(int productId)
        {
            var product = await _productRepository.GetByIdAsync(productId);
            return _mapper.Map<GetAllProdsDTO>(product);
        }

        public async Task<Create_updateProdDTO> AddProduct(Create_updateProdDTO productDTO)
        {
            var product = _mapper.Map<Product>(productDTO);
            product = await _productRepository.AddAsync(product);
            return _mapper.Map<Create_updateProdDTO>(product);
        }

        public async Task<Create_updateProdDTO> UpdateProduct(int productId, Create_updateProdDTO productDTO)
        {
            var existingProduct = await _productRepository.GetByIdAsync(productId);
            if (existingProduct == null)
            {
                return null;
            }

            _mapper.Map(productDTO, existingProduct);
            existingProduct = await _productRepository.UpdateAsync(existingProduct);
            return _mapper.Map<Create_updateProdDTO>(existingProduct);
        }
        //Delete Product
        public async Task<bool> DeleteProduct(int productId)
        {
            var category = await _productRepository.GetByIdAsync(productId);

            if (category == null)
            {
                throw new Exception("Product not found");
            }
            { 
            await _productRepository.DeleteAsync(category);
            await _productRepository.SaveChangesAsync();
            }
            Console.WriteLine("Product deleted Successfuly");
            return true;
            

        }





        ////////////////////////////////////////////////////
        //private readonly IProductRepository _IProductRepository;
        //private readonly  IMapper _mapper;
        //public ProductServices(IProductRepository productRepository)
        //{

        //    _IProductRepository = productRepository;
        //}

        ////All Products
        //public async Task<List<GetAllProdsDTO>> GetProductallPagination(int Item, int pagenumber)
        //{
        //    var AllProduct = await _IProductRepository.GetAllAsync();
        //    var ItemPagination = AllProduct.Skip(Item * (pagenumber - 1)).Take(Item).
        //        Select(c => new GetAllProdsDTO
        //        {
        //            Id = c.Id,
        //            ProductName = c.ProductNameEN,
        //            Price = c.Price,
        //            Images = c.Images,
        //            Stock = c.Stock,
        //            Reviews = c.Reviews,
        //            SubCategory = c.SubCategory,
        //            LocationStores = c.LocationStores,



        //        }).ToList();

        //    return ItemPagination;
        //}


        ////Prouct By ID
        //public async Task<GetAllProdsDTO> GetProductById(int Productid)
        //{
        //    var catbyID = await _IProductRepository.GetByIdAsync(Productid);

        //    var ProdsDTO = new GetAllProdsDTO
        //    {
        //        Id = catbyID.Id,
        //        ProductName = catbyID.ProductNameEN,
        //        Price = catbyID.Price,
        //        Images = catbyID.Images,
        //        Stock = catbyID.Stock,
        //        Reviews = catbyID.Reviews,
        //        SubCategory = catbyID.SubCategory,
        //        LocationStores = catbyID.LocationStores,
        //    };

        //    return ProdsDTO;
        //}

        ////Add Product
        //public async Task<Create_updateProdDTO> AddProduct(Create_updateProdDTO productDTO)
        //{
        //    Product product = new Product();


        //    product.ProductNameEN = productDTO.ProductName;
        //    product.Images = productDTO.Images;
        //    product.SubCategory = productDTO.SubCategory;
        //    product.Reviews = productDTO.Reviews;
        //    product.Price = productDTO.Price;
        //    product.Stock = productDTO.Stock;
        //    product.LocationStores = productDTO.LocationStores;


        //    await _IProductRepository.AddAsync(product);
        //    await _IProductRepository.SaveChangesAsync();

        //    return new Create_updateProdDTO
        //    {

        //        ProductName = productDTO.ProductName,
        //        Images = productDTO.Images,
        //        SubCategory = productDTO.SubCategory,
        //        Reviews = productDTO.Reviews,
        //        Price = productDTO.Price,
        //        Stock = productDTO.Stock,
        //        LocationStores = productDTO.LocationStores,

        //    };
        //}


        ////Update Product


        //public async Task<Create_updateProdDTO> UpdateProduct(int productID, Create_updateProdDTO productDTO)
        //{
        //    Product product = await _IProductRepository.GetByIdAsync(productID);

        //    if (product == null)
        //    {
        //        throw new Exception("Category not found");
        //    }

        //    product.ProductNameEN = productDTO.ProductName;
        //    product.Images = productDTO.Images;
        //    product.SubCategory = productDTO.SubCategory;
        //    product.Reviews = productDTO.Reviews;
        //    product.BrandEN = productDTO.Brand;
        //    product.Price = productDTO.Price;
        //    product.Stock = productDTO.Stock;
        //    product.LocationStores = productDTO.LocationStores;

        //    await _IProductRepository.UpdateAsync(product);
        //    await _IProductRepository.SaveChangesAsync();

        //    return new Create_updateProdDTO
        //    {
        //        ProductName = product.ProductNameEN,
        //        Images = product.Images,
        //        SubCategory = product.SubCategory,
        //        Reviews = product.Reviews,
        //        Price = product.Price,
        //        Brand = product.BrandEN,
        //        Stock = product.Stock,
        //        LocationStores = product.LocationStores
        //    };
        //}




    }
}
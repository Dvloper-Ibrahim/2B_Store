using _2B_Store.DTO;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Store.Application11.Mapper
{
    public class AutoMapper : Profile
    {
        public AutoMapper() {

            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<SubCategory, SubCategoryDTO>().ReverseMap();
            CreateMap<Product, ProductDTO>().ReverseMap();
            CreateMap<CreateUpdateProductDTO, Product>().ReverseMap();
            CreateMap<ProductImage, ProductImageDTO>().ReverseMap();
            CreateMap<Review, ReviewDTO>().ReverseMap();
            CreateMap<LocationStore, LocationStoreDTO>().ReverseMap();
            CreateMap<Order, OrderDTO>().ReverseMap();
            CreateMap<OrderItem, OrderItemDTO>().ReverseMap();
            CreateMap<Payment, PaymentDTO>().ReverseMap();
            CreateMap<Shipping, ShippingDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<UserSignUpDto, User>().ReverseMap();





            // CreateMap<CreateUpdateCategoryDTO, Category>().ReverseMap();



            //CreateMap<Product, GetAllProdsDTO>().ReverseMap();
            //CreateMap<Product, Create_updateProdDTO>().ReverseMap();




        }



    }
}

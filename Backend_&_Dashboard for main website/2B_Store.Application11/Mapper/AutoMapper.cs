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


            CreateMap<Product, GetAllProdsDTO>().ReverseMap();
            CreateMap<Product, Create_updateProdDTO>().ReverseMap();

            CreateMap<Category, CategoryDTO >().ReverseMap();
            CreateMap<Category, GetAllOrdersDTO>().ReverseMap();
           





        }



    }
}

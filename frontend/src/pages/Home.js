// import React from 'react'
// import CategoryList from '../components/CategoryList'
// import BannerProduct from '../components/BannerProduct'
// import HorizontalProductCard from '../components/HorizontalProductCard'
// import VerticalProductCard from '../components/VerticalProductCard'

// const Home = () => {
//   return (
//     <div >

//       <BannerProduct/>
//       <br/>
//       <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
//           Explore Categories
//         </h2>

//       <CategoryList />
      

      
//       {/* //Horzontal card for airpodes */}
//       <VerticalProductCard category={"airpodes"} heading={"Top Airpodes's"}/>
//       {/* //Horzontal card for Watches */}
//       <VerticalProductCard category={"watches"} heading={"Popular Watches"}/>
//       {/* //Horzontal card for Earphones */}
//       <VerticalProductCard category={"earphones"} heading={"Best Selling Earphones"}/>
//       {/* //Vertical card for Mobiles */}
//       <VerticalProductCard category={"mobiles"} heading={"Trending Phones"}/>
//       {/* //Vertical card for Mouse */}
//       <VerticalProductCard category={"mouse"} heading={"Top Deals on Mouse"}/>
//       {/* //Vertical card for Television */}
//       <VerticalProductCard category={"television"} heading={"Best Deals on Television"}/>
//       {/* //Vertical card for Camera */}
//       <VerticalProductCard category={"camera"} heading={"Camera & Accessories"}/>
//       {/* //Vertical card for Speakers */}
//       <VerticalProductCard category={"speakers"} heading={"Sound & Speakers"}/>
//       {/* //Vertical card for refrigerator */}
//       <VerticalProductCard category={"refrigerator"} heading={"Best Deals on Refregerator"}/>

//       {/* //Horzontal card for trimmers */}
//       <VerticalProductCard  category={"trimmers"} heading={"Best Trimmer's"}/>
      

//     </div>
//   )
// }

// export default Home




import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import VerticalProductCard from '../components/VerticalProductCard'
import BrandsScroller from '../components/BrandsScroller'
import SubBanner from '../components/SubBanner'

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <BannerProduct />
      <br />
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        Explore Categories
      </h2>

      <CategoryList />

      {/* //Vertical card for Airpodes */}
      <VerticalProductCard category={"airpodes"} heading={"Top Airpodes's"} />
      {/* //Vertical card for Watches */}
      <VerticalProductCard category={"watches"} heading={"Popular Watches"} />
      {/* //Vertical card for Earphones */}
      <VerticalProductCard category={"earphones"} heading={"Best Selling Earphones"} />
      {/* //Vertical card for Mobiles */}
      <VerticalProductCard category={"mobiles"} heading={"Trending Phones"} />
      {/* //Vertical card for Mouse */}
      <VerticalProductCard category={"mouse"} heading={"Top Deals on Mouse"} />
      {/* //Vertical card for Television */}
      <VerticalProductCard category={"television"} heading={"Best Deals on Television"} />
      {/* //Vertical card for Camera */}
      <VerticalProductCard category={"camera"} heading={"Camera & Accessories"} />
      {/* //Vertical card for Speakers */}
      <VerticalProductCard category={"speakers"} heading={"Sound & Speakers"} />
      {/* //Vertical card for Refrigerator */}
      {/* <VerticalProductCard category={"refrigerator"} heading={"Best Deals on Refrigerator"} /> */}
      {/* //Vertical card for Trimmers */}
      {/* <VerticalProductCard category={"trimmers"} heading={"Best Trimmer's"} /> */}
<br/>
<br/>
<SubBanner/>
<br/>
<br/>
      <BrandsScroller/>
    </div>
  )
}

export default Home

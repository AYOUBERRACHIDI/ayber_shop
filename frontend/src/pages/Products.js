// import React, { useEffect, useState } from "react";
// import UploadProduct from "../components/UploadProduct";
// import SummaryApi from "../common/API";
// import AdminProductCard from "../components/AdminProductCard";

// const Products = () => {
//   const [openUploadProduct, setopenUploadProduct] = useState(false);
//   const [products, setProducts] = useState([]);

//   const fetchProducts = async() =>{
//     try {
//       const response = await fetch(SummaryApi.getProduct.url,{
//         method: SummaryApi.getProduct.method
//       })

//       const data = await response.json();
//       setProducts(data?.data || []);

//     } catch (error) {
//       console.error('Failed to fetch products:', error);
//     }
//   }

//   useEffect(()=>{
    
//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <div className="bg-white px-4 py-2 rounded flex justify-between">
//         <h1 className="font-bold text-xl">All Products</h1>
//         <button
//           className="border-2 border-red-600 bg-slate-200 text-red-600 hover:bg-red-500 hover:text-white transition-all rounded-full py-1 px-3 font-bold text-xl"
//           onClick={() => setopenUploadProduct(true)}
//         >
//           Upload Product
//         </button>
//       </div>

//       {/**Upload Product component */}
//       {openUploadProduct && (
//         <UploadProduct onClose={() => setopenUploadProduct(false)} fetchData ={fetchProducts}/>
//       )}

//       {/** Display products */}

//       <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-19px)] overflow-y-scroll custom-scrollbar">
//         {
//           products.map((product, index) => {
//             return (

//               <AdminProductCard product = {product} key={index+"all product"} fetchData ={fetchProducts}/>
//             )
//           })
//         }
//       </div>
//     </div>
//   );
// };

// export default Products;


import React, { useEffect, useState } from "react";
import { FaSearch, FaUpload } from "react-icons/fa";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common/API";
import AdminProductCard from "../components/AdminProductCard";

const Products = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; 

  const fetchProducts = async () => {
    try {
      const response = await fetch(SummaryApi.getProduct.url, {
        method: SummaryApi.getProduct.method,
      });

      const data = await response.json();
      setProducts(data?.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.productName &&
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculer l'index de début et de fin pour la pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Obtenez les produits de la page actuelle
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Gérer la navigation entre les pages
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white px-6 py-4 rounded-lg shadow-md flex justify-between items-center">
        <h1 className="font-bold text-xl text-gray-800">All Products</h1>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 pl-10 border border-gray-300 rounded-md shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          </div>
          <button
            className="flex items-center border-2 border-blue-600 bg-blue-600 text-white hover:bg-blue-700 hover:border-blue-700 transition-all rounded-full py-2 px-4 font-bold text-lg"
            onClick={() => setOpenUploadProduct(true)}
          >
            <FaUpload className="mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Upload Product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchProducts} />
      )}

      {/* Display filtered products */}
      <div className="flex items-center flex-wrap gap-6 py-6 h-[calc(100vh-150px)] overflow-y-auto custom-scrollbar">
        {currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <AdminProductCard
              product={product}
              key={index + "all product"}
              fetchData={fetchProducts}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            Aucun produit trouvé.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center py-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 border rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-2 border rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 border rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;

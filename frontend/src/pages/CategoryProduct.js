import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductCategory from "../helpers/ProductCategory";
import SearchProductCard from "../components/SearchProductCard";
import SummaryApi from "../common/API";
import styled from "styled-components";

// Styled Components
const PageContainer = styled.div`
  padding: 80px 20px 20px 20px;
  background-color: #f9f9f9;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 80px 10px 10px 10px;
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterSection = styled.div`
  width: 250px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const FilterTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  text-transform: uppercase;
  border-bottom: 2px solid orange;
  padding-bottom: 10px;
`;

const FilterGroup = styled.div`
  margin-bottom: 20px;
`;

const FilterLabel = styled.label`
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

const FilterCheckbox = styled.input`
  accent-color: orange;
`;

const ProductSection = styled.div`
  flex: 1;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ResultsCount = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const SortSelect = styled.select`
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 14px;
  color: #333;
  background-color: white;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: orange;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const MobileFilterButton = styled.button`
  display: none;
  width: 100%;
  padding: 12px;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileFilterSection = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: ${({ active }) => (active ? "orange" : "white")};
  color: ${({ active }) => (active ? "white" : "#333")};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: orange;
    color: white;
  }
`;

const CategoryProduct = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const URLSearch = new URLSearchParams(location.search);
  const URLCartegoryListArray = URLSearch.getAll("category");

  const urlCategoryListObject = {};
  URLCartegoryListArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  const fetchData = async () => {
    setLoading(true);
    const apiResponse = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });
    setLoading(false);
    const apiData = await apiResponse.json();
    setData(apiData?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  const handleSortByPrice = (e) => {
    const { value } = e.target;
    setSortByPrice(value);
    if (value === "asc") {
      setData((prev) => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
    if (value === "desc") {
      setData((prev) => prev.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }

      return `category=${el}&&`;
    });
    navigate("/category-product?" + urlFormat.join(""));
  }, [selectCategory]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <PageContainer>
      {/* <MobileFilterButton onClick={() => setIsMobileFilterOpen((prev) => !prev)}>
        {isMobileFilterOpen ? "Hide Filters" : "Show Filters"}
      </MobileFilterButton> */}

      <MainContent>
        <FilterSection style={{ display: isMobileFilterOpen ? "block" : "none" }}>
          <FilterGroup>
            <FilterTitle>Sort By</FilterTitle>
            <FilterOption>
              <FilterCheckbox
                type="radio"
                name="sortByPrice"
                value={"asc"}
                checked={sortByPrice === "asc"}
                onChange={handleSortByPrice}
              />
              <FilterLabel>Low to High</FilterLabel>
            </FilterOption>
            <FilterOption>
              <FilterCheckbox
                type="radio"
                name="sortByPrice"
                value={"desc"}
                checked={sortByPrice === "desc"}
                onChange={handleSortByPrice}
              />
              <FilterLabel>High to Low</FilterLabel>
            </FilterOption>
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>Filter By Category</FilterTitle>
            {ProductCategory.map((categoryName, index) => {
              return (
                <FilterOption key={index}>
                  <FilterCheckbox
                    type="checkbox"
                    name={"category"}
                    checked={selectCategory[categoryName.value]}
                    value={categoryName.value}
                    id={categoryName.value}
                    onChange={handleSelectCategory}
                  />
                  <FilterLabel htmlFor={categoryName.value}>
                    {categoryName.label}
                  </FilterLabel>
                </FilterOption>
              );
            })}
          </FilterGroup>
        </FilterSection>

        <ProductSection>
          <ResultsHeader>
            <ResultsCount>Results: {data.length}</ResultsCount>
            <div>
              <SortSelect value={sortByPrice} onChange={handleSortByPrice}>
                <option value="">Sort By</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </SortSelect>
              <SortSelect
                value={filterCategoryList}
                onChange={(e) => setFilterCategoryList([e.target.value])}
              >
                <option value="">Filter By Category</option>
                {ProductCategory.map((categoryName, index) => (
                  <option key={index} value={categoryName.value}>
                    {categoryName.label}
                  </option>
                ))}
              </SortSelect>
            </div>
          </ResultsHeader>

          <ProductGrid>
            {currentProducts.length !== 0 && !loading && (
              <SearchProductCard loading={loading} data={currentProducts} />
            )}
          </ProductGrid>

          <PaginationContainer>
            {Array.from({ length: Math.ceil(data.length / productsPerPage) }, (_, i) => (
              <PaginationButton
                key={i + 1}
                active={currentPage === i + 1}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </PaginationButton>
            ))}
          </PaginationContainer>
        </ProductSection>
      </MainContent>
    </PageContainer>
  );
};

export default CategoryProduct;
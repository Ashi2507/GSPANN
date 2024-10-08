import React, { useEffect, useState } from 'react';
import Pagination from './pagination';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Number of items per page

  // Fetch products from Fake Store API
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Products</h1>
      <div class="card">
        {currentProducts.map(product => (
          <div class="card-body" key={product.id}>
            <img src={product.image} alt={product.title} width="250" height="200" />
            <p>{product.title}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
      />
    </div>
  );
};

export default ProductList;

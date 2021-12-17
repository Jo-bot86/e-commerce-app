import React, { useEffect, useState } from 'react';
import { useDataApi } from '../../hooks/UseDataApi';
import { Product } from '../../shared/Product';
import LoadingSpinner from '../LoadingSpinner';
import ProductListItem from './ProductListItem';

export default function ProductList() {
  const [products, setProducts] = useDataApi<Product[]>();

  if (!products) {
    return <LoadingSpinner />;
  }
  return (
    <div className='container'>
      {products.map((product: Product) => (
        <div className='d-flex m-2 mx-5 flex-column' key={product._id}>
          <ProductListItem product={product} />
        </div>
      ))}
    </div>
  );
}

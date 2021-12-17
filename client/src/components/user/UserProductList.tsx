import React from 'react';
import { useDataApi } from '../../hooks/UseDataApi';
import { Product } from '../../shared/Product';
import { useLoginContext } from '../../Store';
import LoadingSpinner from '../LoadingSpinner';
import ProductListItem from '../product/ProductListItem';

export default function UserProductList() {
  const [products] = useDataApi<Product[]>();
  const { loginStore } = useLoginContext();

  if (!products) {
    return <LoadingSpinner />;
  }
  console.log(products)
  return (
    <div className='container'>
      {products.map((product: Product) => (
        loginStore.user?._id == product.userId &&
        <div className='d-flex m-2 mx-5 flex-column' key={product._id}>
          <ProductListItem product={product} />
        </div>
      ))}
    </div>
  );
}

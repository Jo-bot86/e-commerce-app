import React from 'react';
import { useParams } from 'react-router-dom';
import { useDataApi } from '../../hooks/UseDataApi';
import { Product } from '../../shared/Product';
import { categories } from '../../shared/ProductCategory';
import LoadingSpinner from '../LoadingSpinner';
import ProductForm from './ProductForm';

export default function ProductEdit() {
  const {id} = useParams<{id: string}>();
  const [product] = useDataApi<Product>(id)

  if(!product){
    return <LoadingSpinner/>
  }

  return (
    <div>
      <ProductForm
        id={id}
        name={product.name}
        price={product.price}
        main_category={product.main_category as categories}
        sub_category={product.sub_category}
        info={product.info}
        inStock={product.inStock}
        thumbnails={{
          url: product.thumbnails.url,
          description: product.thumbnails.description,
        }}
        editMode={true}
      />
    </div>
  );
}

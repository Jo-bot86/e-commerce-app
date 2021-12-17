import React, { ChangeEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDataApi } from '../../hooks/UseDataApi';
import { Product } from '../../shared/Product';
import { dataApi } from '../../shared/DataApi';
import { useLoginContext, useStoreContext } from '../../Store';
import LoadingSpinner from '../LoadingSpinner';
import ProductRating from './ProductRating';
import ProductThumbnails from './ProductThumbnails';
import ProductDetailsSelection from './ProductDetailsSelection';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [amount, setAmount] = useState<string>('1');
  const { dispatch } = useStoreContext();
  const history = useHistory();
  const { loginStore } = useLoginContext();

  const [product] = useDataApi<Product>(id);
  if (!product) {
    return <LoadingSpinner />;
  }

  const handleAmount = (e: ChangeEvent<HTMLSelectElement>) => {
    setAmount(e.target.value);
  };

  const getInStock = () => {
    return Array.from(Array(Number(product.inStock) || 0).keys());
  };

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product, amount });
  };

  const handleRemoveProduct = () => {
    dataApi('DELETE', `products/${id}`, () => history.push('/products'));
  };

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-3'>
          <ProductThumbnails urlList={product.thumbnails.url} />
        </div>
        <div className='col-5 '>
          <h3>{product.thumbnails.description}</h3>
          Bewertungen
          <span className='mx-2'>
            {product.rating && <ProductRating rating={product.rating} />}
          </span>
          <hr />
          <h4>Beschreibung</h4>
          <br />
          {product.info}
        </div>
        <div className='col'>
          {loginStore.user?._id != product.userId && (
            <ProductDetailsSelection
              product={product}
              amount={amount}
              handleAmount={handleAmount}
              getInStock={getInStock}
              addToCart={addToCart}
            />
          )}
          <div>
            {loginStore.user?._id == product.userId && (
              <>
                <button
                  className='btn btn-primary mx-2 mb-2'
                  onClick={() => history.push(`/products/${id}/edit`)}
                >
                  Bearbeiten
                  <i className='mx-2 fas fa-edit'></i>
                </button>
                <button
                  className='btn btn-danger text-end mx-2 mb-2'
                  onClick={handleRemoveProduct}
                >
                  Löschen
                  <i className='mx-2 bi bi-trash'></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLoginContext, useStoreContext } from '../Store';
import ProductListItem from './product/ProductListItem';

export default function Cart() {
  const { store } = useStoreContext();
  const { loginStore } = useLoginContext();
  const history = useHistory();

  if (!store.cart.length) {
    return (
      <h4 className='text-center mt-5'>
        Ihr Warenkorb enthält noch keine Produkte
      </h4>
    );
  }

  const handleCheckout = () => {
    !loginStore.user && history.push('/login');
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-8'>
          <h1 className='text-center mt-5'>Warenkorb</h1>
          <div className=''>
            {store.cart.map((products, index) => (
              <div key={index} className='row m-5'>
                <div className='col'>
                  <ProductListItem product={products.product} isCart={true} />
                </div>
              </div>
            ))}
          </div>
          <div className='row m-5'>
            <div className='col'>
              <hr className='' />
              <p className='fs-5 mx-3 px-5 text-end'>
                Summe: (
                {store.cart
                  .map((el) => Number(el.amount))
                  .reduce((prev, curr) => prev + curr)}{' '}
                Artikel){' '}
                <span className='text fw-bold'>
                  {store.cart
                    .map((el) => Number(el.amount) * Number(el.product.price))
                    .reduce((prev, curr) => prev + curr)
                    .toFixed(2)}{' '}
                  €
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className='col mt-5 mx-4'>
          <div className='card'>
            <p className='mx-5 mt-5 text-start'>
              Summe: (
              {store.cart
                .map((el) => Number(el.amount))
                .reduce((prev, curr) => prev + curr)}{' '}
              Artikel){' '}
              <span className='text fw-bold'>
                {store.cart
                  .map((el) => Number(el.amount) * Number(el.product.price))
                  .reduce((prev, curr) => prev + curr)
                  .toFixed(2)}{' '}
                €
              </span>
            </p>
            <button
              className='btn btn-warning mx-5 mb-5'
              onClick={handleCheckout}
            >
              Zur Kasse gehen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Product } from '../../shared/Product';
import { useStoreContext } from '../../Store';

interface Props {
  product: Product;
  isCart?: boolean;
}

export default function ProductListItem(props: Props) {
  const { product } = props;
  const history = useHistory();
  const { store, dispatch } = useStoreContext();
  const findProductIndex = () =>
    store.cart.findIndex((el) => el.product._id == product._id);

  const showDetails = (id: string) => {
    !props.isCart && history.push(`/products/${id}`);
  };

  const getInStock = () =>
    Array.from(Array(Number(product.inStock) || 0).keys());

  const onChangeCardAmount = (e: ChangeEvent<HTMLSelectElement>) => {
    Number(store.cart[findProductIndex()].amount) <
    Number(e.currentTarget.value)
      ? dispatch({
          type: 'ADD_TO_CART',
          product,
          amount: (
            Number(e.currentTarget.value) -
            Number(store.cart[findProductIndex()].amount)
          ).toString(),
        })
      : dispatch({
          type: 'REMOVE_SINGLE_PRODUCT_FROM_CART',
          product,
          amount: e.currentTarget.value,
        });
  };

  const onDeleteProduct = () => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      product,
      amount: '',
    });
  };

  return (
    <>
      <div
        className='btn card m-2 shadow shadow-intensity-xl'
        onClick={() => showDetails(product._id!)}
      >
        <div className='container d-flex '>
          <div className='col-2'>
            <img
              className=''
              style={{ width: '6rem' }}
              src={product.thumbnails.url[0]}
              alt=''
            />
          </div>
          <div className='col-8'>
            <div>
              <h3>{product.name}</h3>
              <p>{product.thumbnails.description}</p>
            </div>
            {props.isCart && (
              <>
                <label className='mx-2' htmlFor='qty'>
                  Menge:
                </label>
                <select
                  id='qty'
                  value={store.cart[findProductIndex()].amount}
                  onChange={onChangeCardAmount}
                >
                  {getInStock().map((el) => (
                    <option key={el + 1} value={(el + 1).toString()}>
                      {(el + 1).toString()}
                    </option>
                  ))}
                </select>
                <button
                  className='btn btn-danger btn-sm mx-3'
                  onClick={onDeleteProduct}
                >
                  <i className='bi bi-trash'></i>
                  Löschen
                </button>
              </>
            )}
          </div>
          {props.isCart && (
            <div className='col-2'>
              <h4>{product.price} €</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

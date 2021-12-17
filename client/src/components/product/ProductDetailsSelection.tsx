import React, { ChangeEvent } from 'react'
import { Product } from '../../shared/Product';

interface Props {
  product: Product;
  amount: string;
  handleAmount: (e: ChangeEvent<HTMLSelectElement>) => void;
  getInStock: () => number[];
  addToCart: () => void;
}

export default function ProductDetailsSelection(props: Props) {
  const {product, amount, handleAmount, getInStock, addToCart} = props
  return (
    <div className='card shadow mb-3'>
      <div className='card-item text-end text-danger mx-3'>
        {product.price} €
      </div>
      <div className='card-item text-end mx-3'>
        Preisangaben inkl. USt. Abhängig von der Lieferadresse kann die USt. an
        der Kasse variieren.
      </div>
      <div className='card-item'></div>
      <div className='card-item'></div>
      <div className='card-item text-success m-3'>
        Nur noch {product.inStock} auf Lager
      </div>
      <div className='card-item'>
        <label htmlFor='qty' className='mx-3'>
          Menge:
        </label>
        <select id='qty' value={amount} onChange={handleAmount}>
          {getInStock().map((el) => (
            <option key={el + 1} value={(el + 1).toString()}>
              {(el + 1).toString()}
            </option>
          ))}
        </select>
      </div>
      <div className='card-item text-center m-3'>
        <div className='d-grid gap-2'>
          <button className='btn btn-warning rounded-pill ' onClick={addToCart}>
            In den Warenkorb
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDataApi } from '../hooks/UseDataApi';
import { Product } from '../shared/Product';
import { dataApi } from '../shared/DataApi';

export default function SearchBar() {
  const [products, setProducts] = useDataApi<Product[]>();
  const [searchTerm, setSearchTerm] = useState('');
  const [hasFocus, setHasFocus] = useState(false);
  const history = useHistory();

  const onShowResults = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    searchTerm.length > 0 &&
      dataApi<Product[]>('GET', `products/search/${searchTerm}`, setProducts);
  }, [searchTerm, setProducts]);

  const handleOnMouseDown = (productId: string | undefined) => {
    setSearchTerm('')
    history.push(`/products/${productId}`);
  };

  return (
    <div className='dropdown'>
      <input
        className='form-control me-2 dropdown-toogle data-bs-toggle="dropdown" aria-expanded="fal"'
        autoComplete='off'
        id='dropdownMenu'
        type='search'
        placeholder='Search'
        aria-label='Search'
        value={searchTerm}
        onChange={onShowResults}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      />
      <div
        className={`dropdown-menu ${
          searchTerm.length > 0 && hasFocus && 'd-inline'
        }`}
        aria-labelledby='dropdownMenu'
      >
        <ul style={{ listStyle: 'none' }}>
          {products?.map((product, index) => (
            <li key={index}>
              <Link
                to=''
                className='dropdown-item'
                onMouseDown={() => handleOnMouseDown(product._id)}
              >
                {product.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

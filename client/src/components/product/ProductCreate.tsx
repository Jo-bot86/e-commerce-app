import React from 'react';
import ProductForm from './ProductForm';

export default function ProductCreate() {
  const createProduct = {
    name: '',
    price: 0,
    main_category: '',
    sub_category: '',
    info: '',
    inStock: '',
    thumbnails: {
      url: [''],
      description: '',
    },
  };
  return (
    <div>
      <h3 className='text-center mt-5'>Füge ein neues Produkt hinzu</h3>
      <ProductForm
        name={''}
        price={0}
        main_category={''}
        sub_category={''}
        info={''}
        inStock={''}
        thumbnails={{
          url: [''],
          description: '',
        }}
        editMode={false}
      />
    </div>
  );
}

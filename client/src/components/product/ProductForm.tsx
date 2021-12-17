import React, { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { dataApi } from '../../shared/DataApi';
import { categories, subCategories } from '../../shared/ProductCategory';
import { useLoginContext } from '../../Store';

interface Props {
  id?: string;
  name: string;
  price: number;
  main_category: categories;
  sub_category: string;
  info: string;
  inStock: string;
  thumbnails: {
    url: string[];
    description: string;
  };
  editMode: boolean;
}

export default function ProductForm(props: Props) {
  const [productName, setProductName] = useState<string>(props.name);
  const [productCategory, setProductCategory] = useState<categories>(
    props.main_category
  );
  const [productSubCategory, setProductSubCategory] = useState<string>(
    props.sub_category
  );
  const [productPrice, setProductPrice] = useState<string>(
    props.price.toString()
  );
  const [stock, setStock] = useState<string>(props.inStock);
  const [thumbnailDescription, setThumbnailDescripiton] = useState<string>(
    props.thumbnails.description
  );
  const [thumbnailUrls, setThumbnailUrls] = useState<string[]>(
    props.thumbnails.url
  );
  const [productInfo, setProductInfo] = useState<string>(props.info);

  const history = useHistory();
  const {loginStore} = useLoginContext()

  const onAddUrlField = () => {
    setThumbnailUrls((currUrls) => [...currUrls, '']);
  };

  const onRemoveUrlField = (index: number) => {
    thumbnailUrls.length > 1 &&
      setThumbnailUrls((currUrls) => [
        ...[...currUrls].splice(0, index),
        ...[...currUrls].splice(index + 1),
      ]);
  };

  const handleThumbnailUrls = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setThumbnailUrls((currUrls) => {
      const newUrls = [...currUrls];
      newUrls[index] = e.target.value;
      return newUrls;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product = createProduct()
    props.editMode
      ? dataApi(
          'PUT',
          `products/${props.id}`,
          () => history.push(`/products/${props.id}`),
          createProduct()
        )
      : dataApi(
          'POST',
          'products',
          () => history.push('/products'),
          createProduct()
        );
  };

  const createProduct = () => ({
    name: productName,
    price: Number(productPrice),
    main_category: productCategory,
    sub_category: productSubCategory,
    info: productInfo,
    inStock: stock,
    thumbnails: {
      url: thumbnailUrls,
      description: thumbnailDescription,
    },
    userId: loginStore.user?._id
  });

  return (
    <div className='container mt-5'>
      <div className='mx-5'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='product-name' className='form-label'>
              Produktbezeichnung
            </label>
            <input
              type='text'
              className='form-control'
              id='product-name'
              placeholder='Z.b. Lenovo Thinkpad T14'
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='product-category' className='form-label'>
              Kategorie
            </label>
            <select
              className='form-select'
              name='product-category'
              id='product-category'
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value as categories)}
              required
            >
              <option value=''>--Wähle eine Kategorie--</option>
              {categories.map((category, index) => (
                <option
                  key={index}
                  value={`${category}`}
                >{`${category}`}</option>
              ))}
            </select>
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='product-subcategory'>
              Unterkategorie
            </label>
            <select
              className='form-select'
              name='product-subcategory'
              id='product-subcategory'
              disabled={!productCategory && true}
              value={productSubCategory}
              onChange={(e) => setProductSubCategory(e.target.value)}
              required
            >
              <option value=''>--Wähle eine Unterkategorie--</option>
              {productCategory &&
                subCategories[productCategory].map((subCat, index) => (
                  <option key={index} value={`${subCat}`}>{`${subCat}`}</option>
                ))}
            </select>
          </div>
          <label className='form-label' htmlFor='product-price'>
            Preis
          </label>
          <div className='input-group mb-3'>
            <span className='input-group-text'>€</span>
            <input
              type='number'
              id='product-price'
              className='form-control'
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
              step={0.01}
              min={0}
            />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='inStock'>
              Bestand
            </label>
            <input
              type='number'
              id='inStock'
              className='form-control'
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              min={1}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='thumbnail-description' className='form-label'>
              Produktmerkmale
            </label>
            <input
              type='text'
              name='thumbnail-description'
              id='thumbnail-description'
              className='form-control'
              value={thumbnailDescription}
              onChange={(e) => setThumbnailDescripiton(e.target.value)}
              placeholder='Kurze Beschreibung der wichtigsten Merkmale des Produkts'
            />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='inStock'>
              Fotos
            </label>
            <button
              type='button'
              className='btn btn-primary mx-2 m-1'
              onClick={onAddUrlField}
            >
              +
            </button>
            <div className='row'>
              {thumbnailUrls.map((thumbnailUrl, index) => (
                <Fragment key={index}>
                  <div className='col-11'>
                    <input
                      name='thumbnail-url'
                      id={`thumbnail-url-${index}`}
                      type='url'
                      className='form-control mb-1'
                      value={thumbnailUrl}
                      onChange={(e) => handleThumbnailUrls(e, index)}
                    />
                  </div>
                  <div className='col text-end'>
                    <button
                      type='button'
                      className='btn btn-danger'
                      onClick={() => onRemoveUrlField(index)}
                      disabled={thumbnailUrls.length == 1}
                    >
                      <i className='bi bi-trash'></i>
                    </button>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <div className='mb-3'>
            <div className='form-floating'>
              <textarea
                className='form-control'
                id='product-info'
                maxLength={250}
                onChange={(e) => setProductInfo(e.target.value)}
                value={productInfo}
              ></textarea>
              <label htmlFor='product-info'>Produktbeschreibung</label>
            </div>
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

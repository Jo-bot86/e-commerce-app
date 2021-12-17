import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CategoryList from './category/CategoryList'
import Home from './Home'
import Cart from './Cart'
import ProductDetails from './product/ProductDetails'
import ProductList from './product/ProductList'
import ProductCreate from './product/ProductCreate'
import ProductEdit from './product/ProductEdit'
import UserLogin from './user/UserLogin'
import UserRegistration from './user/UserRegistration'
import UserProductList from './user/UserProductList'

export default function Routes() {
  
  return (
    <Switch>
      <Route path='/categories'>
        <CategoryList />
      </Route>
      <Route path='/products/:id/edit'>
        <ProductEdit />
      </Route>
      <Route path='/products/user/:userid'>
        <UserProductList />
      </Route>
      <Route path='/products/new'>
        <ProductCreate />
      </Route>
      <Route path='/products/:id'>
        <ProductDetails />
      </Route>
      <Route path='/login'>
        <UserLogin />
      </Route>
      <Route path='/register'>
        <UserRegistration />
      </Route>
      <Route path='/cart'>
        <Cart />
      </Route>
      <Route path='/products'>
        <ProductList />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  );
}

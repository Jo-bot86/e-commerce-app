import React, { Dispatch, ReactElement, useContext, useReducer } from 'react';
import { Product } from './shared/Product';
import { User } from './shared/User';

export interface Store {
  cart: { product: Product; amount: string }[];
}

export interface LoginStore {
  user: User | undefined
}

export const initialStore: Store = {
  cart: [],
};

export const initialLoginStore: LoginStore = {
  user: undefined
}

export interface AddToCart {
  type: 'ADD_TO_CART';
  product: Product;
  amount: string;
}

export interface RemoveFromCart {
  type: 'REMOVE_FROM_CART';
  product: Product;
  amount: string;
}

export interface RemoveSingleProductFromCart {
  type: 'REMOVE_SINGLE_PRODUCT_FROM_CART';
  product: Product;
  amount: string;
}

export interface AddUser {
  type: 'ADD_USER';
  user: User
}

export interface RemoveUser {
  type: 'Remove_User';
}

export type Action = AddToCart | RemoveSingleProductFromCart | RemoveFromCart;

export type LoginAction = AddUser | RemoveUser;


export function reducer(store: Store, action: Action): Store {
  const productIndex = store.cart.findIndex(
    (el) => el.product._id == action.product._id
  );
  switch (action.type) {
    case 'ADD_TO_CART': {
      if (productIndex === -1) {
        return {
          ...store,
          cart: [
            ...store.cart,
            { product: action.product, amount: action.amount },
          ],
        };
      }
      const newCart = store.cart.filter(
        (el) => el.product._id != action.product._id
      );
      const newAmount =
        Number(store.cart[productIndex].amount) + Number(action.amount);
      newCart.splice(productIndex, 0, {
        ...store.cart[productIndex],
        amount: newAmount.toLocaleString(),
      });
      return {
        ...store,
        cart: newCart,
      };
    }
    case 'REMOVE_SINGLE_PRODUCT_FROM_CART': {
      const newProduct = {
        ...store.cart[productIndex],
        amount: action.amount,
      };
      const newCart = store.cart.filter(
        (el) => el.product._id != action.product._id
      );
      newCart.splice(productIndex, 0, newProduct);
      return {
        ...store,
        cart: newCart,
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...store,
        cart: store.cart.filter((el) => el.product._id != action.product._id),
      };

    default:
      return store;
  }
}

export function loginReducer(loginStore: LoginStore, action: LoginAction): LoginStore{
  switch(action.type){
    case 'ADD_USER':
      return {
        ...loginStore,
        user: action.user
      }
    case 'Remove_User':
      return {
        ...loginStore,
        user: undefined
      }
    default:
      return loginStore
  }
}

interface StoreContextProps {
  store: Store;
  dispatch: Dispatch<Action>;
}

interface LoginStoreContextProps {
  loginStore: LoginStore;
  dispatch: Dispatch<LoginAction>
}

const StoreContext = React.createContext({} as StoreContextProps);
StoreContext.displayName = 'StoreContext';

const LoginStoreContext = React.createContext({} as LoginStoreContextProps);
LoginStoreContext.displayName = 'LoginContext';

export const useStoreContext = () => useContext(StoreContext);

export const useLoginContext = () => useContext(LoginStoreContext);

interface Props {
  children: ReactElement;
}
export function StoreContextProvider(props: Props) {
  const [store, dispatch] = useReducer(reducer, initialStore);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
}

export function LoginContextProvider(props: Props){
  const [loginStore, dispatch] = useReducer(loginReducer, initialLoginStore);

  return(
    <LoginStoreContext.Provider value={{loginStore, dispatch}}>
      {props.children}
    </LoginStoreContext.Provider>
  )
}

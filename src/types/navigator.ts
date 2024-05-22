import ProductResponse from '../payload/response/ProductResponse';

export type RootStackParamList = {
  BottomTabMenu: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProductScreen: {product: ProductResponse};
};

export type BottomTabParamList = {
  Home: undefined;
  Menu: undefined;
  LoginScreen: undefined;
  UserScreen: undefined;
};

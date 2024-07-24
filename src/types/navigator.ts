import Cost from '../models/Cost';
import ProductResponse from '../payload/response/ProductResponse';

export type RootStackParamList = {
  SpashScreen: undefined;
  BottomTabMenu: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProductScreen: {product: ProductResponse};
  AddCostsScreen: undefined;
  CostsScreen: undefined;
  EditCostScreen: {item: Cost};
};

export type BottomTabParamList = {
  Home: undefined;
  Menu: undefined;
  BottomLoginScreen: undefined;
  UserScreen: undefined;
  RegisterScreen: undefined;
};

import ProductResponse from './ProductResponse';

interface DailyPriceResponse {
  id: number;
  date: string;
  cityName: string;
  minPrice: number;
  maxPrice: number;
  priceStatus: number;
  product: ProductResponse;
}
export default DailyPriceResponse;

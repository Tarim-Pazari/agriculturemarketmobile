import DailyPriceResponse from './DailyPriceResponse';
import ProductResponse from './ProductResponse';

interface PriceTrackingResponse {
  id: number;
  productId: number;
  product: ProductResponse;
  minPrice: number;
  maxPrice: number;
  addedMinPrice: number;
  addedMaxPrice: number;
  createdAt: Date;
}
export default PriceTrackingResponse;

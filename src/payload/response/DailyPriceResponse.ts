import ProductResponse from './ProductResponse';

interface DailyPriceResponse {
  id: number;
  createdAt: Date;
  cityName: string;
  date: string;
  maxPrice: number;
  minPrice: number;
  priceStatus: number;
  productId: number;
  name: string;
  icon: string;
  unit: string;
  districtName: string;
  isTracking: boolean;
  priceTrackingId: number;
}
export default DailyPriceResponse;

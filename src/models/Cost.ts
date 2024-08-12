import CostItem from './CostItem';

interface Cost {
  id?: string;
  userId: string;
  date: string;
  total: number;
  items: CostItem[];
}
export default Cost;

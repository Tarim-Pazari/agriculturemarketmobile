import CostItem from './CostItem';

interface Cost {
  id?: string;
  userId: string;
  date: string;
  items: CostItem[];
}
export default Cost;

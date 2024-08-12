import User from '../models/User';
import Collection from '../firebase/Collection';
import firestore from '@react-native-firebase/firestore';
import Cost from '../models/Cost';
class CostRepository {
  private static instance: CostRepository;
  private costCollection = firestore().collection(Collection.COSTS);

  public static getInstance(): CostRepository {
    if (!CostRepository.instance) {
      CostRepository.instance = new CostRepository();
    }
    return CostRepository.instance;
  }

  private constructor() {}

  async addCost(cost: Cost) {
    const docId = this.costCollection.doc().id;
    cost.id = docId;
    cost.total = 10;
    return this.costCollection.doc(docId).set(cost);
  }

  async updateCost(cost: Cost) {
    return this.costCollection.doc(cost.id).update(cost);
  }

  async deleteCost(costId: string) {
    return this.costCollection.doc(costId).delete();
  }

  async getCost(costId: string) {
    const costSnapShot = await this.costCollection.doc(costId).get();
    return costSnapShot.data() as Cost;
  }

  async getCostsByUserId(userId: string) {
    const costSnapShot = await this.costCollection.get();
    return costSnapShot.docs
      .filter(doc => doc.data().userId === userId)
      .map(doc => doc.data() as Cost);
  }
}

export default CostRepository;

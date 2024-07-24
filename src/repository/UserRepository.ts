import User from '../models/User';
import Collection from '../firebase/Collection';
import firestore from '@react-native-firebase/firestore';
class UserRepository {
  private static instance: UserRepository;
  private userCollection = firestore().collection(Collection.USERS);

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  private constructor() {}

  async addUser(user: User) {
    return this.userCollection.doc(user.id).set(user);
  }

  async updateUser(user: User) {
    return this.userCollection.doc(user.id).update(user);
  }

  async deleteUser(userId: string) {
    return this.userCollection.doc(userId).delete();
  }

  async getUser(userId: string) {
    const userSnapshot = await this.userCollection.doc(userId).get();
    return userSnapshot.data() as User;
  }

  async getAllUsers() {
    const userSnapshot = await this.userCollection.get();
    return userSnapshot.docs.map(doc => doc.data() as User);
  }
}

export default UserRepository;

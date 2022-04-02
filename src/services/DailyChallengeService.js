import firebase from "../plugins/firebase/firebaseConfig";

const db = firebase.collection("dailyChallenge");

class DailyChallengeService {
  getAll() {
    return db;
  }
}
export default new DailyChallengeService();
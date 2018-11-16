export class FirebaseUserModel {
  id: string;
  image: string;
  name: string;
  email: string;
  provider: string;
  isAdmin: boolean;

  constructor(){
    this.id = "";
    this.image = "";
    this.name = "";
    this.email = "";
    this.provider = "";
    this.isAdmin = false;
  }
}

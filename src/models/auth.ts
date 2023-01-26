class Auth {
  isLoggedIn: boolean;
  token: string;
  email: string;

  constructor(isLoggedIn: boolean, token: string, email: string) {
    this.isLoggedIn = isLoggedIn;
    this.token = token;
    this.email = email;
  }
}

export default Auth;

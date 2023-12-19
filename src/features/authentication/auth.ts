import { Auth } from "aws-amplify"; // Import the original Auth module
import MockAuthentication from "../../../authSimulator";

class AuthProvider {
  authService: typeof MockAuthentication;
  constructor() {
    this.authService =
      process.env.NODE_ENV === "production" ? Auth : MockAuthentication;
  }

  async signIn(username: string, password: string) {
    return await this.authService.signIn(username, password);
  }

  async signUp(username: string, password: string) {
    return await this.authService.signUp({
      username,
      password,
      attributes: {
        email: username,
      },
    });
  }

  async confirmSignUp(username: string, code: string) {
    return await this.authService.confirmSignUp(username, code);
  }

  async signOut() {
    return await this.authService.signOut();
  }

  async changePassword(
    username: string,
    oldPassword: string,
    newPassword: string
  ) {
    return await this.authService.forgotPasswordSubmit(
      username,
      oldPassword,
      newPassword
    );
  }

  async forgotPassword(username: string) {
    return await this.authService.forgotPassword(username);
  }

  async forgotPasswordSubmit(
    username: string,
    code: string,
    newPassword: string
  ) {
    return await this.authService.forgotPasswordSubmit(
      username,
      code,
      newPassword
    );
  }
}

const authProvider = new AuthProvider();
export default authProvider;

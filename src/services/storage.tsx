export class Storage {
  static saveToken(value: string) {
    window.sessionStorage.setItem("JWT", value);
  }

  static getToken(): string {
    return window.sessionStorage.getItem("JWT") || "";
  }
}

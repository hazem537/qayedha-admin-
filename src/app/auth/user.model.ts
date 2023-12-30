export class User {
  constructor(
    public adminUser: {
      createdAt: string;
      id: string;
      role: string;
      username: string;
    },
    private _token: string
  ) {}

  get token() {
    if (this._token) {
      return this._token;
    }
    return null;
  }
}

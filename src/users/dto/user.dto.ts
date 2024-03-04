export class UserDto {
  user: {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  };
  token: string;
}

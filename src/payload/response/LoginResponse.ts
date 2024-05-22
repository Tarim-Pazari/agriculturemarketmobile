import RoleResponse from './RoleResponse';

interface LoginResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  token: string;
  status: string;
  roles: RoleResponse[];
}
export default LoginResponse;

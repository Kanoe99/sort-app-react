import { User } from "./types";

const can = (user: User, permission: string): boolean => {
  return user.permissions.includes(permission);
};
const hasRole = (user: User, role: string): boolean => {
  return user.roles.includes(role);
};

export { can };

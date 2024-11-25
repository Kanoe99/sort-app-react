import { Config } from "ziggy-js";

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  permissions: string[];
  roles: string[];
}

type PaginatedData<T = any> = {
  data: T[];
  links: Record<string, string>;
};

type Feature = {
  id: number;
  name: string;
  description: string | null;
  user: User;
  created_at: string;
  upvote_count: number;
  user_has_upvoted: boolean;
  user_has_downvoted: boolean;
};

type PageProps<T extends Record<string, unknown> = Record<string, unknown>> =
  T & {
    auth: {
      user: User;
    };
    ziggy: Config & { location: string };
  };

export { User, PaginatedData, PageProps, Feature };

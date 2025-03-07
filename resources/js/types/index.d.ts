import { Config } from "ziggy-js";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  permissions: string[];
  roles: string[];
}

export type PaginatedData<T = any> = {
  model: ReactNode;
  data: T[];
  links: Record<string, string>;
};

export type Comment = {
  id: number;
  comment: string;
  created_at: string;
  user: User;
};

export type Tag = {
  id: number;
  name: string;
};

export type Feature = {
  id: number;
  name: string;
  description: string;
  user: User;
  created_at: string;
  upvote_count: number;
  user_has_upvoted: boolean;
  user_has_downvoted: boolean;
  comments: Comment[];
};
export type Printer = {
  id: number;
  department: string;
  department_head: string;
  isLocal: boolean;
  PC_name: string;
  network_capable: string;
  type: string;
  model: string;
  number: number;
  location: string;
  IP: string;
  status: string;
  comment: string;
  attention: boolean;
  logo: string;
  counter: string;
  counterDate: string;
  fixDate: string;
  isIPv4: boolean;
  tags: Tag[];
  sum_pages: PrintPage[];
  three_last_pages: PrintPage[];
};

export type PrintPage = {
  created_at: string;
  end_month: number;
  end_year: number;
  id: number;
  isSum: number;
  print_pages: number;
  printer_id: number;
  scan_pages: number;
  start_year: number;
  start_month: number;
  updated_at: string;
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
  tags: Tag[];
  printers: PaginatedData<Printer>; // Here the printers prop is typed as PaginatedData<Printer>
  aprinters: PaginatedData<Printer>; // Here the aprinters prop is typed as PaginatedData<Printer>
  ziggy: Config & { location: string };
};

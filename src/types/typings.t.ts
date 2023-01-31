import type { ReactNode } from "react";

export interface Login {
  password: string;
  email: string;
  lat: string;
  lon: string;
}

export interface NormalUser {
  name: string;
  email: string;
  password: string;
  lat: string;
  lon: string;
}

export interface AuthorityUser {
  name: string;
  email: string;
  password: string;
}

export type Code = {
  code: string;
  uuid: string;
};

export type Route = {
  inactive_icon?: ReactNode;
  active_icon?: ReactNode;
  name?: string | ReactNode;
  to: string;
};

export type TabsData = {
  label?: string;
  icon?: ReactNode;
  content: ReactNode;
};

export type SelectionOption = {
  name: string;
  value: string;
};

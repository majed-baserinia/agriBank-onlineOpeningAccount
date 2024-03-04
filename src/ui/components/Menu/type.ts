import { ReactNode } from "react";

export type Props = {
  list: item[];
};

type item = {
  title: string;
  icon: ReactNode;
  onClick?: (e: React.SyntheticEvent) => void;
  routeTo?: string;
};

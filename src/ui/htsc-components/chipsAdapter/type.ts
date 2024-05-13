export type Props = {
    label: string;
    size?: "small" | "medium";
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    checked?: boolean;
    color?: "primary" | "default" | "secondary" | "error" | "info" | "success" | "warning";
    count?: number;
  };
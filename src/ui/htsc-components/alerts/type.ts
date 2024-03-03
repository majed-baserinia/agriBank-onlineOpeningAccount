export type AppAlert =
  | {
      type: "success" | "info" | "warning" | "error";
      messageText?: string;
      actions?: { onClick?: () => void; onCloseModal?: () => void };
    }
  | {
      type: "errorWithConfirmation" | "warningWithConfirmation";
      messageText?: string;
      actions?: {
        onClick?: () => void;
        onConfirm?: () => void;
        onCloseModal?: () => void;
      };
    };

export type props = {
  type:
    | "success"
    | "info"
    | "warning"
    | "error"
    | "errorWithConfirmation"
    | "warningWithConfirmation";
};

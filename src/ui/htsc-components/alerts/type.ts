export type AppAlert = {
  type: 
    | "success"
    | "info"
    | "warning"
    | "error"
    | "errorWithConfirmation"
    | "warningWithConfirmation";
  messageText?: string;
  hasConfirmAction?: boolean
  hasContinueAction?: boolean
  actions?: {  onCloseModal?: () => void; onConfirm?: () => void, onContinue?:()=>void };
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

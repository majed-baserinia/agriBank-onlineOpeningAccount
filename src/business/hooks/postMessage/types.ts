export type initialData = {
  idToken: string;
  language: string;
  osType: number | string;
  refreshToken: string;
  themeName: string;
};

export type postMessageTypes =
  | "tokenIsNotValid"
  | "iFrameReady"
  | "isFinishedBack"
  | "reset"
  | "clearCache"
  | "navigate"
  | "readSMS";

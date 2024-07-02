export enum EModalManagerActions {
    SHOW_AUTH_MODAL = "SHOW_AUTH_MODAL",
    HIDE_AUTH_MODAL = "HIDE_AUTH_MODAL",
}

export type ModalManagerActions =
    | {
          type: EModalManagerActions.SHOW_AUTH_MODAL;
          payload?: any;
      }
    | {
          type: EModalManagerActions.HIDE_AUTH_MODAL;
          payload?: any;
      };

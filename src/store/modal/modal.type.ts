export class ModalManager {
  authModal: {
    open: boolean;
    content: "";
  };
  constructor(authModal: { open: boolean; content: "" }) {
    this.authModal = authModal;
  }
}

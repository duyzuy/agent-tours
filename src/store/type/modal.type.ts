export interface IModalManagers {
    authModal: {
        open?: boolean;
        content?: "";
    };
}
export class ModalManagerData implements IModalManagers {
    authModal: {
        open?: boolean;
        content?: "";
    };
    constructor(authModal: { open?: boolean; content?: "" }) {
        this.authModal = authModal;
    }
}

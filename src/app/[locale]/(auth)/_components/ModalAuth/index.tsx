"use client";
import { Modal } from "antd";
import { useEffect, useState } from "react";

const ModalAuth = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Modal
                title="Vertically centered modal dialog"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </>
    );
};
export default ModalAuth;

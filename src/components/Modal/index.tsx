import ReactModal from "react-modal";
import styled, { CSSProperties } from "styled-components";

type ModalProps = {
    show: boolean;
    children: React.ReactNode;
}

type TypeModalStyle = {
    overlay: React.CSSProperties;
    content: React.CSSProperties;
}

const StyleReactModal: TypeModalStyle = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.50)'
    },
    content: {
        position: "absolute",
        margin:  "0 auto",
        width: "320px",
        height: "370px",
        background: '#E5E5E5',
    }
};

const Modal = ({ show, children }: ModalProps) => {
    return (
        <div>
            <ReactModal isOpen={show} style={StyleReactModal} >{children}</ReactModal>
        </div>
    );
};

export default Modal;
import ReactModal from "react-modal";

type ModalProps = {
    show: boolean;
    children: React.ReactNode;
}

const Modal = ({ show, children }: ModalProps) => {
    return (
        <div>
            <ReactModal isOpen={show}>{children}</ReactModal>
        </div>
    );
};

export default Modal;
import ReactModal from "react-modal";
import styled, { CSSProperties } from "styled-components";

/**
 * Modalコンポーネントの型を定義
 */
type ModalProps = {
    show: boolean;
    children: React.ReactNode;
}

/**
 * ReactModalのstyle属性に渡すオブジェクトの型を定義
 */
type TypeModalStyle = {
    overlay: React.CSSProperties;
    content: React.CSSProperties;
}
/**
 * ReactModalのstyle属性に渡すオブジェクトを作成
 */
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

/**
 * モーダルを表示するコンポーネント
 */
const Modal = ({ show, children }: ModalProps) => {
    return <ReactModal isOpen={show} style={StyleReactModal} >{children}</ReactModal>;
};

export default Modal;
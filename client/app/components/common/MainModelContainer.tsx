"use client";
import { IoClose } from "react-icons/io5";
import { createRef, FC, useEffect } from "react";
import { Overlay, Modal, ModalHeader, ModalTitle, CloseButton } from "@/utils/styles/model";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
};

export const MainModelContainer: FC<Props> = ({ setShowModal, title, children }) => {
    const ref = createRef<HTMLDivElement>();
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => e.key === "Escape" && setShowModal(false);
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { current } = ref;
    if (current === e.target) {
      console.log("Close Modal");
      setShowModal(false);
    }
  };

  return (
    <Overlay ref={ref} onDoubleClick={handleOverlayClick}>
      <Modal className="animate__animated animate__fadeInDown">
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={() => setShowModal(false)}>
            <IoClose />
          </CloseButton>
        </ModalHeader>
        {children}
      </Modal>
    </Overlay>
  );
}
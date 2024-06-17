"use client"
import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: top 0.1s ease-out;
  z-index: 20;
`;

export const Modal = styled.div`
  background-color: #262626;
  border: 1px solid #4b5563;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 0.375rem;
  width: 35%;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #4b5563;
`;

export const ModalTitle = styled.h3`
  font-weight: bold;
  color: #fff;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;
`;

export const ModalBody = styled.div`
  padding: 1rem;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.75rem 1rem;
  border-top: 1px solid #4b5563;
  gap: 10px;
`;

export const StyledButton = styled.button`
  background-color: #3b82f6;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2563eb;
  }
`;
"use client";
import styled from "styled-components";
import colors from "../colors";



export const Container = styled.div`
  text-align: left;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem; 
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${colors.white};
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  width: 100%;
  border: 1px solid ${colors.neutral600};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  background-color: ${colors.neutral900};
  color: ${colors.neutral400};
  
  &:focus {
    border-color: ${colors.neutral600};
    box-shadow: 0 0 0 1px ${colors.neutral600}; 
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;

  & > * {
    flex-shrink: 0;
    width: 1rem; 
    height: 1rem;
  }
`;

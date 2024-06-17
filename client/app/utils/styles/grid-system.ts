"use client";
import styled from "styled-components";

// Define the prop types for Container
interface ContainerProps {
  size?: number;
}

// Define the prop types for Column
interface ColumnProps {
  size?: number;
  smSize?: boolean;
}

// Container with optional padding and max-width
const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: ${(props) =>
    props.size ? `calc(${props.size / 12} * 100%)` : "100%"};
  margin: 0 auto;
`;

// Row with flex display
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -15px;
`;

// Column with dynamic width based on props
const Column = styled.div<ColumnProps>`
  flex: ${(props) => props.size ? `0 0 calc(${props.size / 12} * 100%)` : "1"};
  max-width: ${(props) => props.size ? `calc(${props.size / 12} * 100%)` : "100%"};
  padding: 15px;

  @media (max-width: 768px) {
    display: ${(props) => props.smSize && "none"};

  }
`;

export { Container, Row, Column };


    /* flex: ${(props) => props.smSize ? `0 0 calc(${props.smSize / 12} * 100%)` : "100%"};
    max-width: ${(props) => props.smSize ? `calc(${props.smSize / 12} * 100%)` : "100%"}; */
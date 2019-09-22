import styled from "styled-components";

export const StyledProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 250px);
  column-gap: 15px;
  row-gap: 15px;
  justify-content: space-between;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: max-content auto;
  row-gap: 15px;
`;

export const Bar = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  justify-content: space-between;
`;

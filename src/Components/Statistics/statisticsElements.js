import styled from "styled-components";

export const StatisticContainer = styled.div``;

export const StatisticWrapper = styled.div`
  width: 80%;
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;
`;

export const ColoredStatistic = styled.div`
  padding: 1em;
  font-size: 1.125rem;
  margin: 1em;
  border-radius: 5px;
  /* max-width: 200px; */
  background-color: ${({ blue, orange, purpple }) =>
    blue ? "#DEF1FF" : orange ? "#FFE7DD" : purpple ? "#F0DCFF" : "#FFF7DA"};
  border: 1px solid
    ${({ blue, orange, purpple }) =>
      blue ? "#22A1FE" : orange ? "#FE6621" : purpple ? "#9314FF" : "#FEC705"};
`;

export const ColoredStatisticLabel = styled.h4`
  font-size: 1rem;
  text-align: start;
  color: #2f2f2f;
`;

export const ColoredStatisticContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 1em auto;
  font-size: 1.5rem;
  color: ${({ blue, orange, purpple }) =>
    blue ? "#22A1FE" : orange ? "#FE6621" : purpple ? "#9314FF" : "#FEC705"};
`;

export const ColoredNumber = styled.div`
  font-weight: 800;
`;

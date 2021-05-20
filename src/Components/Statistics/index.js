import React from "react";
import {
  ColoredNumber,
  ColoredStatistic,
  ColoredStatisticContent,
  ColoredStatisticLabel,
  StatisticContainer,
  StatisticWrapper,
} from "./statisticsElements";
import * as FaIcons from "react-icons/fa";

function Statistics() {
  return (
    <StatisticContainer>
      <StatisticWrapper>
        <ColoredStatistic blue={true}>
          <ColoredStatisticLabel>Clients Number</ColoredStatisticLabel>
          <ColoredStatisticContent blue={true}>
            <FaIcons.FaUserFriends />
            <ColoredNumber>123</ColoredNumber>
          </ColoredStatisticContent>
        </ColoredStatistic>
        <ColoredStatistic orange={true}>
          <ColoredStatisticLabel>Clients Number</ColoredStatisticLabel>
          <ColoredStatisticContent orange={true}>
            <FaIcons.FaUserFriends />
            <ColoredNumber>123</ColoredNumber>
          </ColoredStatisticContent>
        </ColoredStatistic>
        <ColoredStatistic purpple={true}>
          <ColoredStatisticLabel>Clients Number</ColoredStatisticLabel>
          <ColoredStatisticContent purpple={true}>
            <FaIcons.FaUserFriends />
            <ColoredNumber>123</ColoredNumber>
          </ColoredStatisticContent>
        </ColoredStatistic>
      </StatisticWrapper>
    </StatisticContainer>
  );
}

export default Statistics;

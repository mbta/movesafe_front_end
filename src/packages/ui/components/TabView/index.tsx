"use client";
import React, { useState } from "react";
import {
  Container,
  TabList,
  TabItem,
  TabContent,
  TabIndicator,
  OptionText,
  TAB_VARIANT_BLUE,
  TAB_VARIANT_WHITE,
  RowContainer,
  Badge,
} from "./styles";

interface TabViewProps {
  options: string[];
  variant?: typeof TAB_VARIANT_BLUE | typeof TAB_VARIANT_WHITE;
  children: React.ReactNode;
  badgeValues?: number[];
}

const TabView: React.FC<TabViewProps> = ({
  options,
  variant = TAB_VARIANT_BLUE,
  children,
  badgeValues,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const moveHistoryTab: String = "MOVE HISTORY";
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Container>
      <TabList>
        {options.map((option, index) => (
          <TabItem
            key={index}
            onClick={() => handleTabClick(index)}
            data-active={activeTab === index}
            variant={variant}
          >
            <RowContainer>
              <OptionText>{option}</OptionText>
              {badgeValues && badgeValues[index] > 0 && (option !== moveHistoryTab) && (
                <Badge>{badgeValues[index]}</Badge>
              )}
            </RowContainer>
            <TabIndicator data-active={activeTab === index} variant={variant} />
          </TabItem>
        ))}
      </TabList>
      <TabContent>{React.Children.toArray(children)[activeTab]}</TabContent>
    </Container>
  );
};

export default TabView;

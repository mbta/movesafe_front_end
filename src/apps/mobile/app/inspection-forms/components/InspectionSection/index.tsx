import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  Container,
  SectionHeader,
  SectionTitle,
  ExpandIcon,
  ItemsContainer,
  ItemText,
  CollapseContainer,
} from "./styles";

interface InspectionSectionProps {
  title: JSX.Element;
  children: React.ReactNode;
}

const InspectionSection: React.FC<InspectionSectionProps> = ({
  title,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Container>
      <SectionHeader onClick={() => setIsExpanded(!isExpanded)}>
        <SectionTitle>{title}</SectionTitle>
        <ExpandIcon>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </ExpandIcon>
      </SectionHeader>

      {isExpanded && <ItemsContainer>{children}</ItemsContainer>}
      {isExpanded && 
        <CollapseContainer onClick={() => setIsExpanded(!isExpanded)}>
          <ExpandIcon><FaChevronUp /></ExpandIcon>
          <ItemText>Close Section</ItemText>
        </CollapseContainer>
      }
    </Container>
  );
};

export default InspectionSection;

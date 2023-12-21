import styled from "styled-components";
import { applyThemeState } from "./state/atorms";
import { useRecoilValue } from "recoil";

function ThemeButton({ onClick }: { onClick: () => void }) {
  const applyTheme = useRecoilValue(applyThemeState);

  const _handleClick = () => {
    onClick();
  };

  return (
    <Container>
      <SwitchContainer className="switch">
        <SwitchInput onClick={_handleClick} type="checkbox" />
        <Slider isToggle={applyTheme === "dark"}></Slider>
      </SwitchContainer>
    </Container>
  );
}

export default ThemeButton;

const Container = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;
const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span<{ isToggle: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
  background-color: ${(props) => (props.isToggle ? "#21f3ad" : "#f5be18")};
  box-shadow: 0 0 1px ${(props) => (props.isToggle ? "#21f3ad" : "#f5be18")};

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: ${(props) => (props.isToggle ? "yellow" : "red")};
    transition: 0.4s;
    border-radius: 50%;
    transform: ${(props) => `translateX(${props.isToggle ? 26 : 0}px)`};
  }
`;

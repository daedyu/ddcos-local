import {ChevronDown} from "lucide-react";
import {useState} from "react";
import styled, {type CSSObject} from "styled-components";
import {DodamShape, DodamTypography} from "@b1nd/dds-web";

export interface SelectProps {
  items: string[];
  value: string;
  onSelectedItemChange: (type: string) => void;
  zIndex?: number;
  customStyle?: CSSObject;
}

export const Select = (
  {
     items,
     value,
     zIndex,
     onSelectedItemChange,
     customStyle,
  }: SelectProps) => {
  const [close, setClose] = useState<boolean>(true);

  return (
    <SelectContainer
      onClick={() => setClose((prev) => !prev)}
      style={customStyle}
    >
      <p>{value}</p>
      <SelectIcon close={close ? "true" : "false"}>
        <ChevronDown size={14} />
      </SelectIcon>
      {!close && (
        <SelectItemWrap style={{ zIndex }}>
          {items.map((item, idx) => (
            <SelectItem key={idx} onClick={() => onSelectedItemChange(item)}>
              {item}
            </SelectItem>
          ))}
        </SelectItemWrap>
      )}
    </SelectContainer>
  );
};

export const SelectContainer = styled.div`
  border: ${({ theme }) => `1px solid ${theme.primaryAlternative}`};
  width: min-content;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  position: relative;
  column-gap: 15px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.fillNormal};
  ${DodamShape.Small}
  > p {
    ${DodamTypography.Body1.Medium}
    white-space: nowrap;
    color: ${({ theme }) => theme.labelNormal};
  }
`

export const SelectIcon = styled.div<{ close: "true" | "false" }>`
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.labelNormal};
  transition: all 0.3s ease;

  ${({ close }) =>
  close === "false" &&
  "transform: rotate(180deg)"
}
`

export const SelectItemWrap = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  position: absolute;
  top: 44px;
  left: 0px;

  overflow: hidden;
  background-color: ${({ theme }) => theme.fillNormal};
  ${DodamShape.ExtraSmall}
  box-sizing: border-box;
`

export const SelectItem = styled.div`
  width: 100%;
  height: 35px;

  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 10px;
  ${DodamTypography.Caption1.Medium}
  color: ${({ theme }) => theme.labelNormal };

  :hover {
    filter: brightness(90%);
  }
`
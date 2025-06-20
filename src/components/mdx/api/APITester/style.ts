import styled from "styled-components"
import {DodamShape, DodamTypography} from "@b1nd/dds-web";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 55%;
    gap: 2rem;
    border: 1px solid ${({ theme }) => theme.lineNormal};
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    font-family: 'Segoe UI', sans-serif;
    
    * {
        margin: 0 !important;
    }
`

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

export const SettingWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`

export const Method = styled.span`
    color: ${({ theme }) => theme.primaryNormal};
    ${DodamTypography.Headline.Bold}
`

export const Required = styled.span`
    padding-left: 0.5em;
    color: ${({ theme }) => theme.statusNegative};
    ${DodamTypography.Caption1.Bold}
`

export const Url = styled.div`
  font-family: monospace;
  font-size: 1.1rem;
  margin: 0.25rem 0 1rem;
`

export const BodyField = styled.div`
  margin: 0.25rem 0;
`

interface ResponseStatusProps {
  status: number;
}

export const ResponseStatus = styled.div<ResponseStatusProps>`
    ${DodamTypography.Caption1.Regular}
`

export const ResponseBox = styled.pre`
  color: #0f0;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  white-space: pre-wrap;
  word-break: break-all;
`

export const CodeBlock = styled.pre`
  background: ${({ theme }) => theme.backgroundAlternative};
  padding: 1rem;
    ${DodamShape.Small}
  font-size: 0.85rem;
  line-height: 1.4;
`

export const Button = styled.button`
  background: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  margin-top: 1rem;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #1d4ed8;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`
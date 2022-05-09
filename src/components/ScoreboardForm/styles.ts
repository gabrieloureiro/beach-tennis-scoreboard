import styled from "styled-components";
import { Input } from "../Input";

export const Checkbox = styled(Input).attrs({
  type: "checkbox",
})`
  margin-right: 0.5rem;
`;

export const Text = styled.span`
  padding: 12px 0;
  color: #f7fafc;
  font-weight: 600;
`;

export const Label = styled.label`
  padding: 12px 0;
  color: #f7fafc;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  margin: 0 auto;
  padding: 12px;
  margin-top: 8px;
  border-radius: 6px;
  border: 0;
  color: #f7fafc;
  font-weight: 600;
  background: green;
`;

export const FormRow = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

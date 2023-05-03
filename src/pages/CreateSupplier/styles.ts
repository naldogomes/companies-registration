import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5dc;
  width: 100%;
  height: 100vh;
  padding: 24px;
  overflow: auto;
`;

export const FormContainer = styled.div`
  display: flex;
  width: 500px;
  min-height: 100%;
  background-color: white;
  align-items: center;
  padding: 20px;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;

export const Form = styled.form`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const InputsContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

export const Title = styled.h3`
  text-align: center;
`;

export const RadioDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  span {
    margin-right: 10px;
  }
`;

export const InputDiv = styled.div<{
  isEmpty?: boolean;
  width?: string;
  isDisabled?: boolean;
}>`
  position: relative;
  gap: 8px;
  display: flex;
  flex-direction: column;
  label {
    gap: 8px;
    display: flex;
    flex-direction: column;
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
    color: #4d4d4d;
  }
  small {
    position: absolute;
    left: 0;
    bottom: -25px;
    color: #e22828;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  input {
    padding: 12px 16px;
    width: ${(props) => (props.width ? props.width : "100%")};
    background: ${(props) =>
      props.isEmpty || props.isDisabled ? "#f2f2f2" : "#ffffff"};
    border: ${(props) =>
      props.isEmpty ? "1px solid #e22828" : "1px solid #cccccc"};
    border-radius: 8px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #4d4d4d;
    ::placeholder {
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      color: #cccccc;
    }
    :focus {
      background: ${(props) => (props.isEmpty ? "#f2f2f2" : "#ffffff")};
      border: ${(props) =>
        props.isEmpty ? "1px solid #e22828" : "1px solid #cccccc"};
      border-radius: 8px;
    }
  }
`;

export const InputsRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonSubmit = styled.button`
  padding: 0 24px;
  background: #146c94;
  height: 50px;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  margin-top: 40px;
  :hover {
    cursor: pointer;
    background: #19a7ce;
  }
`;

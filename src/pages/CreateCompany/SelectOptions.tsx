import { components } from "react-select";

export const SelectOptions = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}: any) => {
  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";

  const style = {
    backgroundColor: bg,
    color: "#333333",
    display: "flex ",
    aligntems: "flex-start",
  };

  // prop assignment
  const props = {
    ...innerProps,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <input
        data-testid="select-input"
        type="checkbox"
        checked={isSelected}
        onChange={() => {
          console.log("");
        }}
      />
      {children}
    </components.Option>
  );
};

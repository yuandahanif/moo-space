import { useState } from "react";

function useInput(
  defaultValue = ""
): [
  string,
  React.ChangeEventHandler<HTMLInputElement>,
  React.Dispatch<React.SetStateAction<string>>
] {
  const [value, setValue] = useState(defaultValue);

  const handleValueChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setValue(target.value);
  };

  return [value, handleValueChange, setValue];
}

export default useInput;

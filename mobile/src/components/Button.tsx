import { Button as NBButton, Text, IButtonProps } from "native-base";

interface ButtonProps extends IButtonProps {
  title: string;
  type?: "primary" | "secondary";
}

export function Button({ title, type='primary', ...props }: ButtonProps) {
  return (
    <NBButton
      {...props}
      bg={type === "secondary" ? "red.500" : "yellow.500"}
      paddingY={18} rounded="sm"
      w={'full'}
      fontSize='md' textTransform={'uppercase'} 
      _pressed={{ bg: type === "secondary" ?  "red.600" : "yellow.600"}}
      _loading={{ _spinner: { color: 'black'}}}
    >
      <Text color={type === "secondary"? "white" : "black"}>{title}</Text>
    </NBButton>
  );
}

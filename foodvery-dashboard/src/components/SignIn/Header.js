import { Image, useTheme } from "@aws-amplify/ui-react";

export function Header() {
  const { tokens } = useTheme();
  console.log(tokens);

  return (
    <Image
      alt="logo"
      src="https://i.ibb.co/FwfNPX1/Food-Very-478-100-px-480-100-px.png"
      padding={`${tokens.space.medium} 0`}
    />
  );
}

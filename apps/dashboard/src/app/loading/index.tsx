import { Text } from "@repo/ui/texts";

export default function Loading(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Text
        intent="Heading"
        color="default"
        style="bold"
        text="Loading your farm..."
      ></Text>
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  );
}

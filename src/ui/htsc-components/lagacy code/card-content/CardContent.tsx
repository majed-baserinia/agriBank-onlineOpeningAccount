import * as React from "react";
import MaterialThemeProvider from "../../components/MaterialThemeProvider";
import SanitizeHTML from "../../components/sanitize";
import { MatCardContent } from "./StyledCardContent";

type Props = {
  text: string;
  className?: string;
};
function CardContent({ text, className = "" }: Props) {
  return (
    <MaterialThemeProvider>
      <MatCardContent
        classes={{
          root: ` ${className}`
        }}
      >
        <SanitizeHTML
          html={text}
          className="SanitizeHTML"
        />
      </MatCardContent>
    </MaterialThemeProvider>
  );
}

export default CardContent;

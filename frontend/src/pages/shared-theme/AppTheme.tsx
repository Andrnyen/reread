import * as React from "react";
import {
  CssVarsProvider,
  extendTheme,
  type CssVarsTheme,
} from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";
import { inputsCustomizations } from "./customizations/inputs";
import { dataDisplayCustomizations } from "./customizations/dataDisplay";
import { feedbackCustomizations } from "./customizations/feedback";
import { navigationCustomizations } from "./customizations/navigation";
import { surfacesCustomizations } from "./customizations/surfaces";
import { colorSchemes, typography, shadows, shape } from "./themePrimitives";

interface AppThemeProps {
  children: React.ReactNode;
  disableCustomTheme?: boolean;
  themeComponents?: ThemeOptions["components"];
}

export default function AppTheme({
  children,
  disableCustomTheme = false,
  themeComponents = {},
}: AppThemeProps) {
  const theme = React.useMemo(() => {
    if (disableCustomTheme) {
      return extendTheme();
    }

    return extendTheme({
      colorSchemes: {
        light: {
          palette: colorSchemes.light.palette,
        },
        dark: {
          palette: colorSchemes.dark.palette,
        },
      },
      typography,
      shadows,
      shape,
      components: {
        ...inputsCustomizations,
        ...dataDisplayCustomizations,
        ...feedbackCustomizations,
        ...navigationCustomizations,
        ...surfacesCustomizations,
        ...themeComponents,
      },
    });
  }, [disableCustomTheme, themeComponents]);

  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      {children}
    </CssVarsProvider>
  );
}

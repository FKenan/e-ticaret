'use client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import { useMemo, useEffect, useState } from 'react';

export default function ThemeRegistry({ children }) {
  const { mode } = useSelector((state) => state.theme);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // On the server and initial client render, use a default 'light' theme.
  // After hydration, `isClient` becomes true, and we use the actual `mode` from the store.
  const activeMode = isClient ? mode : 'light';

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: activeMode,
        },
      }),
    [activeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
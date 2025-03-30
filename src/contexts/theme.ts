import { createContext } from "react";

import { ThemeProviderState } from "@/providers/theme";

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)
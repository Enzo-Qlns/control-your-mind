import {
  BrowserRouter,
  Route,
  Routes
} from "react-router";

import { ThemeProvider } from "./providers/theme";

import HomePage from "./views/home";
import QuestionsPage from "./views/questions";

import routes from "./route";
import { AnimatePresence } from "motion/react";

const App = (): React.ReactNode => {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AnimatePresence mode={"wait"}>
          <Routes>
            <Route
              path={routes.HOME}
              element={
                <HomePage />
              }
            />
            <Route
              path={routes.QUESTIONS}
              element={
                <QuestionsPage />
              }
            />
          </Routes>
        </AnimatePresence>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App

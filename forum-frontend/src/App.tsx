import Home from "./pages/Home";
import ThreadView from "./pages/ThreadView";
import ThreadCreate from "./pages/ThreadCreate";
import ErrorPage from "./pages/ErrorPage";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: orange,
    },
});

const App: React.FC = () => {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/thread/:id" element={<ThreadView />} />
                        <Route path="/threadcreate" element={<ThreadCreate />} />
                        <Route path="/hmm" element={<ErrorPage />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;

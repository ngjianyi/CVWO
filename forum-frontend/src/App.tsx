import Home from "./pages/Home";
import ThreadView from "./pages/ThreadView";
import ThreadCreate from "./pages/ThreadCreate";
import ThreadUpdate from "./pages/ThreadUpdate";
import ThreadDelete from "./pages/ThreadDelete";
import ErrorPage from "./pages/ErrorPage";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
                        <Route path="/thread/create" element={<ThreadCreate />} />
                        <Route path="/thread/update" element={<ThreadUpdate />} />
                        <Route path="/thread/delete" element={<ThreadDelete />} />
                        <Route path="/hmm" element={<ErrorPage />} />
                        <Route path="*" element={<Navigate to="/hmm" replace />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;

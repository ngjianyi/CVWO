import BasicThreadList from "../components/BasicThreadList";
import React from "react";

const Home: React.FC = () => {
    return (
        <>
            <h3>{"Welcome to my forum!"}</h3>
            <br />
            <BasicThreadList />
        </>
    );
};

export default Home;

import ThreadList from "../components/ThreadList";
import React from "react";

const Home: React.FC = () => {
    return (
        <>
            <h3>{"Welcome to my forum!"}</h3>
            <br />
            <ThreadList />
        </>
    );
};

export default Home;

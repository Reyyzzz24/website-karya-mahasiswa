import React from "react";
import Navbar from "./partials/Navbar";
import Hero from "./partials/Hero";
import StudentProjects from "./partials/StudentProjects";

const Home = ({ menus, heroData, logo, projects }) => {
    return (
        <div>
            <Navbar menus={menus} logo={logo} />
            <main>
                <Hero data={heroData} />
                <StudentProjects projects={projects} />
            </main>
        </div>
    );
};

export default Home;
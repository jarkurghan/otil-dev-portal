import React from "react";
import ProjectsTable from "./projectsTable.jsx";
import MessageProvider from "./Context";
import ProjectModal from "./ProjectModal.jsx";
import "./style.css";

const Project = () => {

  return (
    <div className="Project">
      <MessageProvider>
        <ProjectModal/>
        <ProjectsTable />
      </MessageProvider>
    </div>
  );
};

export default Project;

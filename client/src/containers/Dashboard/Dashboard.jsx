import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import DocsPanel from "../../components/DocsPanel/DocsPanel";

function Dashboard() {
  return (
    <div className="container dashboard">
      <Navbar />
      <DocsPanel />
    </div>
  );
}

export default Dashboard;

import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import Settings from "../../components/Settings/Settings";

function SettingsPage() {
  return (
    <div className="container settings">
      <Navbar />
      <Settings />
    </div>
  );
}

export default SettingsPage;

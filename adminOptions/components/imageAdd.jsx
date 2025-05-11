import React, { useEffect } from "react";
// import { DropZone, Label, Box, fontSizes } from "@adminjs/design-system";
import { Box } from "@adminjs/design-system";
import { ApiClient } from "adminjs";
const UploadPhoto = (props) => {
  useEffect(() => {
    const api = new ApiClient();
    console.log("useeff is running");
    api
      .resourceAction({ resourceId: "Product", actionName: "list" })
      .then((results) => {
        console.log(results);
      }, []);
  });

  return (
    <Box>
      <h1 className="admin__title">Welcome to AdminPanel, my dear Admin</h1>
    </Box>
  );
};

export default UploadPhoto;

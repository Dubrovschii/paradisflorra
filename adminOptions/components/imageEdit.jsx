import React from "react";
// import { DropZone, Label, Box } from '@adminjs/design-system'
import { Box } from "@adminjs/design-system";

const UploadPhoto = (props) => {
  const { property, record, onChange } = props;
  const srcImg = record.params["product_img"];
  const onUpload = (files) => {
    onChange(property.name, files[0]);
  };

  return (
    <Box>
      {srcImg ? (
        <img style={{ width: "50px" }} src={`/public/images/${srcImg}`} />
      ) : null}
    </Box>
  );
};

export default UploadPhoto;

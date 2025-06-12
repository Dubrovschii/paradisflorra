// import React from "react";
// // import { DropZone, Label, Box } from '@adminjs/design-system'
// import { Box } from "@adminjs/design-system";

// const UploadPhoto = (props) => {
//   const { property, record, onChange } = props;
//   const srcImg = record.params["product_img"];
//   const onUpload = (files) => {
//     onChange(property.name, files[0]);
//   };

//   return (
//     <Box>
//       {srcImg ? (
//         <img style={{ width: "50px" }} src={`/public/images/${srcImg}`} />
//       ) : null}
//     </Box>
//   );
// };

// export default UploadPhoto;
import React from "react";
import { Box, DropZone, Label } from "@adminjs/design-system";

const UploadPhoto = (props) => {
  const { property, record, onChange } = props;

  const filePath = record.params.imageFilePath;
  const imageUrl = filePath ? `/uploads/product-images/${filePath}` : null;

  const onUpload = (files) => {
    if (files.length > 0) {
      onChange(property.name, files[0]);
    }
  };

  return (
    <Box>
      <Label>{property.label}</Label>

      {imageUrl && (
        <Box mb="default">
          <img style={{ width: "100px" }} src={imageUrl} alt="Product" />
        </Box>
      )}

      <DropZone onChange={onUpload} />
    </Box>
  );
};

export default UploadPhoto;

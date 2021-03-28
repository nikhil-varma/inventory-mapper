export const generateGroupData = (inventoryData) => {
  const hashMap = {};
  const productMetadata = [];
  Object.keys(inventoryData).forEach((img) => {
    inventoryData[img].forEach((i) => {
      if (i.code && i.code !== "NA") {
        if (hashMap[i.code]) {
          hashMap[i.code]++;
        } else {
          hashMap[i.code] = 1;
        }
      }
    });
  });

  Object.keys(hashMap).forEach((i) => {
    productMetadata.push({ code: i, overallCount: hashMap[i] });
  });

  return productMetadata;
};

export const getProductCountForImage = (productMetadata, imageMetadata) => {
  const metadata = [];
  productMetadata.forEach((i) => {
    imageMetadata.forEach((j) => {
      if (j.code === i.code) {
        metadata.push({
          code: i.code,
          overallCount: i.overallCount,
          localisedCount: j.overallCount,
        });
      }
    });
  });
  return metadata;
};

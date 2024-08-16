export const DataPaginationHandler = (data, page, limit) => {
  console.log("data page limit", data, page, limit);
  let array = [];
  for (let i = (page - 1) * limit; i < page * limit; i++) {
    if (data[i] !== undefined) array.push(data[i]);
  }
  return array;
};

export const getLength = function (data) {
  return data.length;
};

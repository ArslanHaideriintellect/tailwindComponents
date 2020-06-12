export const titleHandler = (title) => {
  let returnName;
  let newName = title.split("_");
  if (newName.length === 1) {
    returnName =
      newName[0] && newName[0][0].toUpperCase() + newName[0].slice(1);
  } else {
    let newList = [];
    newName.forEach((item) => {
      newList.push(item[0].toUpperCase() + item.slice(1));
    });
    returnName = newList.join(" ");
  }
  return returnName;
};

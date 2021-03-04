const removeEmpty = (obj) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      newObj[key] = removeEmpty(obj[key]); // recurse
    } else if (obj[key] != null && obj[key] != '') {
      newObj[key] = obj[key]; // copy value
    }
  });

  return newObj;
};

module.exports = removeEmpty;

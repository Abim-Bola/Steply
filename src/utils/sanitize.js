import _ from "lodash";
/* eslint-disable no-underscore-dangle */
module.exports.sanitize = data => {
  try {
    let newObject = JSON.stringify(data);
    newObject = JSON.parse(newObject);

    delete newObject.password;
    delete newObject.__v;
    delete newObject.token;
    delete newObject.createdAt;
    delete newObject.updatedAt;

    return newObject;
  } catch (err) {
    return err;
  }
};

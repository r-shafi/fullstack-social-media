const { createHmac } = require('crypto');

const verifyAuthor = (authorId, updateId) => authorId === updateId.toString();

const encryptedID = (id) =>
  createHmac('sha256', process.env.ID_SECRET).update(String(id)).digest('hex');

const idExistsInArray = (id, array) =>
  array.some((objId) => objId.toString() === id);

module.exports = { verifyAuthor, idExistsInArray, encryptedID };

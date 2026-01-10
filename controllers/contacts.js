const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
  try {
    const db = mongodb.getDb().db('cse341');
    const contacts = await db
      .collection('contacts')
      .find()
      .toArray();

    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleContact = async (req, res) => {
  try {
    const db = mongodb.getDb().db('cse341');
    const contactId = new ObjectId(req.params.id);

    const contact = await db
      .collection('contacts')
      .findOne({ _id: contactId });

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact
};

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

/* ======================
   GET ALL CONTACTS
====================== */
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

/* ======================
   GET SINGLE CONTACT
====================== */
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

/* ======================
   POST - CREATE CONTACT
====================== */
const createContact = async (req, res) => {
  try {
    const db = mongodb.getDb().db('cse341');

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // Validación: todos requeridos
    if (
      !contact.firstName ||
      !contact.lastName ||
      !contact.email ||
      !contact.favoriteColor ||
      !contact.birthday
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const response = await db
      .collection('contacts')
      .insertOne(contact);

    res.status(201).json({ id: response.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================
   PUT - UPDATE CONTACT
====================== */
const updateContact = async (req, res) => {
  try {
    const db = mongodb.getDb().db('cse341');
    const contactId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await db
      .collection('contacts')
      .replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(400).json({ message: 'Contact not updated.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================
   DELETE CONTACT
====================== */
const deleteContact = async (req, res) => {
  try {
    const db = mongodb.getDb().db('cse341');
    const contactId = new ObjectId(req.params.id);

    const response = await db
      .collection('contacts')
      .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(400).json({ message: 'Contact not deleted.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};
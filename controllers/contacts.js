const getAllContacts = (req, res) => {
  res.json({ message: 'Get all contacts works' });
};

const getSingleContact = (req, res) => {
  res.json({ message: `Get contact ${req.params.id} works` });
};

module.exports = {
  getAllContacts,
  getSingleContact
};

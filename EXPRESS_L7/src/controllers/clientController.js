
exports.getAllClients = async (req, res) => {
    try {
      const clients = await require('../services/clientService').getAllClients();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.getClientById = async (req, res) => {
    try {
      const client = await require('../services/clientService').getClientById(req.params.id);
      if (!client) return res.status(404).json({ error: 'Client not found' });
      res.json(client);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.createClient = async (req, res) => {
    try {
      const clientData = req.body;
      if (!clientData.name || !clientData.age) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const newClient = await require('../services/clientService').createClient(clientData);
      res.status(201).json(newClient);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.updateClient = async (req, res) => {
    try {
      const clientData = req.body;
      const updatedClient = await require('../services/clientService').updateClient(req.params.id, clientData);
      res.json(updatedClient);
    } catch (error) {
      if (error.message === 'Client not found') {
        return res.status(404).json({ error: 'Client not found' });
      }
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.patchClient = async (req, res) => {
    try {
      const updateData = req.body;
      const patchedClient = await require('../services/clientService').patchClient(req.params.id, updateData);
      res.json(patchedClient);
    } catch (error) {
      if (error.message === 'Client not found') {
        return res.status(404).json({ error: 'Client not found' });
      }
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.deleteClient = async (req, res) => {
    try {
      await require('../services/clientService').deleteClient(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Client not found') {
        return res.status(404).json({ error: 'Client not found' });
      }
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
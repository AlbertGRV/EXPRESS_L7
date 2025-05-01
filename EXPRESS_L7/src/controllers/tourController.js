exports.getAllTours = async (req, res) => {
    try {
      const tours = await require('../services/tourService').getAllTours();
      res.json(tours);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.getTourById = async (req, res) => {
    try {
      const tour = await require('../services/tourService').getTourById(req.params.id);
      if (!tour) return res.status(404).json({ error: 'Tour not found' });
      res.json(tour);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.createTour = async (req, res) => {
    try {
      const tourData = req.body;
      if (!tourData.name || !tourData.duration || !tourData.price) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const newTour = await require('../services/tourService').createTour(tourData);
      res.status(201).json(newTour);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.updateTour = async (req, res) => {
    try {
      const tourData = req.body;
      if (!tourData.name && !tourData.duration && !tourData.price) {
        return res.status(400).json({ error: 'No fields to update' });
      }
      const updatedTour = await require('../services/tourService').updateTour(req.params.id, tourData);
      res.json(updatedTour);
    } catch (error) {
      if (error.message === 'Tour not found') {
        return res.status(404).json({ error: 'Tour not found' });
      }
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.patchTour = async (req, res) => {
    try {
      const updateData = req.body;
      const patchedTour = await require('../services/tourService').patchTour(req.params.id, updateData);
      res.json(patchedTour);
    } catch (error) {
      if (error.message === 'Tour not found') {
        return res.status(404).json({ error: 'Tour not found' });
      }
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.deleteTour = async (req, res) => {
    try {
      await require('../services/tourService').deleteTour(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Tour not found') {
        return res.status(404).json({ error: 'Tour not found' });
      }
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
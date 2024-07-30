const WorkerService = require('../services/workerService');

exports.createWorker = async (req, res) => {
  try {
    const worker = await WorkerService.createWorker(req.body);
    res.status(201).json(worker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWorkers = async (req, res) => {
  try {
    const workers = await WorkerService.getWorkers();
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWorkerById = async (req, res) => {
  try {
    const worker = await WorkerService.getWorkerById(req.params.id);
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateWorker = async (req, res) => {
  try {
    const updatedWorker = await WorkerService.updateWorker(req.params.id, req.body);
    if (!updatedWorker) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    res.status(200).json(updatedWorker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteWorker = async (req, res) => {
  try {
    const deleted = await WorkerService.deleteWorker(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    res.status(200).json({ message: 'Worker deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

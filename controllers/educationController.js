const EducationService = require('../services/educationService');

exports.createEducation = async (req, res) => {
  try {
    const file = req.file;
    const parsedData = await EducationService.parseCertificate(file);

    const educationData = {
      WorkerID: req.body.WorkerID,
      CountryOfStudy: req.body.CountryOfStudy,
      InstitutionName: req.body.InstitutionName,
      Degree: req.body.Degree,
      FieldOfStudy: req.body.FieldOfStudy,
      StartDate: req.body.StartDate,
      EndDate: req.body.EndDate,
      CertificateFile: file.filename,
      FullName: req.body.FullName, 
    };

    const isValid = await EducationService.validateCertificate(educationData, parsedData);
    if (!isValid) {
      throw new Error('Certificate data does not match the provided information');
    }

    const education = await EducationService.createEducation(educationData);
    res.status(201).json({ education, parsedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEducationByWorker = async (req, res) => {
  try {
    const education = await EducationService.getEducationByWorker(req.params.workerId);
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

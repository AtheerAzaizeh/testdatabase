const Education = require('../models/education');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const spacy = require('spacy');

class EducationService {
  static async createEducation(data) {
    return await Education.create(data);
  }

  static async parseCertificate(file) {
    const dataBuffer = fs.readFileSync(file.path);
    const data = await pdfParse(dataBuffer);

    let parsedText = data.text;

    const { translate } = await import('translate');
    translate.engine = 'google';
    translate.key = 'ad44e82c79msh6070d9732178985p12983fjsnfcde181e8c03'; 
    const [detection] = await translate.detect(parsedText);
    if (detection.language !== 'en') {
      parsedText = await translate(parsedText, { to: 'en' });
    }

    const extractedInfo = await this.extractInfo(parsedText);

    return extractedInfo;
  }

  static async extractInfo(parsedText) {
    const nlp = spacy.load('en_core_web_sm');
    const doc = nlp(parsedText);

    const extractedInfo = {
      institution: '',
      name: '',
      degree: '',
      dates: [],
    };

    doc.ents.forEach(entity => {
      if (entity.label_ === 'ORG') {
        extractedInfo.institution = entity.text;
      } else if (entity.label_ === 'PERSON') {
        extractedInfo.name = entity.text;
      } else if (entity.label_ === 'DATE') {
        extractedInfo.dates.push(entity.text);
      } else if (entity.label_ === 'DEGREE') {
        extractedInfo.degree = entity.text;
      }
    });

    return extractedInfo;
  }

  static async validateCertificate(data, extractedInfo) {
    if (data.InstitutionName.toLowerCase() !== extractedInfo.institution.toLowerCase()) {
      return false;
    }
    if (data.FullName.toLowerCase() !== extractedInfo.name.toLowerCase()) {
      return false;
    }
    if (data.Degree.toLowerCase() !== extractedInfo.degree.toLowerCase()) {
      return false;
    }
    if (data.StartDate && !extractedInfo.dates.includes(data.StartDate)) {
      return false;
    }
    if (data.EndDate && !extractedInfo.dates.includes(data.EndDate)) {
      return false;
    }

    return true;
  }

  static async getEducationByWorker(workerId) {
    return await Education.findAll({ where: { WorkerID: workerId } });
  }
}

module.exports = EducationService;

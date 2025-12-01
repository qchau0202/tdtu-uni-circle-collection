const express = require('express');
const router = express.Router();
const studyController = require('../controllers/study.controller');

// Study routes
router.get('/', studyController.getAllStudySessions);
router.get('/:id', studyController.getStudySessionById);
router.post('/', studyController.createStudySession);
router.put('/:id', studyController.updateStudySession);
router.delete('/:id', studyController.deleteStudySession);

module.exports = router;

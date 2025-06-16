import express from 'express';
import { redirectToOriginal } from '../controllers/link.controller.js';

const router = express.Router();

router.get('/:shortId', redirectToOriginal);

export default router;

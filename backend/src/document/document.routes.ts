import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { uploadController,getDocument,getDocuments,removeDocument } from "./document.controller";
import upload from "../middlewares/upload.middleware";


const router=Router()

router.use(requireAuth);

router.post('/upload',upload.single('document'),uploadController);
router.get('/',getDocuments);
router.get('/:id',getDocument);
router.delete('/:id',removeDocument)

export default router;
import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware'
import { chatController } from './chat.controller'

const router = Router()

router.use(requireAuth)

// new conversation for a document
router.post('/document/:documentId', chatController)

// continue existing conversation
router.post('/document/:documentId/:conversationId', chatController)

export default router
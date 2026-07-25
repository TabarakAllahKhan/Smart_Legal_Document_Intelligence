import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware'
import { getConversations, getConverstaion,deleteConversation } from './conversation.controller'

const router = Router()

router.use(requireAuth)

router.get('/', getConversations)
router.get('/:id', getConverstaion)
router.delete('/:id',deleteConversation)

export default router
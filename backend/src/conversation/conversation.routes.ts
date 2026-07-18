import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware'
import { getConversations, getConverstaion } from './conversation.controller'

const router = Router()

router.use(requireAuth)

router.get('/', getConversations)
router.get('/:id', getConverstaion)

export default router
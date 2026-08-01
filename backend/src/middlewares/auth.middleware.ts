import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../utils/jwt.utils'
import { sendError } from '../utils/response.utils'
import prisma from '../config/prisma.config'

/*
WE ARE EXTENDING REQUEST BECAUSE IN EXPRESS REQUEST LOOK LIKE THAT

interface Request {
    body
    headers
    params
    query
}

BUT IT DONT HAVE the User so we are extending it to add here and can be imported by controllers
to extract userid and email

*/
export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
  }
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      sendError(res, 'Access token required', 401)
      return
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyAccessToken(token)

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user) {
      sendError(res, 'User no longer exists', 401)
      return
    }

    req.user = {
      id: user.id,
      email: user.email
    }

    next()
  } catch (error) {
    sendError(res, 'Invalid or expired token', 401)
  }
}
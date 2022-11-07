import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { EXPIRETIME, MESSAGES } from '../config'

export const signJwt = async (
  data: any,
  expiresIn: number = EXPIRETIME.H24
): Promise<string> => {
  return sign({ user: data.user }, process.env.SECRET as string, { expiresIn })
}

export const verifyJwt = async (
  token: string
): Promise<string | JwtPayload> => {
  try {
    return verify(token, process.env.SECRET as any)
  } catch (error) {
    return MESSAGES.TOKEN_VERICATION_FAILED
  }
}

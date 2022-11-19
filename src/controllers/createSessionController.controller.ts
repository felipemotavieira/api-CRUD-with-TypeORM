import { Request, Response } from 'express'
import { IUserLogin } from '../interfaces/users'
import userLoginService from '../services/createSessionService.services'

const createSessionController = async (req: Request, res: Response) => {
    try {
        const data: IUserLogin = req.body

        const token =  await userLoginService(data)
        
        return res.status(200).json({token})

    } catch (err) {
        if (err instanceof Error) {

            return res.status(403).send({
                "message": err.message
            })
        }
    }
}

export default createSessionController
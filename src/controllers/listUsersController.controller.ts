import { Request, Response } from 'express'
import listUsersService from "../services/listUsersService.services"

const listUsersController = async (req: Request, res: Response) => {
    try {
        
        const isAdm = req.user.isAdm
        
        const users = await listUsersService(isAdm)

        return res.status(200).json(users)
    } catch (err) {
        if (err instanceof Error) {

            return res.status(403).json({
                "error": err.name,
                "message": err.message
            })
        }
    }
    

}

export default listUsersController
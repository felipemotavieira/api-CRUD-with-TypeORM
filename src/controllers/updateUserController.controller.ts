import { Request, Response } from "express";
import { User } from "../entitites/user.entity";
import updateUserService from "../services/updateUserService.services";

const updateUserController = async (req: Request, res: Response) => {
    try {
        const isAdm = req.user.isAdm
        const  id  = req.params.id
        const user = req.body

        const updatedUser = await updateUserService(isAdm, id, user)

        if(updatedUser instanceof User){
            return res.status(200).json(updatedUser)
        }

        return res.status(updatedUser[0] as number).json({
            message: updatedUser[1]
        })

    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                message: error.message
            })
        }
    }
}

export default updateUserController
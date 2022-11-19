import AppDataSource from "../data-source"
import { User } from "../entitites/user.entity"
import { IUser, IUserReturnable } from "../interfaces/users"

const listUsersService = async (isAdm : boolean): Promise<IUserReturnable[]> => {
    
    if(!isAdm){
        throw new Error("User must be adm to access thies route")
    }

    const userRepository = AppDataSource.getRepository(User)

    const users = userRepository.find()

    let returnableUsers : IUserReturnable[] = [];
    
    (await users).forEach((user: IUser) : void => {
        const {id, name, email, isAdm, isActive, createdAt, updatedAt} = user

        const returnableUser: IUserReturnable = {
            id, name, email, isAdm, isActive, createdAt, updatedAt
        }

        returnableUsers.push(returnableUser)
    })

    return returnableUsers
}

export default listUsersService
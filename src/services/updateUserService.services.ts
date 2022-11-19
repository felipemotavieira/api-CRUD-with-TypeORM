import AppDataSource from "../data-source"
import { User } from "../entitites/user.entity"
import { IUserUpdate } from "../interfaces/users/index"

const updateUserService = async (isAdm : boolean, id : string, user: any) => {
    const userRepository = AppDataSource.getRepository(User)
    const findUser = await userRepository.findOneBy({id})
    const {name, email, password} = user

    const verifyBlockedFields = Object.keys(user).some(e => e === 'isAdm' || e === 'id' || e === 'isActive')

    if(verifyBlockedFields){
        return [401, "Unauthorized"]
    }

    if(!isAdm){
        return [401, "User must be adm to access this route"]
    }

    if(!findUser){
        return [404, "User not found"]
    }

    await userRepository.update(
        id,
        {
            name: name,
            email: email,
            password: password
        }
    )

    const updatedUser = await userRepository.findOneBy({id})

    return updatedUser!
}

export default updateUserService
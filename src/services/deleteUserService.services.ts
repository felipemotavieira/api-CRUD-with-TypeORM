import AppDataSource from "../data-source"
import { User } from "../entitites/user.entity"

const deleteUserService = async (isAdm : boolean, id : string): Promise<User | Array<number | string>> => {

    const userRepository = AppDataSource.getRepository(User)

    const findUser = await userRepository.findOneBy({id})
    
    if(!isAdm){
        return [403, "User must be adm to access this route"]
    }

    if(!findUser){
        return [404, "User not found"]
    }    
    
    if(!findUser.isActive){
        return [400, "User already deleted"]
    }

    await userRepository.update(
        id,
        {
            isActive: false
        }
    )

    const user = await userRepository.findOneBy({id})

    return user!
}

export default deleteUserService
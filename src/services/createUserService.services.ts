import { v4 as uuid4 } from "uuid"
import { hash } from 'bcrypt'
import AppDataSource from "../data-source"
import { IUser, IUserRequest } from "../interfaces/users"
import { User } from "../entitites/user.entity"

const createUserService = async ({name, email, password, isAdm}: IUserRequest) => {

    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const emailAlreadyExists = users.find(user => user.email ===email)

    if(emailAlreadyExists){
        throw new Error("Email already exists")
    }

    const newUser: IUser = {
        name: name,
        email: email,
        isAdm: Boolean(isAdm),
        isActive: true,
        password: await hash(password, 10),
        id: uuid4(),
        createdAt: new Date(),
        updatedAt: new Date()
    }

    userRepository.create(newUser)

    await userRepository.save(newUser)

    const {id, isActive, createdAt, updatedAt} = newUser

    const returnableUser = {
        name: name,
        email: email,
        isAdm: Boolean(isAdm),
        id: id,
        isActive: isActive,
        createdAt: createdAt,
        updatedAt: updatedAt
    }

    return returnableUser
}

export default createUserService
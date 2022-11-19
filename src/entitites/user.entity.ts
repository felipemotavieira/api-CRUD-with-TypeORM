import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuid4 } from "uuid"

@Entity('users')
export class User {
    @PrimaryColumn("uuid")
    readonly id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    isAdm: boolean

    @Column()
    isActive: boolean

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    constructor(){
        if(!this.id){
            this.id = uuid4()
        }
    }
}
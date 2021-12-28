import { IsEmail, Length } from "class-validator";
import {Entity as TOEntity, Column, Index, BeforeInsert} from "typeorm";
import bcrypt from "bcrypt"
import { Exclude } from "class-transformer"

import Entity from "./Entity";

@TOEntity("users")
export default class User extends Entity {

    constructor(user: Partial<User>){
        super()
        Object.assign(this, user)
    }

    @Index()
    @Length(3, 255)
    @Column({ unique: true })
    username: string;

    @Index()
    @IsEmail()
    @Column({ unique: true })
    email: string;

    @Column()
    @Length(6, 255)
    @Exclude()
    password: string;

    @Index()
    @Column({ nullable: true })
    address: string;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 6)
    }
}

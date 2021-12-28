import { IsEmail, Length } from "class-validator";
import {Entity as TOEntity, Column, Index, BeforeInsert, ManyToOne, JoinColumn} from "typeorm";
import bcrypt from "bcrypt"
import { Exclude } from "class-transformer"

import Entity from "./Entity";
import User from "./User";
import makeId, { slugify } from "../util/helpers";

@TOEntity("products")
export default class Product extends Entity {

    constructor(product: Partial<Product>){
        super()
        Object.assign(this, product)
    }

    @Index()
    @Column()
    identifier: string //7 char id
    
    @Column()
    title: string

    @Index()
    @Column()
    slug: string

    @Column({ type: "text" })
    description: string

    @Column()
    price: string

    //for product image file
    @Column({
        type: "bytea",
        nullable: true // --> setting this true for now
    })
    data: Uint8Array;


    @ManyToOne(() => User, user => user.products)
    @JoinColumn({ name: "username", referencedColumnName: "username" })
    user: User;

    @BeforeInsert()
    makeIDAndSlug(){
        this.identifier = makeId(6)
        this.slug = slugify(this.title)
    }
}

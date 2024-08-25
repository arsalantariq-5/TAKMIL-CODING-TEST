import { School } from "src/resources/school/entities/school.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
  } from "typeorm";
  
  @Entity()
  export class Address {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    town: string;
  
    @Column()
    tehsil: string;
  
    @Column()
    district: string;
  
    @Column()
    state: string;
  
    @Column()
    address: string;
  
    @Column("decimal", { precision: 10, scale: 6 })
    latitude: number;
  
    @Column("decimal", { precision: 10, scale: 6 })
    longitude: number;
  
    @OneToOne(() => School, (school) => school.address)
    school: School;
  }
  
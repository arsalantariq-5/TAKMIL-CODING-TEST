import { School } from "src/resources/school/entities/school.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
  } from "typeorm";
  
  @Entity()
  export class Organization {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    name: string;
  
    @OneToMany(() => School, (school) => school.organization)
    schools: School[];
  }
  
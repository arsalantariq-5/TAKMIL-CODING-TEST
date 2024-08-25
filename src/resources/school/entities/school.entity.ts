import { Address } from "src/resources/address/entities/address.entity";
import { Organization } from "src/resources/organization/entities/organization.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
  } from "typeorm";
  
  @Entity()
  export class School {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    status: string;
  
    @Column()
    startTime: string;
  
    @Column()
    endTime: string;
  
    @Column()
    shift: string;
  
    @Column({ default: false })
    hasProjector: boolean;
  
    @Column({ default: false })
    hasLaptop: boolean;
  
    @OneToOne(() => Address, { cascade: true })
    @JoinColumn()
    address: Address;

    @Column()
    organizationId: number;

    @ManyToOne(() => Organization)
    @JoinColumn({ name: "organizationId" })
    organization: Organization;

  }
  
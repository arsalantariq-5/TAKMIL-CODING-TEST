import { Module } from '@nestjs/common';
import { SchoolModule } from './school/school.module';
import { AddressModule } from './address/address.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [SchoolModule, AddressModule, OrganizationModule]
})
export class ResourcesModule {}

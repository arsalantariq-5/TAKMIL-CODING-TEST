import { Module } from '@nestjs/common';
import { SchoolModule } from './school/school.module';
import { AddressModule } from './address/address.module';
import { OrganizationModule } from './organization/organization.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SchoolModule, AddressModule, OrganizationModule, SharedModule]
})
export class ResourcesModule {}

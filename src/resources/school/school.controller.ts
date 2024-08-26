import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('school')
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }

  @Get()
  findAll() {
    return this.schoolService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolService.update(+id, updateSchoolDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID of the school to delete' })
  remove(@Param('id') id: string) {
    return this.schoolService.remove(+id);
  }
}

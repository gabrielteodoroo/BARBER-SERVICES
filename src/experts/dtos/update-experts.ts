import { PartialType } from '@nestjs/mapped-types'
import CreateExpertsDto from './create-experts'

export default class UpdateExpertsDto extends PartialType(CreateExpertsDto) {}

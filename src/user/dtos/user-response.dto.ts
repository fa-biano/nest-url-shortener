import { UserEntity } from '../entities/user.entity'
import { Exclude } from 'class-transformer'

export class UserResponseDto extends UserEntity {
  @Exclude()
  declare passwordHash: string

  @Exclude()
  declare deletedAt: Date | null
}

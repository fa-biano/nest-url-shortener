import { UserEntity } from 'src/user/entities/user.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm'

@Entity('urls')
export class UrlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 2048 })
  originalUrl: string

  @Column({ unique: true, length: 6 })
  urlShortCode: string

  @Column({ default: 0 })
  accessCounter: number

  @Column({ type: 'timestamp with time zone', nullable: true })
  lastAccessAt: Date | null

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
  deletedAt: Date | null

  @ManyToOne(() => UserEntity, (user) => user.urls, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity | null
}

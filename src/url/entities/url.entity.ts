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

  @Column({ name: 'original_url', length: 2048 })
  originalUrl: string

  @Column({ name: 'url_short_code', unique: true, length: 6 })
  urlShortCode: string

  @Column({ name: 'access_counter', default: 0 })
  accessCounter: number

  @Column({ name: 'last_access_at', type: 'timestamp with time zone', nullable: true })
  lastAccessAt: Date | null

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone', nullable: true })
  deletedAt: Date | null

  @ManyToOne(() => UserEntity, (user) => user.urls, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity | null
}

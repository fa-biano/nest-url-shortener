import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

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
  lastAccessAt: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ type: 'timestamp with time zone', nullable: true })
  deletedAt: Date
}

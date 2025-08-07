import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UrlEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  originalUrl: URL

  @Column({ unique: true })
  shortCode: string
}

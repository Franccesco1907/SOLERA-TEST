import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;
  
  @Column({ select: true })
  username: string;
  
  @Column({ select: true })
  fullname: string;
  
  @Column({ select: true })
  createdAt: string;
  
  @Column({ select: true })
  updatedAt: string;
}

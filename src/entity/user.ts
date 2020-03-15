import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  firstName!: string;
  @Column()
  lastName!: string;
  @Column()
  username!: string;
  @Column()
  email!: string;
  @Column()
  password!: string;
  @Column()
  verified!: boolean;
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt!: Date;
  @BeforeInsert()
  setCreateDate(): void {
    this.createdAt = new Date();
  }
  @BeforeUpdate()
  setUpdateDate(): void {
    this.updatedAt = new Date();
  }

}

export default User;

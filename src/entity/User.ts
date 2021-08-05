import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';
import bcrypt from "bcryptjs";
import { Length, IsNotEmpty, IsEmail } from "class-validator";

@Entity()
@Unique(["username", "email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 30)
  username: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @Length(6)
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = (await bcrypt.hash(this.password, salt)).toString();
    }
  }

  async correctPassword(receivedPassword: string, password: string) {
    return await bcrypt.compare(receivedPassword, password);
  }
}
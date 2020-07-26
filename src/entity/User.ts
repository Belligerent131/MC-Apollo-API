import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  //uuid is a 16 bit unique string randomly generated
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column('varchar', { length: 50 })
  email: string;

  @Field()
  @Column('text')
  password: string;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}

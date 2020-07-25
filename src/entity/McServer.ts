import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import dayjs from 'dayjs';

@ObjectType()
@Entity()
export class McServer extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  ipAddress: string;

  @Field()
  @Column()
  jarFile: string;

  @Field()
  @Column()
  directory: string;

  @Field(() => Int)
  @Column()
  port: number;

  @Field(() => Int)
  @Column()
  players: number;

  @Field()
  @Column('boolean', { default: false })
  alive?: boolean;

  @Field()
  @Column('text', { nullable: true, default: dayjs().format() })
  timeStamp: string;
}

import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import dayjs from 'dayjs';

// @ObjectType() specifies to use this data model as a schema model
// for GraphQL
// @Entity is to be used to specify the class as a database model
@ObjectType()
@Entity()
export class McServer extends BaseEntity {
  // @Field() decorators are specifed to be be included as part
  // of the database model.

  @Field(() => Int)
  @PrimaryGeneratedColumn() //Specify the ID as a primary key that is auto generated
  id: number;

  @Field()
  @Column() //Specify as a column apart of the table
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

  @Field(() => Int) //NOTICE: Graphql doesn't recognize number types. You must specify in the field decorator that basically to use an Int value type
  @Column()
  port: number;

  @Field(() => Int)
  @Column()
  players: number;

  @Field()
  @Column('boolean', { default: false })
  alive?: boolean;

  @Field()
  @Column('text', { nullable: true, default: dayjs().format() }) //This uses the dayjs dependancy to generate timestamps
  timeStamp: string;
}

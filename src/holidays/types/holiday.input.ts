  
import { Field, InputType } from "@nestjs/graphql";


@InputType({ description: 'Add holiday' })
export class HolidayInput {
    @Field()
    start: Date;
    @Field()
    end:Date;
    @Field()
    type:string;
    @Field()
    state:string;
}

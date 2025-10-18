import { Message } from "@/model/User.model";

export interface Apiresponse {
    success:boolean;
    message:string;
    isAccesptingMessages?:boolean
    messages?:Array<Message>;
}
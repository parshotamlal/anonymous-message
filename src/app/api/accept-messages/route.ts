import {getServerSession} from "next-auth"
import { dbConnect } from "@/lib/dbConnect"
import UserModel from "@/model/User.model"
import {User} from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"
import { acceptMessagesSchema } from "@/schema/acceptMessageSchema"


export async function POST (request:Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;

  const { acceptMessages } = await request.json();

  try {

  const updatedUser =  await UserModel.findByIdAndUpdate(
        userId,{
            isAcceptingMessage:acceptMessages
        },
    {
      new:true  
    }
    )

    if(!updatedUser) {
        return Response.json(
            {
                success:false,
                message:"Failed to update user status to accept messages"
            },{status:404}
        )
    }
    else {
          return Response.json(
            {
                success:true,
                message:"Message  acceptance status updated successfully"
            },{status:200}
        )
    }

  } catch (error) {
    console.log("Failed to update user status to accept messages:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to update user status to accept messages",
      },
      { status: 500 }
    );
  }
}
    
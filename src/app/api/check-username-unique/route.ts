// import { dbConnect } from "@/lib/dbConnect";
// import UserModel from "@/model/User.model";
// import { z } from "zod";
// import { usernameValidation } from "@/schema/signUpSchema";

// const UsernameQuerySchema = z.object({
//   username: usernameValidation,
// });

// export async function GET(request: Request) {
//   await dbConnect();

//   try {
//     const { searchParams } = new URL(request.url);
//     const queryParm = {
//       username: searchParams.get("username"),
//     };

//     // validate with zod
//     const result = UsernameQuerySchema.safeParse(queryParm);

//     if (!result.success) {
//       const usernameError = result.error.format().username?._errors || [];
//       return Response.json(
//         {
//           success: false,
//           message:
//             usernameError?.length > 0
//               ? usernameError.join(",")
//               : "Invalid query parameter",
//         },
//         { status: 400 }
//       );
//     }
//     const { username } = result.data;
//     const existingVerifiedUser = await UserModel.findOne({
//       username,
//       isVerified: true,
//     });
//     if (existingVerifiedUser) {
//       return Response.json(
//         {
//           success: false,
//           message: "Username is aleardy taken",
//         },
//         { status: 400 }
//       );
//     }
//     return Response.json(
//       {
//         success: true,
//         message: "Username is unique",
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log("Error checking username", error);
//     return Response.json(
//       {
//         success: false,
//         message: "Error checking username",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }


import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { success, z } from "zod";

// ✅ Username validation schema
const usernameValidation = z
  .string()
  .min(3, "Username must be at least 3 characters long")
  .max(20, "Username must be at most 20 characters long")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

// ✅ Query validation
const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {

  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParm = {
      username: searchParams.get("username"),
    };

    // Validate username
    const result = UsernameQuerySchema.safeParse(queryParm);

    if (!result.success) {
      const usernameError = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameError?.length > 0
              ? usernameError.join(",")
              : "Invalid query parameter",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    // Check if username already exists and is verified
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    // ✅ Username is unique
    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username:", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}

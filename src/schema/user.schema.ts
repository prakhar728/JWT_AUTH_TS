import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: "FirtName is required"
        }),
        lastName: string({
            required_error: "lastName is required"
        }),
        password: string({
            required_error: "password is required"
        }).min(6,"Password is too short - min 6 chars"),

        passwordConfirmation:string({
            required_error: "Password confirmation is required"
        }),
        email:string({
            required_error:"Email is required"
        }).email("Not a valid email"),

    }).refine(data => data.password==data.passwordConfirmation,{
        message:"Passwords do not match",
        path:["passwordConfirmation"],
    })
})

export const verifyUserSchema = object({
    params:object({
        id:string(),
        verificationCode:string()
    })
   
})


export const forgotPasswordSchema = object({
    body:object({
        email:string({
            required_error:"Email is required"
        }).email("Not a valid Email")
    })
})

export const resetPasswordSchema = object({
    params:object({
        id:string(),
        passwordResetCode:string()
    }),
    body:object({
        password: string({
            required_error: "password is required"
        }).min(6,"Password is too short - min 6 chars"),

        passwordConfirmation:string({
            required_error: "Password confirmation is required"
        })
    }).refine(data => data.password==data.passwordConfirmation,{
        message:"Passwords do not match",
        path:["passwordConfirmation"],
    })
})


export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];

export type forgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type resetPasswordInput = TypeOf<typeof resetPasswordSchema>;

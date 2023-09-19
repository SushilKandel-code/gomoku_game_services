import { object, string, TypeOf } from 'zod';

const payload = {
    body: object({
        username: string({
            required_error: "Username required",
        }),
        password: string({
            required_error: "Password required",
        }),
    })
};

export const schemaRegister = object({
    ...payload
})

export const schemaLogin = object({
    ...payload
})

export type InputRegister = TypeOf<typeof schemaRegister>;
export type InputLogin = TypeOf<typeof schemaLogin>;


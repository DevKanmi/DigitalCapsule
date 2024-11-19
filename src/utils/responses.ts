import { Response } from "express"

export const successResponse = (res : Response, statusCode: number, message: string, data : any) =>{
    return res.status(statusCode).send({
        status : 'Success',
        message: message,
        data

    })
}

export const errorResponse = (res: Response, statusCode: number, error: any) =>{
    return res.status(statusCode).send({
        status: 'Failed/Error',
        error
    })
}
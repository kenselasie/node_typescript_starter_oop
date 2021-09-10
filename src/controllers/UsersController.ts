import { Response, Request } from "express";
const jwt = require('jsonwebtoken')

export class UsersController {
    static async userLogin(req: Request, res: Response) {
        try {
            const email = req.body.email.toLowerCase()
            const password = req.body.password

            return res.status(200).json({
                message: 'Auth successful',
                user: 'User Details'
            })

        } catch (err) {
            console.log(err)
        }
    }

    static async getUserById(req: Request, res: Response) {
        try {
            const user = {
                name: 'Ken',
                email: 'ken@gmail.com'
            }

            if (!user) {
                return res.status(404).json({message: 'No user with that id'})
            }
            return res.status(200).json(user)

        } catch (err) {
            console.log(err)
        }
    }

    static async updateUserById(req: Request, resp: Response) {
        try {
            
            const result = {
                name: 'Kennedy',
                email: 'whatever@gmail.com'
            }
            if (result) {
                return resp.status(200).json({message: 'successfully updated', result})
            }
            return resp.status(500).json({message: 'Something happened!, did not update'})

        }
        catch (err) {
            console.log(err)
            return resp.status(500).json({message: 'Something happened!, did not update', err})
        }
    }


    static async getAllUser(req: Request, res: Response) {
        try {
            const users = [
                {
                    name: 'Ama',
                    email: 'ama@gmail.com'
                },
                {
                    name: 'Ke ',
                    email: 'ken@gmail.com'
                }
            ]

            if (users) {
                return res.status(200).json(users)
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: 'Something happened!', err})

        }
    }
}
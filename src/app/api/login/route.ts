// import axios from "axios"
// import { NextResponse } from "next/server"
// import jwt from 'jsonwebtoken'

// export async function POST(req: Request) {
//     const { email, cpf } = await req.json()

//     try {

//         let usuario = await axios.post(
//             "http://127.0.0.1:8000/api/login"
//         )

//         console.log(usuario)

//         if (usuario.data.length === 1) {
//             if (usuario.data[0].senha === senha) {

//                 let objUsuario = usuario.data[0]

//                 delete objUsuario.senha

//                 const token = jwt.sign(
//                     objUsuario,
//                     '123465',//secret
//                     {
//                         // expiresIn: '1min'// dias
//                         expiresIn: '1d'// dias
//                         // expiresIn: '1h'// horas
//                         // expiresIn: '1min'// minutos
//                     }
//                 )

//                 return NextResponse.json({ token: token })

//             }
//         }

//         return NextResponse.json({
//             message: "Dados incorretos"
//         }, { status: 401 })

//     } catch (err) {
//         console.log(err)
//         return NextResponse.json(
//             {
//                 message: 'Erro interno'
//             },
//             { status: 500 }
//         )
//     }
// }
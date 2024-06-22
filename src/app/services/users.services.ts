// import { GetServerSideProps } from 'next';
// import { cookies } from 'next/headers';
// import axios from 'axios';
// import { IUser } from '../interfaces/IUser';
// import { UsersProps } from '../interfaces/UsersProps';

// export const getServerSideProps: GetServerSideProps<UsersProps> = async () => {
//     const cookie = cookies();
//     const token = cookie.get('@token');

//     // Redireciona para login se não houver token
//     if (!token) {
//         console.log("No token");
//         return {
//             redirect: {
//                 destination: '/login',
//                 permanent: false,
//             },
//         };
//     }

//     try {
//         // Faz a requisição para a API
//         const response = await axios.get<IUser[]>("http://127.0.0.1:8000/api/users", {
//             headers: {
//                 Authorization: `Bearer ${token.value}`,
//             },
//         });

//         // Retorna os dados dos usuários como props
//         return {
//             props: {
//                 users: response.data,
//                 token: token.value,
//             },
//         };
//     } catch (error) {
//         console.error('Erro ao buscar usuários:', error);
//         return {
//             props: {
//                 users: [],
//                 token: token.value,
//             },
//         };
//     }
// };

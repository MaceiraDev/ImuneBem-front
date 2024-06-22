"use client";
import { LayoutDashboard } from "@/components/LayoutDashboard";
import Cookies from 'js-cookie';
import { redirect } from "next/navigation";
import { Table, Card } from "react-bootstrap";
import { BotaoCadastro } from "@/components/botaoCadastro";
import { useEffect, useState } from "react";
import axios from "axios";
import { IUser } from './../interfaces/IUser';

export default function Users() {

    const [users, setUsers] = useState<IUser[]>([]); // Definindo o estado como um array de IUser
    const token = Cookies.get('@token');

    useEffect(() => {
        if (!token) {
            redirect('/login');
        } else {
            axios.get<IUser[]>("http://127.0.0.1:8000/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                const data = response.data.data;
                setUsers(data)
            }

            ).catch(error => {
                console.error('Erro ao buscar usuários:', error);
            });
        }
    }, [token]);

    return (
        <LayoutDashboard
            token={token}
        >
            <h1>Usuários</h1>
            <Card>
                <div className="row">
                    <div className="col-md-12" style={{ textAlign: "right" }}><BotaoCadastro titulo={"Novo Usuário"} /></div>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>CPF</th>
                            <th>Tipo de Usuário</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.cpf}</td>
                                <td>{user.type_user}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </LayoutDashboard>
    );
}

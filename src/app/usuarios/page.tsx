"use client";
import { LayoutDashboard } from "@/components/LayoutDashboard";
import Cookies from 'js-cookie';
import { Table } from "react-bootstrap";
import { BotaoCadastro } from "@/components/botaoCadastro";
import { useEffect, useState } from "react";
import axios from "axios";
import { IUser } from './../interfaces/IUser';
import { Loading } from "@/components/Loading";
import Link from "next/link";

export default function Users() {
    const [users, setUsers] = useState<IUser[]>([]); // Definindo o estado como um array de IUser
    const token = Cookies.get('@token');
    const [loading, setLoading] = useState(false)

    const header = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    function listUser() {
        setLoading(true)
        axios.get("http://127.0.0.1:8000/api/users", header)
            .then(response => {
                const data = response.data.data;
                setUsers(data)
                setLoading(false)
            }).catch(error => {
                console.error('Erro ao buscar usuários:', error);
                setLoading(false)
            });
    }

    useEffect(() => {
        if (!token) {
          window.location.href = '/';
        } else {
            listUser();
        }
    }, [token]);

    async function deletarUser(id: number) {
        if (!token) {
          window.location.href = '/';
        } else {
            if (confirm('Deseja deletar esse usuário?')) {
                axios.delete("http://127.0.0.1:8000/api/users/" + id, header)
                    .then(() => listUser())
                    .catch(err => console.log(err))
            }
        }
    }

    return (
        <LayoutDashboard>
            <Loading loading={loading} />
            <div className="row mt-5">
                <div className="col-md-6"><h2 className="fw-bold">Usuários</h2></div>
                <div className="col-md-2 offset-4"> <BotaoCadastro rota={'/usuarios/novo-usuario'} titulo={"Novo Usuário"} /></div>
            </div>
            <Table striped bordered hover variant="dark" style={{ marginTop: '1rem' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CPF</th>
                        <th>Tipo de Usuário</th>
                        <th>Ações</th>
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
                            <td>
                                <Link href={'/usuarios/' + user.id} 
                                type="button" title="Atualizar" className="btn btn-light me-1" ><i className="bi bi-pencil-square"></i></Link>
                                <button type="button" className="btn btn-danger" onClick={() => deletarUser(user.id)}><i className="bi bi-trash"> </i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </LayoutDashboard>
    );
}

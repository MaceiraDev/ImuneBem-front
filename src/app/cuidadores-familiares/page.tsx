"use client"
import { LayoutDashboard } from "@/components/LayoutDashboard";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import { Loading } from "@/components/Loading";
import { Table } from "react-bootstrap";
import { BotaoCadastro } from "@/components/botaoCadastro";
import Link from "next/link";
import { IEmployees } from "../interfaces/IEmployees";

export default function Employees() {
  const [employees, setEmployee] = useState<IEmployees[]>([])
  const token = Cookies.get('@token');
  const [loading, setLoading] = useState(false)

  const header = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const getEmployees = () => {
    setLoading(true)
    axios.get("http://127.0.0.1:8000/api/employees", header)
      .then(res => {
        setEmployee(res.data.data)
        setLoading(false)
      }).catch(err => {
        console.error('Erro ao buscar cuidador:', err);
        setLoading(false)
      })
  }
  async function deletarEmployee(id: number) {
    if (!token) {
      redirect('/login');
    } else {
      if (confirm('Deseja deletar esse cuidador / familiar?')) {
        axios.delete("http://127.0.0.1:8000/api/employees/" + id, header)
          .then(() => getEmployees())
          .catch(err => console.log(err))
      }
    }
  }
  useEffect(() => {
    if (!token) {
      redirect('/login');
    } else {
      getEmployees();
    }
  }, [token]);
  return (
    <LayoutDashboard>
      <Loading loading={loading} />
      <div className="row mt-5">
        <div className="col-md-6"><h2 className="fw-bold">Cuidadores / Familiares</h2></div>
        <div className="col-md-2 offset-4"> <BotaoCadastro rota={'/cuidadores-familiares/novo-cuidador'} titulo={"Novo Cuidador/Familiar"} /></div>
      </div>
      <Table striped bordered hover variant="dark" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employ => (
            <tr key={employ.id}>
              <td>{employ.id}</td>
              <td>{employ.name}</td>
              <td>{employ.description}</td>
              <td>
                <Link href={'/cuidadores-familiares/' + employ.id} type="button" title="Atualizar" className="btn btn-light me-1" ><i className="bi bi-pencil-square"></i></Link>
                <button type="button" title="Deletar" className="btn btn-danger" onClick={() => deletarEmployee(employ.id)}><i className="bi bi-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </LayoutDashboard>
  )
}
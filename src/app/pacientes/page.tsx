"use client"
import { LayoutDashboard } from "@/components/LayoutDashboard";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { IPatient } from "../interfaces/IPatients";
import axios from "axios";
import { Loading } from "@/components/Loading";
import { Table } from "react-bootstrap";
import { BotaoCadastro } from "@/components/botaoCadastro";
import Link from "next/link";

export default function Patients() {
  const [patients, setPatients] = useState<IPatient[]>([])
  const token = Cookies.get('@token');
  const [loading, setLoading] = useState(false)

  const header = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const getPatients = () => {
    setLoading(true)
    axios.get("http://127.0.0.1:8000/api/patients", header)
      .then(res => {
        setPatients(res.data.data)
        setLoading(false)
      }).catch(err => {
        console.error('Erro ao buscar pacientes:', err);
        setLoading(false)
      })
  }
  async function detelarPatient(id: number) {
    if (!token) {
      window.location.href = '/';
    } else {
      if (confirm('Deseja deletar esse paciente?')) {
        axios.delete("http://127.0.0.1:8000/api/patients/" + id, header)
          .then(() => getPatients())
          .catch(err => console.log(err))
      }
    }
  }
  useEffect(() => {
    if (!token) {
      window.location.href = '/';
    } else {
      getPatients();
    }
  }, [token]);
  return (
    <LayoutDashboard>
      <Loading loading={loading} />
      <div className="row mt-5">
        <div className="col-md-6"><h2 className="fw-bold">Pacientes</h2></div>
        <div className="col-md-2 offset-4"> <BotaoCadastro rota={'/pacientes/novo-paciente'} titulo={"Novo Paciente"} /></div>
      </div>
      <Table striped bordered hover variant="dark" style={{ marginTop: '1rem' }} responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Email Vinculado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.linked_email}</td>
              <td>
                <Link href={'/pacientes/' + patient.id} type="button" title="Atualizar" className="btn btn-light me-1" ><i className="bi bi-pencil-square"></i></Link>
                <button type="button" title="Deletar" className="btn btn-danger" onClick={() => detelarPatient(patient.id)}><i className="bi bi-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </LayoutDashboard>
  )
}
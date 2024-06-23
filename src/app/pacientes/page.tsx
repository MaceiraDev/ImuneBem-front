"use client"
import { LayoutDashboard } from "@/components/LayoutDashboard";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { IPatient } from "../interfaces/IPatients";
import axios from "axios";
import { redirect } from "next/navigation";
import { Loading } from "@/components/Loading";
import { Table } from "react-bootstrap";
import { BotaoCadastro } from "@/components/botaoCadastro";

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
  useEffect(() => {
    if (!token) {
      redirect('/login');
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
      <Table striped bordered hover variant="dark" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td><button type="button" className="btn btn-danger" ><i className="bi bi-trash"></i></button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </LayoutDashboard>
  )
}
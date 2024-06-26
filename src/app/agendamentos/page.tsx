"use client"
import { LayoutDashboard } from "@/components/LayoutDashboard";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "@/components/Loading";
import { Table } from "react-bootstrap";
import Link from "next/link";
import { IAgenda } from "../interfaces/IAgenda";

export default function Agendamentos() {
  const [agendamentos, setAgendamento] = useState<IAgenda[]>([])
  const token = Cookies.get('@token');
  const [loading, setLoading] = useState(false)

  const header = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const getAgendas = () => {
    setLoading(true)
    axios.get("http://127.0.0.1:8000/api/schedulings", header)
      .then(res => {
        setAgendamento(res.data.data)
        setLoading(false)
      }).catch(err => {
        console.error('Erro ao buscar agendamentos:', err);
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!token) {
      window.location.href = '/';
    } else {
      getAgendas();
    }
  }, [token]);
  return (
    <LayoutDashboard>
      <Loading loading={loading} />
      <div className="row mt-5">
        <div className="col-md-6"><h2 className="fw-bold">Agendamentos</h2></div>
      </div>
      <Table striped bordered hover variant="dark" style={{ marginTop: '1rem' }} responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Vacina</th>
            <th>Data</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map(agenda => (
            <tr key={agenda.id}>
              <td>{agenda.id}</td>
              <td>{agenda.patient_name}</td>
              <td>{agenda.vaccine_name}</td>
              <td>{agenda.date}</td>
              <td>{agenda.status}</td>
              <td>
                <Link href={'/pacientes/' + agenda.id} type="button" title="Atualizar" className="btn btn-light me-1" ><i className="bi bi-pencil-square"></i></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </LayoutDashboard>
  )
}
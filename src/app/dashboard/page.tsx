"use client"
import { LayoutDashboard } from "@/components/LayoutDashboard";
import styles from './styles.module.css'
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { Loading } from "@/components/Loading";
import { IInfos } from "../interfaces/IInfos";
import Link from "next/link";
import { IAgenda } from "../interfaces/IAgenda";

export default function Dashboard() {
  const token = Cookies.get('@token');
  const [loading, setLoading] = useState(false);
  const [info, setInfos] = useState<IInfos>();
  const [pendents, setPen] = useState<IAgenda[]>([]);

  const header = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const statusMap: { [key: number]: string } = {
    1: "Pendente",
    2: "Aceito",
    3: "Concluído",
    4: "Cancelado", 
  };
  
  
  const getInfos = () => {
    setLoading(true)
    axios.get("http://127.0.0.1:8000/api/infos", header)
      .then(res => {
        setInfos(res.data)
        console.log('Resposta da API:', res.data);
        setLoading(false)
      }).catch(err => {
        console.error('Erro ao buscar vacinas:', err);
        setLoading(false)
      })
  }

  const getSchedulingsPendents = () => {
    setLoading(true)
    axios.get("http://127.0.0.1:8000/api/schedulings?status=1", header)
      .then(res => {
        setPen(res.data.data)
        setLoading(false)
      }).catch(err => {
        console.error('Erro ao buscar agendamentos pendentes:', err);
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!token) {
      window.location.href = '/';
    } else {
      getInfos();
      getSchedulingsPendents();
    }
  }, [token]); return (
    <>
      <LayoutDashboard>
        <Loading loading={loading} />
        <div className="container">
          <div className="row">
            <div className="col-md-4 mt-3">
              <div className={styles.card}>
                <h4>Total de Vacinas <i className="bi bi-clipboard2-pulse"></i></h4>
                <span>{info ? info.total_vaccines : 'Carregando...'}</span>
              </div>
            </div>
            <div className="col-md-4 mt-3">
              <div className={styles.card}>
                <h4>Agendamentos Aceitos <i className="bi bi-clipboard2-plus"></i></h4>
                <span>{info ? info.schedoling_aceppts : 'Carregando...'}</span>
              </div>
            </div>
            <div className="col-md-4 mt-3">
              <div className={styles.card}>
                <h4>Agendamentos Concluídos <i className="bi bi-clipboard2-check"></i></h4>
                <span>{info ? info.schedoling_final : 'Carregando...'}</span>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-8">
              <Table striped bordered hover variant="dark" responsive className={styles.table}>
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
                  {pendents.map(agenda => (
                    <tr key={agenda.id}>
                      <td>{agenda.id}</td>
                      <td>{agenda.patient_name}</td>
                      <td>{agenda.vaccine_name}</td>
                      <td>{agenda.date}</td>
                      <td>{statusMap[agenda.status_id] || "Desconhecido"}</td>
                      <td>
                        <Link href={'/agendamentos/' + agenda.id} type="button" title="Atualizar" className="btn btn-light me-1" ><i className="bi bi-pencil-square"></i></Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="col-md-4">
              <div className="div">
                <img src="/imagens/vacina_dash.jpg" className={styles.img_dash} alt="Imagem de uma Vacina" />
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  )
}

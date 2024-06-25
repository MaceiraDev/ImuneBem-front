"use client"
import { LayoutDashboard } from "@/components/LayoutDashboard";
import styles from './styles.module.css'
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { Loading } from "@/components/Loading";
import { IInfos } from "../interfaces/IInfos";

export default function Dashboard() {
  const token = Cookies.get('@token');
  const [loading, setLoading] = useState(false);
  const [info, setInfos] = useState<IInfos>();

  const header = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

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

  useEffect(() => {
    if (!token) {
      window.location.href = '/';
    } else {
      getInfos();
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
                <span>2</span>
              </div>
            </div>
            <div className="col-md-4 mt-3">
              <div className={styles.card}>
                <h4>Agendamentos Concluídos <i className="bi bi-clipboard2-check"></i></h4>
                <span>2</span>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-8">
              <Table striped bordered hover variant="dark" responsive className={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
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

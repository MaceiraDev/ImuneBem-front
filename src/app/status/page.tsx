"use client"
import { LayoutDashboard } from "@/components/LayoutDashboard";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "@/components/Loading";
import { Table } from "react-bootstrap";
import { IStatus } from "../interfaces/IStatus";

export default function Status() {
  const [data, setData] = useState<IStatus[]>([])
  const token = Cookies.get('@token');
  const [loading, setLoading] = useState(false)

  const header = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const getStatus = () => {
    setLoading(true)
    axios.get("http://127.0.0.1:8000/api/status", header)
      .then(res => {
        setData(res.data)
        setLoading(false)
      }).catch(err => {
        console.error('Erro ao buscar status:', err);
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!token) {
      window.location.href = '/';
    } else {
      getStatus();
    }
  }, [token]);

  return (
    <LayoutDashboard>
      <Loading loading={loading} />
      <div className="row mt-5">
        <div className="col-md-6"><h2 className="fw-bold">Status</h2></div>
      </div>
      <Table striped bordered hover variant="dark" style={{ marginTop: '1rem' }} responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulo</th>
          </tr>
        </thead>
        <tbody>
          {data.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </LayoutDashboard>
  )
}
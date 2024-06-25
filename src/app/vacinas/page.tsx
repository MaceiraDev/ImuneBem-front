"use client"
import { LayoutDashboard } from "@/components/LayoutDashboard";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "@/components/Loading";
import { Table } from "react-bootstrap";
import { BotaoCadastro } from "@/components/botaoCadastro";
import Link from "next/link";
import { IVaccines } from "../interfaces/IVaccines";

export default function Patients() {
  const [vaccines, setVaccines] = useState<IVaccines[]>([])
  const token = Cookies.get('@token');
  const [loading, setLoading] = useState(false)

  const header = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const getVaccines = () => {
    setLoading(true)
    axios.get("http://127.0.0.1:8000/api/vaccines", header)
      .then(res => {
        setVaccines(res.data.data)
        setLoading(false)
      }).catch(err => {
        console.error('Erro ao buscar vacinas:', err);
        setLoading(false)
      })
  }
  async function deletarVaccine(id: number) {
    if (!token) {
      window.location.href = '/';
    } else {
      if (confirm('Deseja deletar essa vacina?')) {
        axios.delete("http://127.0.0.1:8000/api/vaccines/" + id, header)
          .then(() => getVaccines())
          .catch(err => console.log(err))
      }
    }
  }
  useEffect(() => {
    if (!token) {
      window.location.href = '/';
    } else {
      getVaccines();
    }
  }, [token]);
  return (
    <LayoutDashboard>
      <Loading loading={loading} />
      <div className="row mt-5">
        <div className="col-md-6"><h2 className="fw-bold">Vacinas</h2></div>
        <div className="col-md-2 offset-4"> <BotaoCadastro rota={'/vacinas/nova-vacina'} titulo={"Nova Vacina"} /></div>
      </div>
      <Table striped bordered hover variant="dark" style={{ marginTop: '1rem' }} responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Doses</th>
            <th>Idade Recomendada</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vaccines.map(vacine => (
            <tr key={vacine.id}>
              <td>{vacine.id}</td>
              <td>{vacine.name}</td>
              <td>{vacine.doses}</td>
              <td>{vacine.recommended_age} anos</td>
              <td>
                <Link href={'/vacinas/' + vacine.id} type="button" title="Atualizar" className="btn btn-light me-1" ><i className="bi bi-pencil-square"></i></Link>
                <button type="button" title="Deletar" className="btn btn-danger" onClick={() => deletarVaccine(vacine.id)}><i className="bi bi-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </LayoutDashboard>
  )
}
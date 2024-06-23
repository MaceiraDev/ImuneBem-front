"use client";
import { IEmployees } from "@/app/interfaces/IEmployees";
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { Loading } from "@/components/Loading";
import axios from "axios";
import Cookies from 'js-cookie';
import Link from "next/link";
import { redirect } from "next/navigation";
import { SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";

export default function UpPatients({ params }: { params: { id: string } }) {

  const [employ, setEmploy] = useState<IEmployees | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const token = Cookies.get('@token');
  const refForm = useRef<any>();

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const getEmployes = () => {
    setLoading(true);
    axios.get(`http://127.0.0.1:8000/api/employees/${params.id}`, header)
      .then(res => {
        const data = res.data.data;
        setEmploy(data);
        setName(data.name);
        setDesc(data.description);
        setLoading(false);
      }).catch(err => {
        console.error('Erro ao buscar cuidador:', err);
        setLoading(false);
      });
  }

  const submitForm = useCallback((e: SyntheticEvent) => {
    e.preventDefault();

    if (refForm.current.checkValidity()) {

      axios.put<IPatient>(
        `http://127.0.0.1:8000/api/employees/${params.id}`,
        {
          name: name,
          description: description
        },
        header
      )
        .then(response => {
          console.log('Paciente atualizado:', response.data);
          redirect('/pacientes');
        })
        .catch(error => {
          console.error('Erro ao atualizar paciente:', error);
        });
    } else {
      refForm.current.classList.add('was-validated');
    }
  }, [name, description, params.id]);

  useEffect(() => {
    if (!token) {
      redirect('/login');
    } else {
      getEmployes();
    }
  }, [token]);

  if (loading) {
    return <Loading loading={true} />;
  }

  return (
    <LayoutDashboard token={token}>
      <h2 className="fw-bold mt-5">Atualizar Cuidador / Familiar</h2>
      <Card style={{ padding: '1rem', boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;', border: 'solid 1px #000' }}>
        <form
          className='needs-validation align-items-center'
          noValidate
          onSubmit={submitForm}
          ref={refForm}
        >
          <div className="row">
            <div className='col-md-4'>
              <label htmlFor='name' className='form-label'>Nome:</label>
              <input
                type='text'
                className='form-control'
                id='name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className='invalid-feedback'>Digite um nome:</div>
            </div>
            <div className='col-md-6'>
              <label htmlFor='description' className='form-label'>Descrição:</label>
              <textarea
                className='form-control'
                id='description'
                required
                value={description}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
              <div className='invalid-feedback'>Digite uma descrição:</div>
            </div>

            <div className='col-md-12 mt-3' style={{ textAlign: "right" }}>
              <Link
                className="btn btn-danger me-3"
                type='button'
                href={'/cuidadores-familiares'}
              >
                Cancelar
              </Link>

              <button
                className="btn btn-warning"
                type='submit'
              >
                Atualizar
              </button>
            </div>
          </div>
        </form>
      </Card>
    </LayoutDashboard>
  );
}

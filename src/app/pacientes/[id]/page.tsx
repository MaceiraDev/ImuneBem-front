"use client";
import { IPatient } from "@/app/interfaces/IPatients";
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { Loading } from "@/components/Loading";
import axios from "axios";
import Cookies from 'js-cookie';
import Link from "next/link";
import { SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";

export default function UpPatients({ params }: { params: { id: string } }) {

  const [patient, setPatient] = useState<IPatient | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [linked_email, setMail] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const token = Cookies.get('@token');
  const refForm = useRef<any>();

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const getPatients = () => {
    setLoading(true);
    axios.get(`http://127.0.0.1:8000/api/patients/${params.id}`, header)
      .then(res => {
        const patientData = res.data.data;
        setPatient(patientData);
        setName(patientData.name); // Set initial value for name
        setAge(patientData.age); // Set initial value for age
        setMail(patientData.linked_email);
        setLoading(false);
      }).catch(err => {
        console.error('Erro ao buscar pacientes:', err);
        setLoading(false);
      });
  }

  const submitForm = useCallback((e: SyntheticEvent) => {
    e.preventDefault();

    if (refForm.current.checkValidity()) {

      axios.put<IPatient>(
        `http://127.0.0.1:8000/api/patients/${params.id}`,
        {
          name: name,
          age: age,
          linked_email: linked_email
        },
        header
      )
        .then(response => {
          console.log('Paciente atualizado:', response.data);
          window.location.href = '/pacientes';
        })
        .catch(error => {
          console.error('Erro ao atualizar paciente:', error);
        });
    } else {
      refForm.current.classList.add('was-validated');
    }
  }, [name, age, linked_email, params.id]);

  useEffect(() => {
    if (!token) {
      window.location.href = '/';
    } else {
      getPatients();
    }
  }, [token]);

  if (loading) {
    return <Loading loading={true} />;
  }

  return (
    <LayoutDashboard>
      <h2 className="fw-bold mt-5">Atualizar Paciente</h2>
      <Card style={{ padding: '1rem', border: 'solid 1px #000' }}>
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
            <div className='col-md-4'>
              <label htmlFor='age' className='form-label'>Idade:</label>
              <input
                type='number'
                className='form-control'
                id='age'
                required
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
              <div className='invalid-feedback'>Digite uma idade:</div>
            </div>
            <div
              className='col-md-4'
            >
              <label
                htmlFor='linked_email'
                className='form-label'
              >
                Email Vinculado
              </label>
              <input
                type='email'
                className='form-control'
                id='linked_email'
                required
                value={linked_email}
                onChange={(e) => setMail(e.target.value)}
              />
              <div
                className='invalid-feedback'
              >
                Digite um email:
              </div>
            </div>
            <div className='col-md-12 mt-3' style={{ textAlign: "right" }}>
              <Link
                className="btn btn-danger me-3"
                type='button'
                href={'/pacientes'}
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

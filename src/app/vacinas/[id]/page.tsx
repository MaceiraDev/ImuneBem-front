"use client";
import { IVaccines } from "@/app/interfaces/IVaccines";
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { Loading } from "@/components/Loading";
import axios from "axios";
import Cookies from 'js-cookie';
import Link from "next/link";
import { SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";

export default function UpUsers({ params }: { params: { id: string } }) {

  const [vaccine, setVaccine] = useState<IVaccines | null>(null);
  const [loading, setLoading] = useState(false);
  const [doses, setDoses] = useState<number | undefined>();
  const [recommended_age, setAge] = useState<number | undefined>();
  const [name, setName] = useState('');
  const [observation, setObs] = useState('');
  const [date_limit, setDate] = useState<string>("");
  const token = Cookies.get('@token');
  const refForm = useRef<any>();

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const getVaccine = () => {
    setLoading(true);
    axios.get(`http://127.0.0.1:8000/api/vaccines/${params.id}`, header)
      .then(res => {
        const userData = res.data.data;
        setVaccine(userData);
        setName(userData.name);
        setDoses(userData.doses);
        setAge(userData.recommended_age);
        setObs(userData.observation);
        setDate(userData.date_limit);
        setLoading(false);
      }).catch(err => {
        console.error('Erro ao buscar vacina:', err);
        setLoading(false);
      });
  }

  const submitForm = useCallback((e: SyntheticEvent) => {
    e.preventDefault();

    if (refForm.current.checkValidity()) {

      axios.put<IVaccines>(
        `http://127.0.0.1:8000/api/vaccines/${params.id}`,
        {
          name: name,
          doses: doses,
          date_limit: date_limit,
          recommended_age: recommended_age,
          observation: observation,
        },
        header
      )
        .then(response => {
          console.log('Vacina atualizada com sucesso:', response.data);
          window.location.href = '/vacinas';
        })
        .catch(error => {
          console.error('Erro ao atualizar usuário:', error);
        });
    } else {
      refForm.current.classList.add('was-validated');
    }
  }, [name, doses, date_limit, recommended_age, observation, params.id]);

  useEffect(() => {
    if (!token) {
      window.location.href = '/';
    } else {
      getVaccine();
    }
  }, [token]);

  if (loading) {
    return <Loading loading={true} />;
  }

  return (
    <LayoutDashboard token={token}>
      <h2 className="fw-bold mt-5">Atualizar Vacina</h2>
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
            <div className='col-md-2'>
              <label htmlFor='doses' className='form-label'>
                Doses:
              </label>
              <input
                type='number'
                className='form-control'
                id='doses'
                required
                value={doses}
                onChange={(e) => setDoses(Number(e.target.value))}
              />
              <div className='invalid-feedback'>
                Digite uma dose:
              </div>
            </div>
            <div className='col-md-2'>
              <label htmlFor='recommended_age' className='form-label'>
                Idade Recomendada
              </label>
              <input
                type='number'
                className='form-control'
                id='recommended_age'
                required
                value={recommended_age}
                onChange={(e) => setAge(Number(e.target.value))}

              />
              <div className='invalid-feedback'>
                Digite uma idade:
              </div>
            </div>
            <div className='col-md-2'>
              <label htmlFor='date_limit' className='form-label'>
                Data Limite
              </label>
              <input
                type='date'
                className='form-control'
                id='date_limit'
                required
                value={date_limit}
                onChange={(e) => setDate(e.target.value)}

              />
              <div className='invalid-feedback'>
                Insira uma data limite:
              </div>
            </div>

            <div className='col-md-12'>
              <label htmlFor='observation' className='form-label'>
                Observações
              </label>
              <textarea
                rows={5}
                className='form-control'
                id='observation'
                required
                placeholder="Digite curiosidades, informações sobre essa vacina:"
                value={observation}
                onChange={(e) => setObs(e.target.value)}

              ></textarea>
              <div className='invalid-feedback'>
                Insira uma observação:
              </div>

            </div>

            <div className='col-md-12 mt-3' style={{ textAlign: "right" }}>
              <Link
                className="btn btn-danger me-3"
                type='button'
                href={'/vacinas'}
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

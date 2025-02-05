"use client";
import { IAgenda } from "@/app/interfaces/IAgenda";
import { IStatus } from "@/app/interfaces/IStatus";
import { IUser } from "@/app/interfaces/IUser";
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { Loading } from "@/components/Loading";
import axios from "axios";
import Cookies from 'js-cookie';
import Link from "next/link";
import { SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";

export default function UpPatients({ params }: { params: { id: string } }) {

  const [data, setData] = useState<IStatus[]>([])
  const [agenda, setAgenda] = useState<IAgenda | null>(null);
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState('');
  const [date, setDate] = useState('');
  const [prof, setProf] = useState('');
  const [vaccine, setVaccine] = useState('');
  const [description, setDescription] = useState('');
  const [status_id, setSta] = useState(Number);
  const [patient_id, setPatId] = useState('');
  const [professional_id, setProfId] = useState(6);
  // const [professionals, setProfessionals] = useState<IUser``>();
  const [vaccine_id, setVaccId] = useState('');
  const [type, setType] = useState(Number);
  const [users, setUsers] = useState<IUser[]>([]); // Definindo o estado como um array de IUser

  const token = Cookies.get('@token');
  const refForm = useRef<any>();

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const typeMap: { [key: number]: string } = {
    0: "Requerimento de vacina",
    1: "Visita domiciliar",
  };



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
  const getUsers = () => {
    setLoading(true)
    axios.get("http://127.0.0.1:8000/api/users/professionals", header)
      .then(res => {
        setUsers(res.data.data)
        console.log(users)
        setLoading(false)
      }).catch(err => {
        console.error('Erro ao buscar agendamentos pendentes:', err);
        setLoading(false)
      })
  }
  const getAgendamento = () => {
    setLoading(true);
    axios.get(`http://127.0.0.1:8000/api/schedulings/${params.id}`, header)
      .then(res => {
        const data = res.data.data;
        setAgenda(data);
        setPatient(data.patient_name);
        setDate(data.date);
        setSta(data.status_id);
        setProf(data.professional_name);
        setVaccine(data.vaccine_name);
        setDescription(data.description);
        setPatId(data.patient_id);
        //setProfId(data.professional_id);
        setVaccId(data.vaccine_id);
        setType(data.type);

        setLoading(false);
      }).catch(err => {
        console.error('Erro ao buscar cuidador:', err);
        setLoading(false);
      });
  }

  const submitForm = useCallback((e: SyntheticEvent) => {
    e.preventDefault();

    console.log('Status atual:', status_id);
    console.log('Status atual:', users);

    console.log(professional_id)

    if (refForm.current.checkValidity()) {
      axios.put<IAgenda>(
        `http://127.0.0.1:8000/api/schedulings/${params.id}`,
        {
          description: description,
          status_id: status_id,
          patient_id: patient_id,
          date: date,
          type: type,
          professional_id: professional_id,
          vaccines_id: vaccine_id,
        },
        header
      )
        .then(response => {
          console.log('Agendamento atualizado:', response.data);
          window.location.href = '/agendamentos';
        })
        .catch(error => {
          console.error('Erro ao atualizar agendamento:', error);
        });
    } else {
      refForm.current.classList.add('was-validated');
    }
  }, [description, status_id, params.id]);

  useEffect(() => {
    if (!token) {
      window.location.href = '/';
    } else {
      getStatus();
      getAgendamento();
      getUsers();
    }
  }, [token]);

  if (loading) {
    return <Loading loading={true} />;
  }

  return (
    <LayoutDashboard>
      <h2 className="fw-bold mt-5">Atualizar Agendamento</h2>
      <Card style={{ padding: '1rem', border: 'solid 1px #000' }}>
        <form
          className='needs-validation align-items-center'
          noValidate
          onSubmit={submitForm}
          ref={refForm}
        >
          <div className="row">
            <div className='col-md-3'>
              <label htmlFor='name' className='form-label'>Paciente:</label>
              <input
                type='text'
                className='form-control'
                id='name'
                required
                value={patient}
                readOnly />
              <div className='invalid-feedback'>Digite um nome:</div>
            </div>
            <div className='col-md-2'>
              <label htmlFor='name' className='form-label'>Data do agendamento:</label>
              <input
                type='date'
                className='form-control'
                id='name'
                required
                value={date}
                readOnly
              />
              <div className='invalid-feedback'>Digite um nome:</div>
            </div>


            <div className="col-md-4">
              <label htmlFor="professional" className="form-label">Profissional:</label>
              <select
                className="form-select"
                id="professional"
                value={professional_id}
                onChange={(e) => { 
                  setProfId(Number(e.target.value))
                }
              }
                required
              >
                <option value="" disabled>Selecione um profissional</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='col-md-3'>
              <label htmlFor='name' className='form-label'>Nome da vacina:</label>
              <input
                type='text'
                className='form-control'
                id='name'
                required
                value={vaccine}
                readOnly />
              <div className='invalid-feedback'>Digite um nome:</div>
            </div>
            <div className="col-md-2">
              <label htmlFor='status' className='form-label'>Status:</label>
              <select className="form-select"
                id="status"
                value={status_id}
                onChange={(e) => setSta(Number(e.target.value))}
                required
              >
                <option value="" disabled>Selecione um status</option>
                {data.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.description}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-md-7'>
              <label htmlFor='description' className='form-label'>Descrição:</label>
              <textarea
                className='form-control'
                id='description'
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <div className='invalid-feedback'>Digite uma descrição:</div>
            </div>
            <div className='col-md-3'>
              <label htmlFor='name' className='form-label'>Tipo da visita:</label>
              <input
                type='text'
                className='form-control'
                id='name'
                required
                value={typeMap[type] || "Desconhecido"}
                readOnly />
            </div>
            <div className='col-md-12 mt-3' style={{ textAlign: "right" }}>
              <Link
                className="btn btn-danger me-3"
                type='button'
                href={'/agendamentos'}
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

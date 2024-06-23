"use client";
import { IUser } from "@/app/interfaces/IUser";
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { Loading } from "@/components/Loading";
import axios from "axios";
import Cookies from 'js-cookie';
import Link from "next/link";
import { redirect } from "next/navigation";
import { SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import InputMask from 'react-input-mask';

export default function UpUsers({ params }: { params: { id: string } }) {

  const [patient, setPatient] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [type_user, setType] = useState<number | undefined>();
  const [password, setPass] = useState('');
  const token = Cookies.get('@token');
  const refForm = useRef<any>();

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const getUser = () => {
    setLoading(true);
    axios.get(`http://127.0.0.1:8000/api/users/${params.id}`, header)
      .then(res => {
        const userData = res.data.data;
        setPatient(userData);
        setName(userData.name);
        setEmail(userData.email);
        setCpf(userData.cpf);
        setType(userData.type_user);
        setLoading(false);
      }).catch(err => {
        console.error('Erro ao buscar usuário:', err);
        setLoading(false);
      });
  }

  const submitForm = useCallback((e: SyntheticEvent) => {
    e.preventDefault();

    if (refForm.current.checkValidity()) {

      axios.put<IUser>(
        `http://127.0.0.1:8000/api/users/${params.id}`,
        {
          name: name,
          email: email,
          cpf: cpf,
          type_user: type_user,
          password: password,
        },
        header
      )
        .then(response => {
          console.log('Usuário atualizado:', response.data);
          redirect('/usuarios');
        })
        .catch(error => {
          console.error('Erro ao atualizar usuário:', error);
        });
    } else {
      refForm.current.classList.add('was-validated');
    }
  }, [name, email, cpf, type_user, password, params.id]);

  useEffect(() => {
    if (!token) {
      redirect('/login');
    } else {
      getUser();
    }
  }, [token]);

  if (loading) {
    return <Loading loading={true} />;
  }

  return (
    <LayoutDashboard token={token}>
      <h2 className="fw-bold mt-5">Atualizar {name}</h2>
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
            <div className='col-md-4'>
              <label htmlFor='email' className='form-label'>Email:</label>
              <input
                type='email'
                className='form-control'
                id='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className='invalid-feedback'>Digite um email:</div>
            </div>
            <div className='col-md-4'>
              <label htmlFor='type_user' className='form-label'>Tipo de Usuário:</label>
              <select
                value={type_user}
                onChange={(e) => setType(parseInt(e.target.value))}
                className="form-select"
                id="type_user"
              >
                <option disabled selected>Selecione</option>
                <option value={0}>Profissional da Saúde</option>
                <option value={1}>Cuidador / Familiar</option>
                <option value={2}>Idoso / Paciente</option>
              </select>
              <div className='invalid-feedback'>Selecione um tipo de usuário:</div>
            </div>
            <div className='col-md-6'>
              <label htmlFor='cpf' className='form-label'>CPF:</label>
              <InputMask
                mask='999.999.999-99'
                className='form-control'
                id='cpf'
                required
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
              <div className='invalid-feedback'>Digite um CPF:</div>
            </div>
            <div className='col-md-6'>
              <label htmlFor='password' className='form-label'>Senha</label>
              <input
                type='password'
                className='form-control'
                id='password'
                required
                value={password}
                onChange={(e) => setPass(e.target.value)}
              />
              <div className='invalid-feedback'>Digite sua senha:</div>
            </div>
            <div className='col-md-12 mt-3' style={{ textAlign: "right" }}>
              <Link
                className="btn btn-danger me-3"
                type='button'
                href={'/usuarios'}
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

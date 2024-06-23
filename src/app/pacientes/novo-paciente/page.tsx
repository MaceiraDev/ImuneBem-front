"use client";
import { IPatient } from "@/app/interfaces/IPatient";
import { LayoutDashboard } from "@/components/LayoutDashboard";
import axios from "axios";
import Cookies from 'js-cookie';
import Link from "next/link";
import { redirect } from "next/navigation";
import { SyntheticEvent, useCallback, useRef } from "react";
import { Card } from "react-bootstrap";

export default function NewPatient() {

  const token = Cookies.get('@token');
  const refForm = useRef<any>();

  const submitForm = useCallback((e: SyntheticEvent) => {
    e.preventDefault();

    if (refForm.current.checkValidity()) {

      const target = e.target as typeof e.target & {
        name: { value: string },
        age: { value: number },
        linked_email: { value: string }
      }

      //const header 
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      axios.post<IPatient[]>(
        "http://127.0.0.1:8000/api/patients",  // URL do endpoint
        {
          // Corpo da requisição (payload)
          name: target.name.value,
          age: target.age.value,
          linked_email: target.linked_email.value
        },
        //passarndo header para autorizar a rota
        header
      )
        .then(response => {
          // Manipule a resposta aqui
          console.log(response.data);
        })
        .catch(error => {
          // Manipule os erros aqui
          console.error(error);
        });
      redirect('/pacientes')
    } else {
      refForm.current.classList.add('was-validated')

    }
  }, [])

  return (
    <LayoutDashboard
      token={token}
    >
      <h2 className="fw-bold mt-5">Novo Paciente</h2>
      <Card style={{ padding: '1rem', border: 'solid 1px #000' }}>
        <form
          className='needs-validation align-items-center'
          noValidate
          onSubmit={submitForm}
          ref={refForm}

        >
          <div className="row">
            <div
              className='col-md-4'
            >
              <label
                htmlFor='name'
                className='form-label'
              >
                Nome:
              </label>
              <input
                type='text'
                className='form-control'
                id='name'
                required
              />
              <div
                className='invalid-feedback'
              >
                Digite um nome:
              </div>
            </div>
            <div
              className='col-md-4'
            >
              <label
                htmlFor='age'
                className='form-label'
              >
                Idade:
              </label>
              <input
                type='number'
                className='form-control'
                id='age'
                required
              />
              <div
                className='invalid-feedback'
              >
                Digite uma idade:
              </div>
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
              />
              <div
                className='invalid-feedback'
              >
                Digite um email:
              </div>
            </div>

            <div
              className='col-md-12 mt-3' style={{ textAlign: "right" }}
            >
              <Link
                className="btn btn-danger me-3"
                type='button'
                href={'/pacientes'}
                id='botao'
              >
                Cancelar
              </Link>

              <button
                className="btn btn-warning "
                type='submit'
                id='botao'
              >
                Cadastrar
              </button>

            </div>
          </div>
        </form>
      </Card>
    </LayoutDashboard>
  );
}

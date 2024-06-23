"use client";
import { IEmployees } from "@/app/interfaces/IEmployees";
import { LayoutDashboard } from "@/components/LayoutDashboard";
import axios from "axios";
import Cookies from 'js-cookie';
import Link from "next/link";
import { redirect } from "next/navigation";
import { SyntheticEvent, useCallback, useRef } from "react";
import { Card } from "react-bootstrap";

export default function NewCuidador() {

  const token = Cookies.get('@token');
  const refForm = useRef<any>();

  const submitForm = useCallback((e: SyntheticEvent) => {
    e.preventDefault();

    if (refForm.current.checkValidity()) {

      const target = e.target as typeof e.target & {
        name: { value: string },
        description: { value: number },

      }
      //const header 
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      axios.post<IEmployees[]>(
        "http://127.0.0.1:8000/api/employees",  // URL do endpoint
        {
          // Corpo da requisição (payload)
          name: target.name.value,
          description: target.description.value
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
      redirect('/cuidadores-familiares')
    } else {
      refForm.current.classList.add('was-validated')

    }
  }, [])

  return (
    <LayoutDashboard
      token={token}
    >
      <h2 className="fw-bold mt-5">Novo Cuidador / Familiar</h2>
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
              className='col-md-6'
            >
              <label
                htmlFor='description'
                className='form-label'
              >
                Descrição:
              </label>
              <textarea
                className='form-control'
                id='description'
                required
              ></textarea>
              <div
                className='invalid-feedback'
              >
                Digite uma descrição:
              </div>
            </div>

            <div
              className='col-md-12 mt-3' style={{ textAlign: "right" }}
            >
              <Link
                className="btn btn-danger me-3"
                type='button'
                href={'/cuidadores-familiares'}
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

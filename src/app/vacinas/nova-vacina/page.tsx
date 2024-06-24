"use client";
import { IVaccines } from "@/app/interfaces/IVaccines";
import { LayoutDashboard } from "@/components/LayoutDashboard";
import axios from "axios";
import Cookies from 'js-cookie';
import Link from "next/link";
import { SyntheticEvent, useCallback, useRef, useState } from "react";
import { Card } from "react-bootstrap";

export default function NewPatient() {
  const token = Cookies.get('@token');
  const refForm = useRef<any>();
  const [charCount, setCharCount] = useState(0);  // Estado para contar caracteres
  const charLimit = 255;  // Limite de caracteres para o campo de observações

  const handleObservationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);  // Atualiza a contagem de caracteres
  };

  const submitForm = useCallback((e: SyntheticEvent) => {
    e.preventDefault();

    if (refForm.current.checkValidity()) {
      const target = e.target as typeof e.target & {
        name: { value: string },
        doses: { value: number },
        recommended_age: { value: number },
        observation: { value: string },
        date_limit: { value: Date },
      };
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios.post<IVaccines>(
        "http://127.0.0.1:8000/api/vaccines",  // URL do endpoint
        {
          // Corpo da requisição (payload)
          name: target.name.value,
          doses: target.doses.value,
          recommended_age: target.recommended_age.value,
          observation: target.observation.value,
          date_limit: target.date_limit.value,
        },
        // Passando header para autorizar a rota
        header
      )
        .then(response => {
          // Manipule a resposta aqui
          console.log(response.data);
          // Usa o redirecionamento do próprio navegador
          window.location.href = '/vacinas';
        })
        .catch(error => {
          // Manipule os erros aqui
          console.error(error);
        });
    } else {
      refForm.current.classList.add('was-validated');
    }
  }, [token]);

  return (
    <LayoutDashboard>
      <h2 className="fw-bold mt-5">Nova Vacina</h2>
      <Card style={{ padding: '1rem', border: 'solid 1px #000' }}>
        <form
          className='needs-validation align-items-center'
          noValidate
          onSubmit={submitForm}
          ref={refForm}
        >
          <div className="row">
            <div className='col-md-6'>
              <label htmlFor='name' className='form-label'>
                Nome:
              </label>
              <input
                type='text'
                className='form-control'
                id='name'
                required
              />
              <div className='invalid-feedback'>
                Digite um nome:
              </div>
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
                className='form-control'
                id='observation'
                required
                placeholder="Digite curiosidades, informações sobre essa vacina:"
                onChange={handleObservationChange}  // Adiciona o evento onChange
                maxLength={charLimit}  // Limite de caracteres no campo
              ></textarea>
              <div className='invalid-feedback'>
                Insira uma observação:
              </div>
              <div className='text-muted' style={{ textAlign: 'right' }}>
                {charCount}/{charLimit} caracteres
              </div> {/* Mostra a contagem de caracteres */}
            </div>

            <div className='col-md-12 mt-3' style={{ textAlign: "right" }}>
              <Link
                className="btn btn-danger me-3"
                type='button'
                href={'/pacientes'}
                id='botao'
              >
                Cancelar
              </Link>

              <button
                className="btn btn-warning"
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

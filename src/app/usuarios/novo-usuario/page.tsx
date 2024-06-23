"use client";
import { IUser } from "@/app/interfaces/IUser";
import { LayoutDashboard } from "@/components/LayoutDashboard";
import axios from "axios";
import Cookies from 'js-cookie';
import Link from "next/link";
import { redirect } from "next/navigation";
import { setCookie } from "nookies";
import { SyntheticEvent, useCallback, useRef } from "react";
import { Card } from "react-bootstrap";
import InputMask from 'react-input-mask';

export default function Users() {

    const token = Cookies.get('@token');
    const refForm = useRef<any>();

    const submitForm = useCallback((e: SyntheticEvent) => {
        e.preventDefault();

        if (refForm.current.checkValidity()) {

            const target = e.target as typeof e.target & {
                name: { value: string },
                type_user: { value: number },
                email: { value: string },
                password: { value: string },
                cpf: { value: string },
            }

            //Pega o valor do cpf e remove os . e -
            const cleanCPF = (cpf: string) => cpf.replace(/[^\d]/g, '');
            //salva o valor formatodo na const cpf
            const cpf = cleanCPF(target.cpf.value);

            //const header 
            const header = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            axios.post<IUser[]>(
                "http://127.0.0.1:8000/api/users",  // URL do endpoint
                {
                    // Corpo da requisição (payload)
                    name: target.name.value,
                    type_user: target.type_user.value,
                    email: target.email.value,
                    password: target.password.value,
                    cpf: cpf,
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
            redirect('/usuarios')

        } else {
            refForm.current.classList.add('was-validated')

        }
    }, [])

    return (
        <LayoutDashboard
            token={token}
        >
            <h1>Novo Usuário</h1>
            <Card style={{ padding: '1rem', boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;', border: 'solid 1px #000' }}>
                <form
                    className='needs-validation align-items-center'
                    noValidate
                    onSubmit={submitForm}
                    ref={refForm}

                >
                    <p>Preencha os campos abaixo para criar um novo usuário</p>
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
                                htmlFor='email'
                                className='form-label'
                            >
                                Email:
                            </label>
                            <input
                                type='email'
                                className='form-control'
                                id='email'
                                required
                            />
                            <div
                                className='invalid-feedback'
                            >
                                Digite um email:
                            </div>
                        </div>
                        <div
                            className='col-md-4'
                        >
                            <label
                                htmlFor='type_user'
                                className='form-label'
                            >
                                Tipo de Usuário:
                            </label>
                            <select className="form-select" id="type_user">
                                <option value={0}>Profissional da Saúde</option>
                                <option value={1}>Cuidador / Familiar</option>
                                <option value={2}>Idoso / Paciente</option>
                            </select>
                            <div
                                className='invalid-feedback'
                            >
                                Digite um email:
                            </div>
                        </div>
                        <div
                            className='col-md-6'
                        >
                            <label
                                htmlFor='cpf'
                                className='form-label'
                            >
                                CPF:
                            </label>
                            <InputMask
                                mask='999.999.999-99'
                                className='form-control'
                                id='cpf'
                                required
                            />
                            <div
                                className='invalid-feedback'
                            >
                                Digite um CPF:
                            </div>
                        </div>
                        <div
                            className='col-md-6'
                        >
                            <label
                                htmlFor='password'
                                className='form-label'
                            >
                                Senha
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                id='password'
                                required
                            />
                            <div
                                className='invalid-feedback'
                            >
                                Digite sua senha:
                            </div>
                        </div>
                        <div
                            className='col-md-12 mt-3' style={{ textAlign: "right" }}
                        >
                            <Link
                                className="btn btn-danger me-3"
                                type='button'
                                href={'/usuarios'}
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

"use client"
import { SyntheticEvent, useCallback, useRef, useState } from 'react'
import styles from './style.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies'

export default function Login() {

    const router = useRouter()

    const refForm = useRef<any>();
    const [toast, setToast] = useState(false)
    const [loading, setLoading] = useState(false)
    // const [user, setUser] = useState<IUser>()

    const submitForm = useCallback((e: SyntheticEvent) => {
        e.preventDefault();

        if (refForm.current.checkValidity()) {
            setLoading(true)

            const target = e.target as typeof e.target & {
                email: { value: string },
                cpf: { value: string },
            }

            axios.post('http://127.0.0.1:8000/api/login',
                {
                    email: target.email.value,
                    cpf: target.cpf.value,
                }
            )
                .then((res) => {
                    setCookie(undefined, '@user', JSON.stringify(res.data.user))
                    setCookie(undefined, '@token', res.data.token)
                    router.push('/dashboard')
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setToast(true)
                    setLoading(false)

                })

        } else {
            refForm.current.classList.add('was-validated')
        }

    }, [])

    return (
        <>

            <div
                className={styles.main}
            >
                <div
                    className={styles.border}
                >
                    <div
                        className='d-flex flex-column align-items-center'
                    >
                        <h1 className='text-primary' >Login</h1>
                        <p
                            className='text-secondary'
                        >
                            Preencha os campos para logar no sistema!
                        </p>
                    </div>
                    <hr />
                    <form
                        className='needs-validation align-items-center'
                        noValidate
                        onSubmit={submitForm}
                        ref={refForm}
                    >
                        <div
                            className='col-md-12'
                        >
                            <label
                                htmlFor='email'
                                className='form-label'
                            >
                                Email
                            </label>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Digite seu email'
                                id='email'
                                required
                            />
                            <div
                                className='invalid-feedback'
                            >
                                Por favor digite seu email
                            </div>
                        </div>
                        <div
                            className='col-md-12 mt-1'
                        >
                            <label
                                htmlFor='cpf'
                                className='form-label'
                            >
                                Senha
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Digite sua senha'
                                id='cpf'
                                required
                            />
                            <div
                                className='invalid-feedback'
                            >
                                Por favor digite sua senha
                            </div>
                        </div>
                        <div
                            className='col-md-12 mt-3'
                        >
                            <button
                                className='btn btn-primary w-100'
                                type='submit'
                                id='botao'
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
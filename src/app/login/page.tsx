"use client"
import { SyntheticEvent, useCallback, useRef, useState } from 'react'
import styles from './style.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import Card from 'react-bootstrap/Card';
import InputMask from 'react-input-mask';
import { Loading } from '@/components/Loading';
import { Toast } from '@/components/Toast';
import { IUser } from '../interfaces/IUser';

export default function Login() {

    const router = useRouter()

    const refForm = useRef<any>();
    const [toast, setToast] = useState(false)
    const [loading, setLoading] = useState(false)
    //const [user, setUser] = useState<IUser>()

    const submitForm = useCallback((e: SyntheticEvent) => {
        e.preventDefault();

        if (refForm.current.checkValidity()) {
            setLoading(true)

            const target = e.target as typeof e.target & {
                password: { value: string },
                cpf: { value: string },
            }
            //Pega o valor do cpf e remove os . e -
            const cleanCPF = (cpf: string) => cpf.replace(/[^\d]/g, '');
            //salva o valor formatodo na const cpf
            const cpf = cleanCPF(target.cpf.value);

            axios.post('http://127.0.0.1:8000/api/login',
                {
                    password: target.password.value,
                    //cpf é igual a const cpf formatada
                    cpf: cpf,
                }
            ).then((res) => {
                const user = res.data.user
                if (user.type_user !== 0) {
                    setToast(true)
                    setLoading(false)
                    return
                }
                setCookie(undefined, '@user', JSON.stringify(user))
                setCookie(undefined, '@token', res.data.token)
                router.push('/dashboard')
                setLoading(false)
            }).catch((err) => {
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
            <Loading loading={loading} />
            <Toast
                show={toast}
                message='Usuário não encontrado'
                colors='danger'
                onClose={() => { setToast(false) }}
            />
            <div className='container'>
                <div className={styles.div_pai}>
                    <Card style={{ width: '100%', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px', }}>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='div_img'>
                                    <img className={styles.img_login} src='/imagens/vacina_back.jpg' alt='Imagem de Login' />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className={styles.div_filho}>

                                    <form
                                        className='needs-validation align-items-center'
                                        noValidate
                                        onSubmit={submitForm}
                                        ref={refForm}
                                    >
                                        <h1 className={styles.title}>ImuneBem</h1>
                                        <h3 className={styles.title_login} >Login</h3>
                                        <p>Digite os campos abaixo para entrar no painel</p>
                                        <div
                                            className='col-md-12'
                                        >
                                            <label
                                                htmlFor='email'
                                                className='form-label'
                                            >
                                                CPF
                                            </label>
                                            <InputMask
                                                mask='999.999.999-99'
                                                className='form-control'
                                                placeholder='Digite seu CPF:'
                                                id='cpf'
                                                required
                                            />
                                            <div
                                                className='invalid-feedback'
                                            >
                                                Digite seu CPF:
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
                                                placeholder='Digite sua senha:'
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
                                            className='col-md-12 mt-3'
                                        >
                                            <button
                                                className={styles.btn_log}
                                                type='submit'
                                                id='botao'
                                            >
                                                Enviar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}
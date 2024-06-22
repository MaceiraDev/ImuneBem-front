import router from "next/router";
import style from "./style.module.css"
import Link from "next/link";

interface IProps {
    titulo: string,
    rota: string,
}

export const BotaoCadastro = (props: IProps) => {
    return (
        <>
            <Link
                href={props.rota}
                className={style.botao_cadastro}
                type="button"
            >
                {props.titulo}
            </Link>


        </>
    )
}
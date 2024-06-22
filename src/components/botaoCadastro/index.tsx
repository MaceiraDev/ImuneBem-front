import style from "./style.module.css"

interface IProps{
    titulo: string,

}

export const BotaoCadastro = (props: IProps) => {
    return (
        <>
            <button
                    className={style.botao_cadastro}
                    type="button"
                >
                    {props.titulo}
                </button>

        
        </>
    )
}
import Link from "next/link";
import Cookies from "js-cookie";

interface IProps {
  titulo: string,
}

function logout() {
  Cookies.remove('@token')
}

export const LogoutButton = (props: IProps) => {
  return (
    <>
      <Link
        href='/login'
        className='btn btn-dark'
        type="button"
      >
        {props.titulo}
      </Link>


    </>
  )
}
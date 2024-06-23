// components/LogoutButton.tsx
'use client';

import Cookies from "js-cookie";

interface IProps {
  titulo: string,
}

function logout() {
  Cookies.get('@token');
  window.location.href = '/';
}

export const LogoutButton = (props: IProps) => {
  return (
    <button
      onClick={logout}
      className='btn btn-dark'
      type="button"
    >
      {props.titulo}
    </button>
  )
}

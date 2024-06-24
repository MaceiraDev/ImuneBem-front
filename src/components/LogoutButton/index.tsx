// components/LogoutButton.tsx
'use client';

import Cookies from "js-cookie";

interface IProps {
  titulo: string,
}

function logout() {
  if (confirm('Deseja realmente sair?')) {
    Cookies.remove('@token');
    window.location.href = '/';
  }
}

export const LogoutButton = (props: IProps) => {
  return (
    <button
      onClick={logout}
      className='btn btn-dark'
      type="button"
    >
      {props.titulo}<i className="bi bi-door-open ml-3"></i>
    </button>
  )
}

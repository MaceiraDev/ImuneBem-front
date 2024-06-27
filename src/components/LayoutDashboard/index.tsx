import { ReactNode } from 'react';
import { LogoutButton } from '../LogoutButton';

interface IProps {
  children: ReactNode;
}

export const LayoutDashboard = (props: IProps) => {
  return (
    <>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
          Painel ImuneBem
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="w-100"></div>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <LogoutButton titulo={'Sair'} />
          </div>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className={`nav-link`} href={'/dashboard'}>
                    <span data-feather="home"></span>
                    Dashboard <i className="bi bi-house"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link`} href={'/agendamentos'}>
                    <span data-feather="home"></span>
                    Agendamentos <i className="bi bi-clipboard2-data"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link`} href={'/vacinas'}>
                    <span data-feather="home"></span>
                    Vacinas <i className="bi bi-heart-pulse"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link`} href={'/pacientes'}>
                    <span data-feather="home"></span>
                    Pacientes <i className="bi bi-person-raised-hand"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link`} href={'/cuidadores-familiares'}>
                    <span data-feather="home"></span>
                    Cuidadores / Familiares <i className="bi bi-person-arms-up"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link`} href={'/status'}>
                    <span data-feather="home"></span>
                    Status <i className="bi bi-asterisk"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link`} href={'/usuarios'}>
                    <span data-feather="home"></span>
                    Usuários <i className="bi bi-person-circle"></i>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {props.children}
          </main>
        </div>
      </div>
    </>
  );
};

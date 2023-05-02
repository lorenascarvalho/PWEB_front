import { NavLink } from 'react-router-dom';
import { useUserAuth } from '../../contexts/auth';
import styles from './Navbar.module.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../../css/style.css";

export default function Header() {

    const { user, logOut } = useUserAuth();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
          localStorage.clear();
          await logOut();
          navigate('/');
        } catch(error) {
          toast('Ocorreu um erro ao tentar deslogar!');
        }
      }

    return (
        <nav className={styles.navbar}>
            <NavLink className={styles.brand} to="/">
                Sistema de <span>Chamados</span>
            </NavLink>
            <ul className={styles.links_list}>
                <li>
                    <NavLink to="/chamados">
                        Chamados
                    </NavLink>
                </li>


                <li>
                    <NavLink to="/clientes">
                        Clientes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/perfil">
                        Configurações
                    </NavLink>
                </li>
                {user && (
                    <li>
                        <button className={styles.botaoSair} onClick={handleLogout}>Sair</button>
                    </li>
                )}
            </ul>
        </nav >
    );
}
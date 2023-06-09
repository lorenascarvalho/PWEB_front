import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';
import { useUserAuth } from '../../contexts/auth';
import styles from './Login.module.css';

export default function Login() {

  const email = useRef();
  const senha = useRef();

  const [error, setError] = useState();

  const { signIn } = useUserAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const user = {
      email: localStorage.getItem('user-email'),
      senha: localStorage.getItem('user-senha'),
    };
    if (user.email && user.senha) {
      email.current.value = user.email;
      senha.current.value = user.senha;
      makeSignIn();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    makeSignIn();
    localStorage.setItem('user-email', email.current.value);
    localStorage.setItem('user-senha', senha.current.value);
  }

  const makeSignIn = async () => {
    try {
      await signIn(email.current.value, senha.current.value);
      navigate('/chamados');

    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found': setError('Usuário não encontrado!');
          break;

        case 'auth/wrong-password': setError('Senha incorreta!');
          break;

        case 'auth/invalid-email': setError('E-mail inválido!');
          break;

        default: setError('Ocorreu um erro desconhecido!');
          break;
      }
    }
  }

  return (
    <body className={styles.bodyLogin}>


      <div>
        <div className={styles.brand}>Sistema de <span>Chamados</span></div>
        <form className={styles.boxLogin}>
          <div class="alert alert-primary" role="alert">
            Acesse aqui com o seu login e senha:
          </div>
          <input className="form-control mt-4" type="text" placeholder="email@email.com" ref={email} />
          <input className="form-control mt-3" type="password" placeholder="*****" ref={senha} />
          <button className='btn btn-success mt-5' type="submit" onClick={handleSubmit}>Acessar</button>
          <p style={{ display: error ? "block" : "none" }}>{error}</p>
        </form>
      </div>
      <div className='text-center mt-5' style={{ position: "relative", top: "70px" }}>
        <Link to="/cadastro" className='btn btn-outline-light'>Criar uma conta!</Link>
      </div>
    </body>
  );
}

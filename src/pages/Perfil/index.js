import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Title from '../../components/Title';
import { FiSettings, FiUpload } from 'react-icons/fi';
import { useUserAuth } from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';
import './Perfil.module.css';

export default function Profile() {

  const { user, logOut } = useUserAuth();

  const [nome, setNome] = useState();
  const [email, setEmail] = useState();


  const navigate = useNavigate();

  useEffect(() => {

    setEmail(user.email);
    fetchUsuario(user.uid);

  }, []);

  async function fetchUsuario(uid) {
    api.get(`/usuarios/${uid}`)
      .then(response => {

        setNome(response.data.nome);



      });
  }



  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('uid', user.uid);
    formData.append('nome', nome);

    api.put(`/usuarios/${user.uid}`, formData)
      .then(_ => {
        toast('Usuário atualizado com sucesso!');

      })
      .catch(_ => toast('Erro ao atualizar o usuário!'));
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      localStorage.clear();
      await logOut();
      navigate('/');
    } catch (error) {
      toast('Ocorreu um erro ao tentar deslogar!');
    }
  }

  return (
    <div>
      <Header />

      <div className="container">
        <Title nome="Meu perfil">
          <FiSettings size={25} />
        </Title>


        <div className="container">
          <form onSubmit={(e) => handleSave(e)} className="form-profile">

            <div className="row">
              <div className="col-md-6">
                <label>Nome</label>
                <input className="form-control" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label>Email</label>
                <input className="form-control" type="text" value={email} disabled={true} />
              </div>
            </div>
            <button className="btn btn-success mt-5" type="submit">Salvar</button>
          </form>
        </div>

        <div className="container mt-5">
          <button className="btn btn-danger" onClick={handleLogout}>
            Sair
          </button>
        </div>

      </div>
      <Footer />
    </div>
  )
}

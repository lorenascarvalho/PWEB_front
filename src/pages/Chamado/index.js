import styles from './Chamado.module.css';
import { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Title from '../../components/Title';
import { FiPlus, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import EditarChamado from './EditarChamado';
import { formataStatus } from '../../utils/utils';
import { useUserAuth } from '../../contexts/auth';

export default function Chamado() {

  const { user } = useUserAuth();

  const [chamados, setChamados] = useState([]);

  const [openEditar,  setOpenEditar]   = useState(false);
  const [chamadoId, setChamadoId]      = useState();

  useEffect(() => { 
    
    getChamados();
    loadChamados();
  }, [ chamados ]);

  async function getChamados () {

    let response;

    try {
      response = await api.get(`/chamados/usuarios/${user.uid}`);
    } catch (error) {
      console.error(error);
    }

    if(response.data) {
      setChamados(response.data);
    }

  }

  async function loadChamados() {
    api
      .get('/chamados')
      .then(response => setChamados(response.data));
  }
  
 

  const editar = (id) => {
    setOpenEditar(true);
    setChamadoId(id);
  }

  return(
    <div>
      {/* { openDetalhe && <DetalheChamado setOpenModal={ setOpenDetalhar } chamadoId={ chamadoId } user={ user }/>} */}
      { openEditar  && <EditarChamado  setOpenModal={ setOpenEditar  } chamadoId={ chamadoId } user={ user }/>}
      <Header/>

      <div className="container">
        <Title nome="Atendimentos">
        </Title>
        { chamados.length === 0 ? (
          <div className="">
            <div style={{marginBottom: "50px", border: "1px solid rgb(0 0 0 / 9%)", borderRadius: "5px", display: "inline-block", padding: "8px 18px"}}>Nenhum chamado encontrado!</div>
            <Link to="/novochamado" className={styles.botaoNovoChamado}>
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>
          </div>
          ) : (
          <>
            <Link to="/novochamado" className={styles.botaoNovoChamado}>
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>

            <table className='table'>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                {chamados.map((chamado, index) => {
                  return (
                    <tr key={ index }>
                      <td data-label="Cliente">{ chamado.cliente.nome }</td>
                      <td data-label="Assunto">{ chamado.assunto }</td>
                      <td data-label="Status">
                        <span 
                          className="badge"
                          style={
                            chamado.status === 'ABERTO' ? 
                            { backgroundColor: '#bf2d17' } : 
                            chamado.status === 'ANDAMENTO' ? 
                            { backgroundColor: '#c2b43c' } : 
                            { backgroundColor: '#5cb85c'} 
                          }
                        >
                          { formataStatus(chamado.status) }
                        </span>
                      </td>
                      <td data-label="Cadastrado">{ chamado.dataCadastro }</td>
                      <td data-label="#">
                        <button className="btnEditar"
                        onClick={ () => { editar(chamado.id) } }
                          style={{backgroundColor: '#ff9d23', border: 'none', padding: '5px 7px', borderRadius:"5px" }}
                        >
                          <FiEdit2 color="#FFF" size={17} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        )}

      </div>
      <Footer style={{marginTop: "350px"}}/>
    </div>
  )
}
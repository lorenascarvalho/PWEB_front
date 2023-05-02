import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import styles from './Modal.module.css';

export default function EditarChamado({ setOpenModal, chamadoId, user }) {

  const [clientes, setClientes] = useState([]);
  const [loadingClientes, setLoadingClientes] = useState(true);

  const [idCliente, setIdCliente] = useState();
  const [assunto, setAssunto] = useState();
  const [status, setStatus] = useState();


  useEffect(() => {
    loadChamado();
    loadClientes();
  }, []);

  async function loadChamado() {
    api
      .get(`/chamados/${chamadoId}`)
      .then(response => {
        setIdCliente(response.data.cliente.id);
        setAssunto(response.data.assunto);
        setStatus(response.data.status);
      });
  }
  async function loadClientes() {
    api
      .get('/clientes')
      .then(response => {
        setClientes(response.data);
        setLoadingClientes(false);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    updateChamado();
    setOpenModal(false);
  }

  async function updateChamado() {
    let response;

    try {
      response = api.put(`/chamados/${chamadoId}`, {
        clienteId: chamadoId,
        assunto: assunto,
        status: status,
      });

    } catch (error) {
      toast('Erro ao atualizar o chamado!');
    }

    if (response.data) {
      toast('Chamado atualizado com sucesso!');
    }
  }

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtnFechar}>
          <button onClick={() => setOpenModal(false)}>
            X
          </button>
        </div>
        <div>
          <h1 style={{ position: "relative", top: "-20px" }}>Editar Chamado</h1>
        </div>
        <div>


          <div className='row'>
            <div className='col-md-6'>
              <label>Cliente</label>
              {loadingClientes ?
                <input type="text" value="Carregando..." />
                : <select className='form-select' value={idCliente} onChange={(e) => setIdCliente(e.target.value)}>
                  {clientes.map(item => {
                    return (<option key={item.id} value={item.id}>{item.nome}</option>);
                  })}
                </select>
              }
            </div>
            <div className='col-md-6'>
              <label>Assunto</label>
              <select className='form-select' value={assunto} onChange={(e) => setAssunto(e.target.value)}>
                <option value="SUPORTE">Suporte</option>
                <option value="FINANCEIRO">Financeiro</option>
                <option value="RECLAMACAO">Reclamacao</option>
                <option value="DESENVOLVIMENTO">Desenvolvimento</option>
              </select>
            </div>
          </div>
          <label>Status</label>
          <div className={styles.containerCheckRadio}>
            <div className="form-check">
              <input className='form-check-input spacingTopNegativo' id="flexRadioDefault1"
                type="radio"
                name="radio"
                value="ABERTO"
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "ABERTO"} />
              <span>Em Aberto</span>
            </div>
            <div className="form-check">
              <input className='form-check-input' id="flexRadioDefault2"
                type="radio"
                name="radio"
                value="PENDENTE"
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "PENDENTE"} />
              <span>Pendente</span>
            </div>
            <div className="form-check">
              <input className='form-check-input' id="flexRadioDefault3"
                type="radio"
                name="radio"
                value="DESCONHECIDO"
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "DESCONHECIDO"} />
              <span>Desconhecido</span>
            </div>

            <div className="form-check">
              <input className='form-check-input' id="flexRadioDefault4"
                type="radio"
                name="radio"
                value="SUSPENSO"
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "SUSPENSO"} />
              <span>Suspenso</span>
            </div>
            <div className="form-check">
              <input className='form-check-input' id="flexRadioDefault5"
                type="radio"
                name="radio"
                value="FECHADO"
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "FECHADO"} />
              <span>Fechado</span>
            </div>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-md-2'>
            <button className='btn btn-success' onClick={handleSubmit}>Confirmar</button>
          </div>
          <div className='col-md-2'>
            <button className='btn btn-danger' onClick={() => setOpenModal(false)} >Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

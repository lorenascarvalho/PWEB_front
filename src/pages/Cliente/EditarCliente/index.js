import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import styles from './Modal.module.css';


function EditCostumer({ setOpenModal, clienteId, user }) {

  const nome = useRef();
  const cnpj = useRef();
  const endereco = useRef();


  useEffect(() => {
    loadCliente();
  }, []);

  async function loadCliente() {
    api
      .get(`/clientes/${clienteId}`)
      .then(response => {
        nome.current.value = response.data.nome;
        cnpj.current.value = response.data.cnpj;
        endereco.current.value = response.data.endereco;
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    updateCliente();

    setOpenModal(false);
  }

  const updateCliente = async () => {
    let response;

    try {
      response = api.put(`clientes/${clienteId}`, {
        nome: nome.current.value,
        usuarioId: user.uid,
        cnpj: cnpj.current.value,
        endereco: endereco.current.value,
      });

    } catch (error) {
      toast('Erro ao atualizar o cliente!');
    }

    if (response.data) {
      toast('Cliente atualizado com sucesso!');
    }
  }

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtnFechar}>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>

        <h1>Editar Cliente</h1>
        <div className='row'>
          <form>
            <div className='col-md-12'>
              <label>Nome</label>
              <input className="form-control" ref={nome} placeholder="Digite o Nome Fantasia" type="text" />
            </div>
            <div className='col-md-12 mt-2'>
              <label>CNPJ</label>
              <input className="form-control" ref={cnpj} placeholder="Digite o CNPJ" type="text" />
            </div>
            <div className='col-md-12 mt-2'>
              <label>Endereço</label>
              <input className="form-control" ref={endereco} placeholder="Digite o seu Endereço" type="text" />
            </div>
          </form>
        </div>
        <div className="row mt-5 mt-2">
          <div className="col-md-4">
            <button className='btn btn-success' onClick={handleSubmit}>Confirmar</button>
          </div>
          <div className="col-md-4">
            <button className='btn btn-danger' onClick={() => { setOpenModal(false) }} id="cancelBtn">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default EditCostumer;

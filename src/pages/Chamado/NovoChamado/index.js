import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Title from '../../../components/Title';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import styles from './NovoChamado.module.css';

export default function New() {

    const [clientes, setClienteList] = useState([]);
    const [loadingClientes, setLoadingClientes] = useState(true);

    const [cliente, setCliente] = useState();
    const [assunto, setAssunto] = useState('SUPORTE');
    const [status, setStatus] = useState('ABERTO');

    const navigate = useNavigate();

    useEffect(() => {
        async function loadClientes() {
            api.get('/clientes').then(response => {
                setClienteList(response.data);
                setCliente(response.data[0].id);
                setLoadingClientes(false);
            });
        }
        loadClientes();
    }, []);

    async function handleChamado(e) {
        e.preventDefault();
        api
            .post('/chamados', {
                clienteId: cliente,
                assunto: assunto,
                status: status,
            })
            .then(_ => {
                toast('Chamado cadastrado com sucesso!')
            })
            .catch(_ => toast('Erro ao cadastrar o chamado!'));


    }

    return (
        <div>
            <Header />


            <Title nome="Novo chamado">
            </Title>

            <div className="container">
                <form onSubmit={(e) => { handleChamado(e) }} className="form-profile">
                    <label>Cliente</label>
                    {loadingClientes ?
                        <input type="text" value="Carregando..." />
                        : <select className='form-select' value={cliente} onChange={(e) => setCliente(e.target.value)}>
                            {clientes.map(item => {
                                return (<option key={item.id} value={item.id}>{item.nome}</option>);
                            })}
                        </select>
                    }

                    <label>Assunto</label>
                    <select className='form-select' value={assunto} onChange={(e) => setAssunto(e.target.value)}>
                        <option value="SUPORTE">Suporte</option>
                        <option value="DESENVOLVIMENTO">Desenvolvimento</option>
                        <option value="FINANCEIRO">Financeiro</option>
                        <option value="RECLAMACAO">Reclamação</option>
                    </select>

                    <label>Status</label>
                    <div className={styles.containerCheckRadio}>
                        <div className="form-check">
                            <input className='form-check-input'
                                id="flexRadioDefault1"
                                type="radio"
                                name="flexRadioDefault"
                                value="ABERTO"
                                onChange={(e) => setStatus(e.target.value)}
                                checked={status === "ABERTO"} />
                            <span class="form-check-label" for="flexRadioDefault1">Em Aberto</span>
                        </div>
                        <div className="form-check">
                            <input className='form-check-input'
                                id="flexRadioDefault2"
                                type="radio"
                                name="radio"
                                value="PENDENTE"
                                onChange={(e) => setStatus(e.target.value)}
                                checked={status === "PENDENTE"} />
                            <span class="form-check-label" for="flexRadioDefault2">Pendente</span>
                        </div>
                        <div className="form-check">
                            <input className='form-check-input'
                                id="flexRadioDefault3"
                                type="radio"
                                name="radio"
                                value="SUSPENSO"
                                onChange={(e) => setStatus(e.target.value)}
                                checked={status === "SUSPENSO"} />
                            <span class="form-check-label" for="flexRadioDefault3">Suspenso</span>
                        </div>
                        <div className="form-check">
                            <input className='form-check-input'
                                id="flexRadioDefault4"
                                type="radio"
                                name="radio"
                                value="DESCONHECIDO"
                                onChange={(e) => setStatus(e.target.value)}
                                checked={status === "DESCONHECIDO"} />
                            <span class="form-check-label" for="flexRadioDefault4">Desconhecido</span>
                        </div>
                        <div className="form-check">
                            <input className='form-check-input'
                                id="flexRadioDefault5"
                                type="radio"
                                name="radio"
                                value="FECHADO"
                                onChange={(e) => setStatus(e.target.value)}
                                checked={status === "FECHADO"} />
                            <span class="form-check-label" for="flexRadioDefault5">Fechado</span>
                        </div>
                    </div>

                    <button type="submit" className='btn btn-success mt-4 mb-4'>Registrar</button>
                </form>

            </div>
                    <Footer/>
        </div>

    );
}

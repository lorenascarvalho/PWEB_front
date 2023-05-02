import error from '../../assets/error-404.png';
import './NaoEncontrado.module.css';

export default function NaoEncontrado() {
    return (
        <div className='container text-center'>
            <img className='iconError mt-5' src={error} />
            <h2 className='mt-5'>Erro 404</h2>
            <h3>Página não encontrada!</h3>
        </div>
    );
}

import './title.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function Title({ nome}) {

    return (
      <div className='container'>
      <h1>
        {nome}
      </h1>
      </div>
    );
  }
  
  export default Title;
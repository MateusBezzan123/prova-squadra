import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';
import * as Yup from 'yup';
import './styles.css';

const schema = Yup.object().shape({
  email: Yup.string().email('Insira um email valido'),
  company: Yup.string().required('Dados obrigatórios não informados.'),
  initails: Yup.string().required('Dados obrigatórios não informados.'),
})

export default function New({ history }) {
  const [thumbnail, setThumbnail] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [initails, setInitails] = useState('');
  

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('email', email);
    data.append('description', description);
    data.append('initails', initails);

    await api.post('/spots', data, {
      headers: { user_id }
    })

    history.push('/dashboard');
  }

  return (
    <form schema={schema} onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>

      <label htmlFor="description">Descrição * </label>
      <input
        id="description"
        placeholder="Descrição do sistema"
        value={description}
        onChange={event => setDescription(event.target.value)}
      /> 

      <label htmlFor="initails">Sigla * </label>
      <input
        id="initails"
        placeholder="Sigla do sistema "
        value={initails}
        onChange={event => setInitails(event.target.value)}
      />

      <label htmlFor="email">E-mail de atendimento do sistema</label>
      <input
        id="email"
        placeholder="E-mail de atendimento do sistema"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />

      <label htmlFor="company">URL</label>
      <input
        id="company"
        placeholder="URL de acesso ao sistema"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />
      <button type="submit" className="btn">Cadastrar</button>
    </form>
  )
}
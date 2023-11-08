import axios from 'axios';

const instance = axios.create({ baseURL: 'http://192.168.100.66:3001' });

export const getUsuarios = async () => {
    return instance.get('/usuarios');
};

export const getUsuario = async (id) => {
    return instance.get(`/usuarios/${id}`);
};

export const postUsuario = async (data) => {
    return instance.post('/usuarios', data);
}

export const updateUsuario = async (id, data) => {
    const dados = {
        nome : data.nome,
        email: data.email,
        senha: data.senha
    };
    
    return instance.put(`/usuarios/${id}`, dados);
}

export const deleteUsuario = async (id) => {
    return instance.delete(`/usuarios/${id}`);
}
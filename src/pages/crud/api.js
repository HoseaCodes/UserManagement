import axios from 'axios';

// const usersUrl = 'http://localhost:3003/users';
// const usersUrl = "http://localhost:4000/user";
const usersUrl = "https://storm-gate.net/api/user";

export const getUsers = async (id) => {
    id = id || '';
    return await axios.get(`${usersUrl}/users`);
}

export const getUser = async (id) => {
    id = id || '';
    return await axios.get(`${usersUrl}/${id}`);
}


export const addUser = async (user) => {
    return await axios.post(`${usersUrl}/add`, user);
}

export const deleteUser = async (id) => {
    return await axios.delete(`${usersUrl}/${id}`);
}

export const editUser = async (id, user) => {
    return await axios.put(`${usersUrl}/${id}`, user)
}
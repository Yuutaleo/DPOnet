import React, { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import './style.css'
import { Link } from "react-router-dom";

function Registro() {
    const [users, setUsers] = useState([]);
    const [mostrarLista, setMostrarLista] = useState(false);
    async function getUsers() {
        const usersFromApi = await api.get('/users');
        setUsers(usersFromApi.data);
    }
    async function deleteUsers(id) {
        await api.delete(`/users/${id}`);
        getUsers();
        alert('Usuário deletado com Sucesso!');
    }
    async function revogarConsentimento(userId, finalidadeId) {
        try {
            await api.put('/consentimentos/revogar', {
                userId,
                finalidadeId
            });
            getUsers();
            alert('Consentimento revogado com sucesso!');
        } catch (error) {
            console.error("Erro ao revogar consentimento:", error);
            alert("Erro ao revogar consentimento.");
        }
    }
    return (
        <div>
            <h1>Tela de Registros</h1>
            <button
                onClick={() => {
                    const novoEstado = !mostrarLista;
                    setMostrarLista(novoEstado);
                    if (novoEstado) {
                        getUsers();
                    }
                }}
                className="botao"
            >
                {mostrarLista ? "Ocultar Lista" : "Mostrar Lista de Usuários"}
            </button>
            {mostrarLista && (
                <table className="tabela-usuarios">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Email</th>
                            <th>Consentimento</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.consent && user.consent.length > 0 ? (
                                        user.consent.map(consent => (
                                            <div key={consent.id}>
                                                <p>Finalidade: {consent.finalidade?.title || "Sem título"}</p>
                                                <p>Data: {new Date(consent.consent_date).toLocaleDateString()}</p>
                                                <p>Status: {consent.revoked ? "Revogado" : "Ativo"}</p>
                                                {!consent.revoked && (
                                                    <button className="botao-revogar" onClick={() => revogarConsentimento(user.id, consent.finalidadeId)}>
                                                        Revogar
                                                    </button>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>Sem consentimento</p>
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => deleteUsers(user.id)}>Deletar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div>
                <Link to="/Consentimentos" >
                    <button type="button" className="botao2">Gerenciar Finalidades e Consentimentos</button>
                </Link>
            </div>
        </div>
    );
}
export default Registro;

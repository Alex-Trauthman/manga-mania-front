package br.unitins.topicos1.service;

import java.util.List;

import br.unitins.topicos1.dto.ClienteDTO;
import br.unitins.topicos1.dto.ClienteResponseDTO;
import jakarta.validation.Valid;

public interface ClienteService {
    public ClienteResponseDTO create(@Valid ClienteDTO usuarioDto);
    public void update(Long id, ClienteDTO dto);
    public void deleteById(Long id);
    public ClienteResponseDTO findById(Long id);
    public List<ClienteResponseDTO> findAll();
    public List<ClienteResponseDTO> findByNome(String nome);
    public List<ClienteResponseDTO> findByEmail(String email);
    public List<ClienteResponseDTO> findByCpf(String cpf);
    public List<ClienteResponseDTO> findByEndereco(String endereco);
    public ClienteResponseDTO login(String username, String senha);
}
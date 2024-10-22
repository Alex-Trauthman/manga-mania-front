package br.unitins.topicos1.service;

import java.util.List;

import br.unitins.topicos1.dto.EditoraDTO;
import br.unitins.topicos1.dto.ClienteResponseDTO;
import jakarta.validation.Valid;

public interface EditoraService {
    public ClienteResponseDTO create(@Valid EditoraDTO usuarioDto);
    public void update(Long id, EditoraDTO dto);
    public void deleteById(Long id);
    public ClienteResponseDTO findById(Long id);
    public List<ClienteResponseDTO> findAll();
    public List<ClienteResponseDTO> findByNome(String nome);
    public List<ClienteResponseDTO> findByEmail(String email);
    public List<ClienteResponseDTO> findByEndereco(String endereco);
}
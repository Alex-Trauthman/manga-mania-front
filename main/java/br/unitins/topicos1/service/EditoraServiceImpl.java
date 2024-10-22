package br.unitins.topicos1.service;

import java.util.List;

import br.unitins.topicos1.dto.EditoraDTO;
import br.unitins.topicos1.dto.ClienteResponseDTO;
import br.unitins.topicos1.model.Cliente;
import br.unitins.topicos1.repository.ClienteRepository;
import br.unitins.topicos1.validation.ValidationException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

@ApplicationScoped
public class EditoraServiceImpl implements EditoraService {
    @Inject
    public ClienteRepository usuarioRepository;

    @Override
    @Transactional
    public ClienteResponseDTO create(@Valid EditoraDTO userDto) {
        Cliente userBanco = new Cliente();
        userBanco.setNome(userDto.nome());
        userBanco.setEmail(userDto.email());
        userBanco.setEndereco(userDto.endereco());
        usuarioRepository.persist(userBanco);
        return ClienteResponseDTO.valueOf(userBanco);
    }

    @Override
    @Transactional
    public void update(Long id, EditoraDTO userDto) {
        Cliente userBanco = usuarioRepository.findById(id);
        if (userBanco == null) {
            throw new ValidationException("id", "Usuário não existe.");
        }
        userBanco.setNome(userDto.nome());
        userBanco.setEmail(userDto.email());
        userBanco.setEndereco(userDto.endereco());
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public List<ClienteResponseDTO> findAll() {
        return usuarioRepository.listAll().stream().map(e -> ClienteResponseDTO.valueOf(e)).toList();
    }

    @Override
    public ClienteResponseDTO findById(@PathParam("id") Long id) {
        Cliente user = usuarioRepository.findById(id);
        if (user == null) {
            return null;
        }
        return ClienteResponseDTO.valueOf(user);
    }

    @Override
    @Path("/search/nome/{nome}")
    public List<ClienteResponseDTO> findByNome(@PathParam("nome") String nome) {
        return usuarioRepository.findByNome(nome).stream().map(e -> ClienteResponseDTO.valueOf(e)).toList();
    }

    @Override
    @Path("/search/email/{email}")
    public List<ClienteResponseDTO> findByEmail(@PathParam("email") String email) {
        return usuarioRepository.findByEmail(email).stream().map(e -> ClienteResponseDTO.valueOf(e)).toList();
    }

    @Override
    @Path("/search/endereco/{content}")
    public List<ClienteResponseDTO> findByEndereco(@PathParam("content") String content) {
        return usuarioRepository.findByEndereco(content).stream().map(e -> ClienteResponseDTO.valueOf(e)).toList();
    }
}
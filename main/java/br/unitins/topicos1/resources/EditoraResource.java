package br.unitins.topicos1.resources;

import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.logging.Logger;

import br.unitins.topicos1.dto.EditoraDTO;
import br.unitins.topicos1.dto.ClienteResponseDTO;
import br.unitins.topicos1.service.EditoraService;
import br.unitins.topicos1.validation.BeanValidationExceptionMapper;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

@Path("/editora")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EditoraResource {
    @Inject
    public JsonWebToken jwt;

    @Inject
    public EditoraService usuarioService;

    private static final Logger LOG = Logger.getLogger(BeanValidationExceptionMapper.class);

    @GET
    public Response findAll() {
        LOG.info("Listando todos os usuários.");
        return Response.ok(usuarioService.findAll()).build();
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id) {
        LOG.info("Pesquisando usuário por Id.");
        ClienteResponseDTO user = usuarioService.findById(id);
        if (user == null) {
            return Response.status(Status.NOT_FOUND).build();
        }
        return Response.ok(user).build();
    }

    @GET
    @Path("/search/nome/{nome}")
    public Response findByNome(@PathParam("nome") String nome) {
        LOG.info("Pesquisando usuário por nome.");
        return Response.ok(usuarioService.findByNome(nome)).build();
    }

    @GET
    @Path("/search/email/{email}")
    public Response findByEmail(@PathParam("email") String email) {
        LOG.info("Pesquisando usuário por email.");
        return Response.ok(usuarioService.findByEmail(email)).build();
    }

    @GET
    @Path("/search/endereco/{endereco}")
    public Response findByEndereco(@PathParam("endereco") String endereco) {
        LOG.info("Pesquisando usuário por endereço.");
        return Response.ok(usuarioService.findByEndereco(endereco)).build();
    }

    @POST
    @Path("/create")
    @Transactional
    public Response create(EditoraDTO userDto) {
        LOG.info("Criando usuário.");
        LOG.debugf("DTO: %s", userDto);
        return Response.status(Status.CREATED).entity(usuarioService.create(userDto)).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, EditoraDTO userDto) {
        LOG.info("Atualizando usuário.");
        LOG.debugf("DTO: %s", userDto);
        ClienteResponseDTO usuarioBanco = usuarioService.findById(id);
        if (usuarioBanco == null)
            return Response.status(Status.NOT_FOUND).build();
        usuarioService.update(id, userDto);
        return Response.status(Status.NO_CONTENT).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteById(@PathParam("id") Long id) {
        LOG.info("Deletando usuário.");
        usuarioService.deleteById(id);
        return Response.status(Status.NO_CONTENT).build();
    }
}
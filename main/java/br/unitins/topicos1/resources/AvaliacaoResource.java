package br.unitins.topicos1.resources;

import org.jboss.logging.Logger;

import br.unitins.topicos1.dto.AvaliacaoDTO;
import br.unitins.topicos1.dto.AvaliacaoResponseDTO;
import br.unitins.topicos1.service.AvaliacaoService;
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

@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Path("/avaliacao")
public class AvaliacaoResource {
    @Inject
    public AvaliacaoService avaliacaoService;

    private static final Logger LOG = Logger.getLogger(BeanValidationExceptionMapper.class);

    @GET
    public Response findAll() {
        LOG.info("Listando todos os comentários");
        return Response.ok(avaliacaoService.findAll()).build();
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id) {
        LOG.info("Obtendo comentário.");
        AvaliacaoResponseDTO avaliacao = avaliacaoService.findById(id);
        if (avaliacao == null)
            return Response.status(Status.NOT_FOUND).build();
        return Response.ok(avaliacao).build();
    }

    @GET
    @Path("/search/comentario/{conteudo}")
    public Response findByComentario(@PathParam("conteudo") String conteudo) {
        LOG.info("Pesquisando comentário pelo conteúdo.");
        return Response.ok(avaliacaoService.findByComentario(conteudo)).build();
    }

    @POST
    @Path("/create")
    @Transactional
    public Response create(AvaliacaoDTO avaliacaoDto) {
        LOG.info("Criando comentário.");
        LOG.debugf("DTO: %s", avaliacaoDto);
        return Response.status(Status.CREATED).entity(avaliacaoService.create(avaliacaoDto)).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, AvaliacaoDTO avaliacaoDto) {
        LOG.info("Atualizando comentário.");
        AvaliacaoResponseDTO avaliacaoBanco = avaliacaoService.findById(id);
        if (avaliacaoBanco == null)
            return Response.status(Status.NOT_FOUND).build();
        avaliacaoService.update(id, avaliacaoDto);
        return Response.status(Status.NO_CONTENT).build();

    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteById(@PathParam("id") Long id) {
        LOG.info("Apagando comentário.");
        avaliacaoService.deleteById(id);
        return Response.status(Status.NO_CONTENT).build();
    }
}
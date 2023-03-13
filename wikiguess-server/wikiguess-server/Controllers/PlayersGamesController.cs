using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using wikiguess_server.Models;
using wikiguess_server.Models.DAL;

namespace wikiguess_server.Controllers
{
    public class PlayersGamesController : ApiController
    {
        [HttpGet]
        public IHttpActionResult get(string userEmail)
        {
            Player player = new Player();
            return Ok(player.getGamesByEmail(userEmail));
        }
        [HttpGet]
        public IHttpActionResult get()
        {
            DataServices ds = new DataServices();
            return Ok(ds.getGlobalStats());
        }
        // GET api/<controller>/5
        [HttpPost]
        [Route("api/playersgames/stats")]
        public IHttpActionResult setStat([FromBody] PlayerGame playerGame)
        {
            try
            {
                return Created("Created", playerGame.createStat());
            }
            catch (SqlException e)
            {
                //return InternalServerError(e);
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NotImplemented)
                {
                    Content = new StringContent(e.Message),
                    ReasonPhrase = "User Email must be provided"
                });
            }
        }

        public string Get(int id)
        { 
            return "value";
        }

        
        public void Post([FromBody] string value)
        {

        }

        

        
    }
}
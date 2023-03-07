using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using wikiguess_server.Models;

namespace wikiguess_server.Controllers
{
    public class PlayersGamesController : ApiController
    {
        [HttpGet]
        public string get()
        {
            return null;
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
                return InternalServerError(e.Message.ToString());



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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using wikiguess_server.Models;

namespace wikiguess_server.Controllers
{
    public class PlayersController : ApiController
    {

        [HttpPost]
        [Route("api/players/login")]
        public IHttpActionResult logIng([FromBody] dynamic r)
        {
            Player player = new Player();
            return Ok(player.getUser(Convert.ToString(r.userEmail), Convert.ToString(r.password)));
        }

        [HttpPost]
        [Route("api/players/signup")]
        public IHttpActionResult signUp([FromBody] Player player)
        {
            try
            {
                return Created("Created", player.createUser());
            }
            catch (Exception e)
            {                
                return BadRequest("This email is already associated with another account");
            }
            
        }
    }
}

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

        [HttpGet]
        public string get()
        {
            return "wooo";
        }

        [HttpPost]
        [Route("api/players/login")]
        public IHttpActionResult logIng([FromBody] dynamic r)
        {
            Player player = new Player();
            return Ok(player.getUser(Convert.ToString(r.userEmail), Convert.ToString(r.password)));
        }

        [HttpPost]
        public IHttpActionResult signUp([FromBody] Player player)
        {
            return Created("Created", player.createUser());
        }
    }
}

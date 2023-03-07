using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using wikiguess_server.Models.DAL;

namespace wikiguess_server.Models
{
    public class Player
    {
        private string userEmail;
        private string userName;
        private string password;

        public string UserEmail { get => userEmail; set => userEmail = value; }
        public string UserName { get => userName; set => userName = value; }
        public string Password { get => password; set => password = value; }

        public Player() { }

        public Player(string userEmail, string userName, string password)
        {
            UserEmail = userEmail;
            UserName = userName;
            Password = password;
        }

        internal Player getUser(string userEmail, string password)
        {
            DataServices ds = new DataServices();
            return ds.readUser(userEmail,password);
        }

        internal string createUser()
        {
            DataServices ds = new DataServices();
            return ds.insertUser(this);
        }

        internal List<PlayerGame> getGamesByEmail(string userEmail)
        {
            DataServices ds = new DataServices();
            return ds.readGamesByEmail(userEmail);
        }
    }
}
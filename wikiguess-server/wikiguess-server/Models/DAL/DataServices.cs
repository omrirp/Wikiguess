using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.NetworkInformation;
using System.Web;
using System.Web.Configuration;

namespace wikiguess_server.Models.DAL
{
    public class DataServices
    {
        public DataServices() { }

        internal string insertStat(PlayerGame playerGame)
        {
            SqlConnection con = Connect();
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@userEmail", playerGame.UserEmail);
            command.Parameters.AddWithValue("@questionCount", playerGame.QuestionCount);
            command.Parameters.AddWithValue("@isCorrect", playerGame.IsCorrect);
            command.Parameters.AddWithValue("@character", playerGame.Character);
            command.CommandText = "spInsertGameStatWG";//!!
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            command.ExecuteNonQuery();

            con.Close();
            return playerGame.UserEmail;
        
        }

        internal string insertUser(Player player)
        {
            SqlConnection con = Connect();
            SqlCommand command = new SqlCommand();
            try
            {
                command.Parameters.AddWithValue("@userEmail", player.UserEmail);
                command.Parameters.AddWithValue("@userName", player.UserName);
                command.Parameters.AddWithValue("@password", player.Password);
                command.CommandText = "spInsertPlayerWG";//!!
                command.Connection = con;
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.CommandTimeout = 10; // in seconds
                command.ExecuteNonQuery();
            }
            catch (SqlException e)
            {
                return e.Message.ToString();      
            }
            con.Close();
            return player.UserEmail;
        }

        internal List<PlayerGame> readGamesByEmail(string userEmail)
        {
            SqlConnection con = Connect();
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@userEmail", userEmail);
            command.CommandText = "spGetGamesByEmailWG";//!!
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds
            command.ExecuteNonQuery();
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            List<PlayerGame> playerGames = new List<PlayerGame>();
            while (dr.Read())
            {
                int gameNumber = Convert.ToInt32(dr["gameNumber"]);
                DateTime date = Convert.ToDateTime(dr["date"]);
                int questionCount = Convert.ToInt32(dr["questionCount"]);
                bool isCorrect = Convert.ToBoolean(dr["isCorrect"]);
                string character = dr["character"].ToString();
                playerGames.Add(new PlayerGame(gameNumber, date, questionCount, isCorrect, character));
            }
            con.Close();
            return playerGames;
        }

        internal Player readUser(string userEmail, string password)
        {
            SqlConnection con = Connect();
            string commandSTR = "select * from players_WG where userEmail = '" + userEmail+"'";
            SqlCommand command = new SqlCommand(commandSTR, con);
            command.ExecuteNonQuery();
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);

            while (dr.Read())
            {
               string userName = dr["userName"].ToString();
               string confirmPassword = dr["Password"].ToString();
                if (!password.Equals(confirmPassword))
                {
                    throw new Exception("Invalid password");
                }
                con.Close();
                return new Player(userEmail, userName, password);
            }
            con.Close();
            return null;
        }

        private SqlConnection Connect()
        {
            // read the connection string from the web.config file
            string connectionString = WebConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            // create the connection to the db
            SqlConnection con = new SqlConnection(connectionString);
            // open the database connection
            con.Open();
            return con;
        }
    }
}
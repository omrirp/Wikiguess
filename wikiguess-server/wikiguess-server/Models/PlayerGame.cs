using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using wikiguess_server.Models.DAL;

namespace wikiguess_server.Models
{
    public class PlayerGame
    {
        private int gameNumber;
        private string userEmail;
        private DateTime date;
        private int questionCount;
        private bool isCorrect;
        private string character;

        public int GameNumber { get => gameNumber; set => gameNumber = value; }
        public string UserEmail { get => userEmail; set => userEmail = value; }
        public DateTime Date { get => date; set => date = value; }
        public int QuestionCount { get => questionCount; set => questionCount = value; }
        public bool IsCorrect { get => isCorrect; set => isCorrect = value; }
        public string Character { get => character; set => character = value; }

        public PlayerGame() { }

        public PlayerGame(int gameNumber, string userEmail, DateTime date, int questionCount, bool isCorrect, string character)
        {
            GameNumber = gameNumber;
            UserEmail = userEmail;
            Date = date;
            QuestionCount = questionCount;
            IsCorrect = isCorrect;
            Character = character;
        }

        public PlayerGame(int gameNumber, DateTime date, int questionCount, bool isCorrect, string character)
        {
            GameNumber = gameNumber;
            Date = date;
            QuestionCount = questionCount;
            IsCorrect = isCorrect;
            Character = character;
        }

        public PlayerGame(string userEmail, int questionCount, bool isCorrect, string character)
        {
            UserEmail = userEmail;
            QuestionCount = questionCount;
            IsCorrect = isCorrect;
            Character = character;
        }

        public string createStat()
        {
            DataServices ds = new DataServices();
            return ds.insertStat(this);
        }
    }
    
}
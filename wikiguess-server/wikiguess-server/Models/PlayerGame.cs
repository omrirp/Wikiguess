using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using wikiguess_server.Models.DAL;

namespace wikiguess_server.Models
{
    public class PlayerGame
    {
        private string userEmail;
        private DateTime date;
        private int questionCount;
        private bool isCorrect;
        private string character;
        public PlayerGame() { }
        public PlayerGame(string userEmail, DateTime date, int questionCount, string character, bool isCorrect)
        {
            UserEmail = userEmail;
            Date = date;
            QuestionCount = questionCount;
            Character = character;
            IsCorrect = isCorrect;
        }
        public PlayerGame(string userEmail, int questionCount, string character, bool isCorrect)
        {
            UserEmail = userEmail;
            QuestionCount = questionCount;
            Character = character;
            IsCorrect = isCorrect;
        }

        public string UserEmail { get => userEmail; set => userEmail = value; }
        public DateTime Date { get => date; set => date = value; }
        public int QuestionCount { get => questionCount; set => questionCount = value; }
        public string Character { get => character; set => character = value; }
        public bool IsCorrect { get => isCorrect; set => isCorrect = value; }

        public string createStat()
        {
            DataServices ds = new DataServices();
            return ds.insertStat(this);
        }
    }
    
}
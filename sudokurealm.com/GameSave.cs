using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sudokurealm.com
{
    public class GameSave
    {
        private string saveId;

        public string SaveId
        {
            get { return saveId; }
            set { saveId = value; }
        }
        private string saveTimeStamp;

        public string SaveTimeStamp
        {
            get { return saveTimeStamp; }
            set { saveTimeStamp = value; }
        }
        private string saveData;

        public string SaveData
        {
            get { return saveData; }
            set { saveData = value; }
        }

        private string movesHistory;

        public string MovesHistory
        {
            get { return movesHistory; }
            set { movesHistory = value; }
        }

        public GameSave(string _saveId, string _saveTimeStamp, string _saveData, string _movesHistory)
        {
            movesHistory = _movesHistory;
            saveId = _saveId;
            saveTimeStamp = _saveTimeStamp;
            saveData = _saveData;
        }
    }
}
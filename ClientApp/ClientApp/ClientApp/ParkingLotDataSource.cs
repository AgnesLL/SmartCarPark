using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;

namespace ClientApp
{
    class ParkingLotDataSource
    {
        public ObservableCollection<details> Events = new ObservableCollection<details>();

        
        public class details
        {
            public string Location { get; set; }
            public string SpacesLeft { get; set; }
            public string Distance { get; set; }
            public string State { get; set; }
            public bool hiddenState { get; set; }
            public string imgSource { get; set; }
        }
    }
}

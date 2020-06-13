using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using Quobject.SocketIoClientDotNet.Client;
using Newtonsoft.Json;

namespace ClientApp
{
    public partial class MainPage : ContentPage
    {
        List<ParkingLotDataSource.details> parking_data = new List<ParkingLotDataSource.details>();
        ParkingLotDataSource datum = new ParkingLotDataSource();
        ParkingLotDataSource.details park1 = new ParkingLotDataSource.details();
        ParkingLotDataSource.details park2 = new ParkingLotDataSource.details();

        void sortSource()
        {
            var sortedSource = parking_data.OrderByDescending(x => x.hiddenState).ThenBy(x => int.Parse(x.Distance)).ToList();

            datum.Events.Clear();
            foreach (ParkingLotDataSource.details deetail in sortedSource)
            {
                datum.Events.Add(new ParkingLotDataSource.details
                {
                    Location = "Location: " + deetail.Location,
                    Distance = "Distance(m): " + deetail.Distance,
                    SpacesLeft = "Spaces Left: " + deetail.SpacesLeft,
                    State = "State: " + deetail.State,
                    hiddenState = deetail.hiddenState,
                    imgSource = deetail.imgSource
                });
            }
        }

        void returnStatus(string data , ParkingLotDataSource.details park)
        {
            var Source = parking_data.OrderBy(x => x.hiddenState).ThenBy(x => int.Parse(x.Distance)).ToList();
            var pos = Source.IndexOf(park1);
            if (data == "0")
            {
                data = "No spaces left";
                park.State = "Unavalible";
                park.hiddenState = false;
            }
            else
            {
                park.State = "Avalible";
                park.hiddenState = true;
            }
            foreach (ParkingLotDataSource.details details in Source)
            {
                if (park.Location == details.Location)
                {
                    details.SpacesLeft = data;
                }
            }
            sortSource();
        }

        public MainPage()
        {
            InitializeComponent();

            park1.Location = "Park1";
            park1.Distance = "200";
            park1.imgSource = "carPark1.jpg";

            park2.Location = "Park2";
            park2.Distance = "100";
            park2.imgSource = "carPark2.jpg";

            var socket = IO.Socket("http://localhost:5000");

            socket.On(Socket.EVENT_CONNECT, () =>
            {
                socket.Emit("getStatus");
            });

            socket.On("returnStatus", (data) =>
            {
                List<string> obj = JsonConvert.DeserializeObject<List<string>>(data.ToString());
                returnStatus(obj[0], park1);
                returnStatus(obj[1], park2);
            });

            parkview.ItemsSource = datum.Events;

            parking_data.Add(park1);
            parking_data.Add(park2);

            sortSource();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using Quobject.SocketIoClientDotNet.Client;
using Newtonsoft.Json;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace ParkingLotMon
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            text text1 = new text();
            text text2 = new text();
            parklab1.DataContext = text1;
            parklab2.DataContext = text2;

            //var socket = IO.Socket("http://113.255.151.108:5000");
            //var socket = IO.Socket("http://10.15.1.175:5000");
            var socket = IO.Socket("http://10.15.1.193:5000");

            socket.On(Socket.EVENT_CONNECT, () =>
            {
                socket.Emit("getStatus");
            });

            socket.On("returnStatus", (data) =>
            {
                List<string> obj = JsonConvert.DeserializeObject<List<string>>(data.ToString());
                for(int i = 0; i < obj.Count; i++)
                {
                    if(int.Parse(obj[i]) == 0)
                    {
                        obj[i] = "Unavalible";
                    }
                    else
                    {
                        obj[i] = obj[i] + " space(s)";
                    }
                }
                text1.state = "Floor 1: " + obj[0];
                text2.state = "Floor 2: " + obj[1];
            });
        }

        public class text : INotifyPropertyChanged
        {
            private string _text;

            public string state
            {
                get
                {
                    return _text;
                }

                set
                {
                    if (_text == value) return;

                    _text = value;
                    OnPropertyChanged("state");
                }
            }

            public event PropertyChangedEventHandler PropertyChanged;

            protected virtual void OnPropertyChanged(string propertyName)
            {
                if (PropertyChanged != null)
                {
                    PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
                }
            }
        }
    }
}

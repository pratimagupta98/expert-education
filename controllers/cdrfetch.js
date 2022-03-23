const Cdrreport = require("../models/cdrreport");
const Cdrfetch = require("../models/cdrfetch");
const resp = require("../helpers/apiResponse");
var cron = require('node-cron');

var task = cron.schedule('00 30 11 * * *', () =>  {
    console.log('Job excuted at 11:30am sharp in the morning');
    this.checkifapiexecute();
  });
  
  task.start();


  exports.addreportstomongodb = async (req, res) => {
    var request = require("request");
    var options = {
      method: "GET",
      url: `http://103.8.43.14/onyx/api/cdr?start_date=2021-10-25&end_date=2021-10-25`,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      form: {},
    };
  
    request(options, function (error, response, body) {
      if (response) {
        var toparse = response.body;
        var tojson = JSON.parse(toparse);
  
        var toinsertarray = [];
        console.log(tojson.message[0]);
  
        for (let i = 0; i < tojson.message.length; i++) {
          toinsertarray[i] = tojson.message[i];
        }
        console.log(toinsertarray);
  
        const toupload = async () => {
          await Cdrreport.insertMany(toinsertarray)
            .then((data) => {
              res.status(200).json("Data added Successfully!!");
              console.log(data)
            })
            .catch((error) => {
              res.status(200).json(error);
              console.log(error)
            });
        };
        toupload();
      }
    });
  };

  exports.checkifapiexecute = async (req, res) => {
      console.log("api chal gayi")

        var MyDate = new Date();
        MyDate.setDate(MyDate.getDate() - 1);
        MyDateString = MyDate.getFullYear() + '-'
             + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-'
             + ('0' + MyDate.getDate()).slice(-2);
        console.log(MyDateString);
        let fetchstarttime = new Date().toLocaleTimeString()
        
    var request = require("request");
    var options = {
      method: "GET",
      url: `http://103.8.43.14/onyx/api/cdr?start_date=${MyDateString}&end_date=${MyDateString}`,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      form: {},
    };
    
    request(options, function (error, response, body) {
      if (response) {
        var toparse = response.body;
        var tojson = JSON.parse(toparse);
  
        var toinsertarray = [];
        console.log(tojson.message[0]);
  
        for (let i = 0; i < tojson.message.length; i++) {
          toinsertarray[i] = tojson.message[i];
        }
        console.log(toinsertarray);
  
        const toupload = async () => {
          await Cdrreport.insertMany(toinsertarray)
            .then((data) => {
              console.log("Data added Successfully!!");
              console.log(data)
            })
            .catch((error) => {
              console.log(error)
            });
        };
        toupload();
      }
    });
        let fetchendtime = new Date().toLocaleTimeString()
        const datefetched = new Cdrfetch({
            datafetchdate: MyDateString,
            fetchstarttime: fetchstarttime,
            fetchendtime: fetchendtime,
          });

          datefetched
      .save()
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
        
        console.log("Date: "+MyDateString);
        console.log("Start time: "+fetchstarttime);
        console.log("End time: "+fetchendtime);
  }


  
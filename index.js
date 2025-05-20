import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import moment from 'moment-timezone';
import { createServer } from "http";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import bodyParser from 'body-parser'
import fetch from 'node-fetch';

import path from 'path'

// import { initializeApp } from "firebase/app";
// import { getFirestore,collection ,query, orderBy, limit,getDocs,getDoc , doc, setDoc,updateDoc} from "firebase/firestore";



import got from 'got';
import axios from 'axios';






const app = express();



var DB = 'mongodb+srv://zayn:1221@cluster0.fzxdoyt.mongodb.net/db1?retryWrites=true&w=majority'; mongoose.connect(DB)
  .then(() => { console.log('connected to the db') }).catch((err) => { console.log(err) })
var schema = new mongoose.Schema({ name: String, ram: String, device: String, platform: String, date: String, ipad: String, num: String, browserr: String })
var collec = new mongoose.model('za', schema)

var chat_schema = new mongoose.Schema({ data: String, ram: String, device: String, platform: String, date: String, ip: String, num: String, media: String, fname: String, deleted: String })
var chat_collec = new mongoose.model('chat_data', chat_schema)

var multis_schema = new mongoose.Schema({ data: Array, ram: String, device: String, platform: String, date: String, ip: String, num: String, media: String, fname: String, name: String })
var mlts_collec = new mongoose.model('multis', multis_schema)

var test_schema = new mongoose.Schema({ data: Object, ram: String, device: String, platform: String, date: String, ip: String, num: String, media: String, fname: String, name: String, book: String, chapter: String, cycle: String, start: String, end: String, neg_mark: String, per_mark: String, duration: String, titlee: String })
var test_collec = new mongoose.model('company1', test_schema)


var test_ac_schema = new mongoose.Schema({ data: Object, ram: String, device: String, platform: String, date: String, ip: String, num: String, media: String, fname: String, name: String, book: String, chapter: String, cycle: String, start: String, end: String, neg_mark: String, per_mark: String, duration: String, titlee: String, name: String, cycel: String, gname: String, gmail: String, gpic: String }, { strict: false })
var test_ac_collec = new mongoose.model('test_accounts', test_ac_schema)



let test_namero = "otp__centers"



const acsSchemar0 = new mongoose.Schema({}, { strict: false });
const otp_center = mongoose.models[test_namero] || mongoose.model(test_namero, acsSchemar0);




var __dirname = dirname(fileURLToPath(import.meta.url));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.set('trust proxy', true)






const port = process.env.PORT || 3000; // Define the port

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(error.status || 500).json({
    error: error.message || 'Internal Server Error'
  });
});

// A simple route for the home page
app.get('/', (req, res) => {
  res.send('Hello, World!'); // Send a response
});


app.get('/q_total', async (req, res) => {
  let ge = await test_collec.find({}, { _id: 0, ram: 0, device: 0, platform: 0, __v: 0 }).sort({ _id: -1 })
  console.log(ge);
  // res.send(ge[0].data);  
  res.send({ "q_total": ge[0].data.length, "q": ge[0].data });
});

app.post('/q_get', async (req, res) => {
  let ge = await test_collec.find({}, { _id: 0, ram: 0, device: 0, platform: 0, __v: 0 }).sort({ _id: -1 })
  console.log(ge);

  let d;

  res.send(ge[0].data);
});

app.get('/a', async (req, res) => {
  let number = await test_collec.count()
  await new test_collec({
    data: [{ "order": 1, "question": "\\frac{a}{b}\\ \\text{দুটি সমান বিন্দু চার্জ x-অক্ষের উপর x = aও x = +a বিন্দুতে এবং অন্য একটি বিন্দু চার্জ Q মূলবিন্দুতে স্থাপন করা হলো। যদি চার্জটিকে x-অক্ষ বিরাবর x পরিমাণ সরানো হয়, তাহলে এর বিভব শক্তির পরিবর্তন নিচের কোন রাশিটির সমানুপাতিক?}", "a": "\\phi", "b": "\\hat{x}", "c": "\\perp", "d": "\\infty" }, { "order": 2, "question": "yf", "a": "ff", "b": "kk", "c": "uu", "d": "ii" }],
    book: "math1",
    chapter: "gg",
    cycle: "gg",
    start: "gg",
    end: "gg",
    neg_mark: "gg",
    per_mark: "gg",
    duration: "gg",
    date: moment().tz('Asia/dhaka').format('h:m a,D/M/YY'),
    ip: req.ip,
    num: number + 1
  }).save()
  console.log(number);

  // res.send(await chat_collec.find({ num: number + 1 }).sort({ _id: -1 }).limit(1))
  res.send('Hello, World!'); // Send a response
});


app.post('/ac_create', async (req, res) => {
  const data = req.body;
  console.log('Received data:', data);

  const doc = await test_ac_collec.findOne({ gmail: data.gmail })
    .sort({ _id: -1 })
    .exec();
  console.log(doc);

  if (doc == null) {

    const doc1 = await test_ac_collec.findOne({ name: data.name })
      .sort({ _id: -1 })
      .exec();
    console.log(doc1);
    if (doc1 != null) { return res.status(409).json({ message: 'cname already exist', received: data }); }


    let d = await new test_ac_collec({
      name: data.name,
      cycle: data.cycel,
      gname: data.gname,
      gmail: data.gmail,
      gpic: data.gpic,
      cuid: data.cuid,
      date: moment().tz('Asia/dhaka').format('h:m a,D/M/YY'),
      ip: req.ip
    }).save()
    res.status(200).json({ message: 'account created successfully', received: d });
  } else {
    console.log("Ac already created");

    res.status(200).json({ message: 'Chill,ac already was created', received: data });
  }


});

app.post('/ac_verify', async (req, res) => {
  const data = req.body;
  console.log('Received data:', data);
  let name = data.name

  let ge = await test_ac_collec.find({ name: name }, { _id: 0, ram: 0, device: 0, platform: 0, __v: 0 })
    .sort({ _id: -1 });




  if (ge.length == 1) {


    let test_name = data.name + "__tests"
    //let  test_name="acs__test"


    const acsSchema = new mongoose.Schema({}, { strict: false });
    const Acs = mongoose.models[test_name] || mongoose.model(test_name, acsSchema);




    let count = await Acs.countDocuments();
    console.log(`Total documents in ${test_name}: ${count}`);





    res.status(200).json({ count: count, message: '', received: data });

  } else if (ge.length == 0) {
    res.status(404).json({ message: 'account not found', received: data });
  }
  else {
    res.status(500).send({ message: "Same Named Ac ,count:" + ge.length });
  }




});



let get_doc_byid = async function (collection, id) {







  const acsSchema = new mongoose.Schema({}, { strict: false });
  const Acs = mongoose.models[collection] || mongoose.model(collection, acsSchema);



  const document = await Acs.findById(id)

  if (document != null) {
    return { found: "yes", data: document }

  } else {
    return { found: "no", err: "no doc found by given collections given id" }

  }



}

let update_doc_byid = async function (collection, id, newData) {



  const acsSchema = new mongoose.Schema({}, { strict: false });
  const Acs = mongoose.models[collection] || mongoose.model(collection, acsSchema);



  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let random = '';
  for (let i = 0; i < 10; i++) {
    random += characters.charAt(Math.floor(Math.random() * characters.length));
  }


  const result = await Acs.findByIdAndUpdate(
    id,
    { ...newData, random: random },
    { new: true }
  );

  if (result.random == random) {
    return { found: "yes", data: result }
  } else {
    return { found: "no", err: "Doc returned old doc,it was not updated" }
  }



}




let verify_cname = async function (cname) {

  let ge = await test_ac_collec.find({ name: cname });

  if (ge.length == 1) {
    return { found: "yes" }
  } else if (ge.length == 0) {
    return { found: "no", err: "cname not found in db" }
  }
  else {
    return { found: "no", err: " multipel cnames  in same name" }
  }

}


app.post('/view_result', async (req, res) => {
  const data = req.body;
  console.log('Received data:', data);





  let rtn = await verify_cname(data.cname);
  if (rtn.found == "yes") {


    let test_name = data.cname + "__severs"



    const acsSchema = new mongoose.Schema({}, { strict: false });
    const Acs = mongoose.models[test_name] || mongoose.model(test_name, acsSchema);

    try {
      const doc = await Acs.findOne({ uname: data.uname, exam: data.id })
        .sort({ _id: -1 })
        .exec();
      console.log(doc);
      console.log("doc up------------------");


      let ans = await get_doc_byid(`${data.cname}__tests`, data.id)
      res.status(200).json({ doc: doc, ans: ans.data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'error finding doc', err: err });
    }





  }










});

app.post('/lead', async (req, res) => {
  const data = req.body;
  console.log('Received data:', data);
  let noww=new Date();




  let rtn = await verify_cname(data.cname);
  if (rtn.found == "yes") {


    let test_name = data.cname + "__severs"



    const acsSchema = new mongoose.Schema({}, { strict: false });
    const Acs = mongoose.models[test_name] || mongoose.model(test_name, acsSchema);

    try {
      const docs = await Acs.find({});

      const doc = await Acs.find({ exam: data.id })
        .sort({ _id: -1 })
        .exec();

        let arr0=[];


      for (let i = 0; i < doc.length; i++) {
        const el = doc[i];

        let start = el.date_stated_obj;
        let end = el.date_ended_obj;
        if (start == undefined || end == undefined) { continue; }


        const time1 = new Date(start.year, Number(start.month) - 1, start.day, start.hour, start.min, start.sec); // Months are 0-indexed
        const time2 = new Date(end.year, Number(end.month) - 1, end.day, end.hour, end.min, end.sec);


        const diffInMilliseconds = time2 - time1;
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        const minutes = Math.floor(diffInSeconds / 60);
        const seconds = diffInSeconds % 60;

        console.log(`${minutes} minute(s) and ${seconds} second(s)`);
        console.log(el.submit_click);

        const futureTime = new Date(time1.getTime() + Number(Number(el.duration)+1) * 60 * 1000);

        console.log(time1);

        console.log(" Time:", futureTime);

        if (el.submitedd == undefined) continue;
        if (el.submitedd.length == 0) continue;


        if (futureTime <=noww) {
          arr0.push({[el.uuid]:{...el.submitedd,"time_took":diffInSeconds}});
          continue;
        }

        if (el.submit_click == undefined) continue;

        if (el.submit_click == "yes") arr0.push({[el.uuid]:{...el.submitedd,"time_took":diffInSeconds}});




      }


      let ans = await get_doc_byid(`${data.cname}__tests`, data.id)
      if(ans.found != "yes"){return res.status(500).json({ message: 'error finding doc', err: err }); }
     
      
      console.log(arr0);
      console.log("66666");
      console.log(ans.data.data);

      console.log("66666");

      
      
      
      

      
      let obj1={};
 
      
      for (const item of arr0) {
          // For each object, extract the key and value (user and their orders)
          const userKey = Object.keys(item)[0]; // Get the user key (e.g., user_5064)
          const orders = item[userKey]; // Get the order object for that user
      
          console.log(`User: ${userKey}`);
          console.log('Orders:', orders);  



          console.log(77777777);

          console.log(orders);
          console.log(77777777);








          const letterToIndex = letter => letter.charCodeAt(0) - 97;

          const result = ans.data.data.reduce(
            (acc, question) => {
              const submittedAnswer = orders[`order_${question.order}`];
              const submittedIndex = submittedAnswer ? letterToIndex(submittedAnswer) : -1;
          
              if (submittedIndex === question.ans) acc.correct++;
              else if (submittedIndex !== -1) acc.wrong++;
          
              return acc;
            },
            { correct: 0, wrong: 0 } // Initial counts
          );
          
          console.log(`Correct answers: ${result.correct}`);
          console.log(`Wrong answers: ${result.wrong}`);

          obj1[userKey]={"right":result.correct,"wrong":result.wrong,"time_took":orders.time_took}













      }



      let per_markk=1;
      let neg_markk=0;


      const result = /^\d+$/.test(ans.data.per_mark);
      if (result) {  
        per_markk=ans.data.per_mark
       }

      const result1 = /^[\d.]+$/.test(ans.data.neg_mark);
      if (result1) {
        neg_markk= ans.data.neg_mark
      }


    const leaderboard = Object.entries(obj1)
    .map(([userId, { right, wrong, time_took }]) => ({
      userId,
      score: right * Number(per_markk) - wrong * Number(neg_markk),
      timeTook: time_took
    }))
    .filter(user => user.score > 0) // Filter out users with score <= 0
    .sort((a, b) => {
      const scoreDiff = b.score - a.score;
      if (scoreDiff !== 0) return scoreDiff;
      return a.timeTook - b.timeTook || Math.random() - 0.5; // Randomize only if time_took is also equal
    })
    .map((user, index) => ({
      ...user,
      position: index + 1 // Assign position based on sorted order
    }));
  
  console.log(leaderboard);
  
      
      
      


      res.status(200).json({ lead: leaderboard });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'error finding doc', err: err });
    }





  }










});

app.post('/q_update_time', async (req, res) => {
  const data = req.body;
  console.log('Received data:', data);

  let startt_datee = moment.tz({
    year: data.start_obj.year,
    month: Number(data.start_obj.month) - 1,
    day: data.start_obj.day,
    hour: data.start_obj.hour,
    minute: data.start_obj.min
  }, 'Asia/Dhaka');

  let formattedDate_start = startt_datee.format('h:mm a, DD/MM/YY');

  let endd_datee = moment.tz({
    year: data.end_obj.year,
    month: Number(data.end_obj.month) - 1,
    day: data.end_obj.day,
    hour: data.end_obj.hour,
    minute: data.end_obj.min
  }, 'Asia/Dhaka');

  let formattedDate_end = endd_datee.format('h:mm a, DD/MM/YY');



  let rtn = await verify_cname(data.cname);
  if (rtn.found == "yes") {

    let rtn2 = await update_doc_byid(`${data.cname}__tests`, data.id, {
      ["start_obj"]: data["start_obj"],
      ["end_obj"]: data["end_obj"],
      ["start"]: formattedDate_start,
      ["end"]: formattedDate_end
    });
    if (rtn2.found == "yes") {

      console.log(rtn2);
      console.log("updated time");

      console.log(formattedDate_start, formattedDate_end);

      res.status(200).json({ data: data });



    }

  }










});



app.post('/q_update_one_feild', async (req, res) => {
  const data = req.body;
  console.log('Received data:', data);







  let rtn = await verify_cname(data.cname);
  if (rtn.found == "yes") {
    let obj = data.feild

    let rtn2 = await update_doc_byid(`${data.cname}__tests`, data.id, obj);
    if (rtn2.found == "yes") {

      console.log(rtn2);




      res.status(200).json({ data: data });



    }

  }










});

 

app.post('/test_create', async (req, res) => {
  const data = req.body;
  console.log('Received data:', data);
  let name = data.cname
  console.log(data)

  let ge = await test_ac_collec.find({ name: name }, { _id: 0, ram: 0, device: 0, platform: 0, __v: 0 })
    .sort({ _id: -1 });




  if (ge.length == 1) {


    let test_name = data.cname + "__tests"
    //let  test_name="acs__test"


    const acsSchema = new mongoose.Schema({}, { strict: false });
    const Acs = mongoose.models[test_name] || mongoose.model(test_name, acsSchema);



    const document = await Acs.findById(data.id);
    console.log(document);

    if (document != null) {
      let test_sever_name = data.cname + "__severs"
      //let  test_name="acs__test"


      const acsSchemaa = new mongoose.Schema({}, { strict: false });
      const Acs2 = mongoose.models[test_sever_name] || mongoose.model(test_sever_name, acsSchemaa);

      const now = moment().tz('Asia/Dhaka');
      let race = "";
 
      const time1 = moment({ year: document.start_obj.year, month: Number(document.start_obj.month) - 1, day: document.start_obj.day, hour: document.start_obj.hour }).add(document.start_obj.min, 'minutes'); // January 9, 2025, 08:00
      const time2 = moment({ year: document.end_obj.year, month: Number(document.end_obj.month) - 1, day: document.end_obj.day, hour: document.end_obj.hour }).add(Number(document.end_obj.min) + 1, 'minutes'); // January 9, 2025, 18:00


      if (now.isSameOrAfter(time1) && now.isSameOrBefore(time2)) {
        race = "yes"
      } else {
        race = "no"

      }



      const doc = await Acs2.create({
        uname: data.uname,
        uuid:data.uuid,
        cname: data.cname,
        exam: data.id,
        race: race,
        duration: document.duration,
        per_mark: document.per_mark,
        neg_mark: document.neg_mark,
        exam_start_on_obj: document.start_obj,
        exam_end_on_obj: document.end_obj,
        date_stated: moment().tz('Asia/dhaka').format('h:m:s a,D/M/YY'),
        date_stated_obj: { year: now.year(), month: now.month() + 1, day: now.date(), hour: now.hour(), min: now.minute(), sec: now.second() }
        ,
        submitedd: {},
        ip: req.ip
      });

      // Retrieve the ID
      console.log(doc);





      res.status(200).json({ id: doc.id, message: '', received: data });
    }








  } else if (ge.length == 0) {
    res.status(404).json({ message: 'account not found', received: data });
  }
  else {
    res.status(500).send({ message: "Same Named Ac ,count:" + ge.length });
  }




});


 let scoree = async function (ans_arr,selected_options) {


  const letterToIndex = letter => letter.charCodeAt(0) - 97;

  const result = ans_arr.reduce(
    (acc, question) => {
      const submittedAnswer = selected_options[`order_${question.order}`];
      const submittedIndex = submittedAnswer ? letterToIndex(submittedAnswer) : -1;
  
      if (submittedIndex === question.ans) acc.correct++;
      else if (submittedIndex !== -1) acc.wrong++;
  
      return acc;
    },
    { correct: 0, wrong: 0 } // Initial counts
  );
  
  console.log(`Correct answers: ${result.correct}`);
  console.log(`Wrong answers: ${result.wrong}`);

  return result;

  // obj1[userKey]={"right":result.correct,"wrong":result.wrong,"time_took":orders.time_took}



}

app.post('/test_submit', async (req, res) => {
  const data = req.body;

  let name = data.cname


  let ge = await test_ac_collec.find({ name: name }, { _id: 0, ram: 0, device: 0, platform: 0, __v: 0 })
    .sort({ _id: -1 });




  if (ge.length == 1) {


    let test_name0 = data.cname + "__severs"
    //let  test_name="acs__test"


    const acsSchema = new mongoose.Schema({}, { strict: false });
    const Acs0 = mongoose.models[test_name0] || mongoose.model(test_name0, acsSchema);



    const document = await Acs0.findById(data.exam_paper);



    if (document != null) {


      let sub2;
      let neww = {};
      const now = moment().tz('Asia/Dhaka');

      const time1 = moment({ year: document.exam_start_on_obj.year, month: Number(document.exam_start_on_obj.month) - 1, day: document.exam_start_on_obj.day, hour: document.exam_start_on_obj.hour }).add(document.exam_start_on_obj.min, 'minutes'); // January 9, 2025, 08:00
      const time2 = moment({ year: document.exam_end_on_obj.year, month: Number(document.exam_end_on_obj.month) - 1, day: document.exam_end_on_obj.day, hour: document.exam_end_on_obj.hour, }).add(Number(document.exam_end_on_obj.min) + 1, 'minutes'); // January 9, 2025, 18:00


 

      const result = /^[\d.]+$/.test(document.duration);
      if (!result) {
        console.log("Duration NAN");

        return res.status(500).send('Duration is not a Number');
      }



      let datee = document["date_stated_obj"];

      const date0 = new Date(datee["year"], Number(datee["month"]) - 1, datee["day"], datee["hour"], datee["min"], datee["sec"]);

      const initialMilliseconds = date0.getTime();
      let multi = document.duration * 60 * 1000;
      const dead_end = initialMilliseconds + multi + 5000;
      const live = new Date().getTime();


      if (live > dead_end) {
        console.log("Duration over");

        return res.status(500).send('Duration time Ended.');
      }





      if (data.full_submit != undefined) {

        sub2 = data.full_submit










        if (document["race"] != undefined) {


          if (now.isSameOrAfter(time1) && now.isSameOrBefore(time2) && document["race"] == "yes") {
            const result = await Acs0.findByIdAndUpdate(
              data.exam_paper,
              {
                ["submitedd"]: data.full_submit,
                date_ended: moment().tz('Asia/dhaka').format('h:m:s a,D/M/YY'),
                date_ended_obj: { year: now.year(), month: now.month() + 1, day: now.date(), hour: now.hour(), min: now.minute(), sec: now.second() },
                submit_click: "yes"


              },
              { new: true }
            );
          }





          if (document["race"] == "yes") {

            if (!now.isSameOrAfter(time1)) { return res.status(500).send('Submitting Before exam Started?nice1.'); }

            if (now.isSameOrBefore(time2)) {
              const result = await Acs0.findByIdAndUpdate(
                data.exam_paper,
                {
                  ["submitedd"]: sub2,
                  submit_click: "yes"
                },
                { new: true }
              );
            } else {
              // Yellow submit.
              const result = await Acs0.findByIdAndUpdate(
                data.exam_paper,
                {
                  ["submitedd"]: sub2,
                  submit_click: "yes"
                },
                { new: true }
              );
            }
          } else {
            const result = await Acs0.findByIdAndUpdate(
              data.exam_paper,
              {
                ["submitedd"]: sub2,
                submit_click: "yes"
              },
              { new: true }
            );
            console.log(22222222222222222);
            console.log(document);
            
            

      let docc = await get_doc_byid(`${data.cname}__tests`, data.q_id)
      if(docc.found == "yes"){ 
       let a=await  scoree(docc.data.data,result.submitedd);
 
      let per_markk=1;
      let neg_markk=0;


      const result44 = /^\d+$/.test(docc.data.per_mark);
      if (result44) {  
        per_markk=docc.data.per_mark
       }

      const result144 = /^[\d.]+$/.test(docc.data.neg_mark);
      if (result144) {
        neg_markk= docc.data.neg_mark
      }
 

       let scored= a.correct * Number(per_markk) - a.wrong * Number(neg_markk)
  
 

       

       return res.status(200).json({ score:await scored,data:{correct:a.correct,wrong:a.wrong,score:await scored} });
       }
     

       
            

          }













        } else {
          const result = await Acs0.findByIdAndUpdate(
            data.exam_paper,
            {
              ["submitedd"]: data.full_submit,
              date_ended: moment().tz('Asia/dhaka').format('h:m:s a,D/M/YY'),
              date_ended_obj: { year: now.year(), month: now.month() + 1, day: now.date(), hour: now.hour(), min: now.minute(), sec: now.second() },
              submit_click: "yes"


            },
            { new: true }
          );


        }



      } else {

        let sub = document.submitedd



        if (sub != undefined) {

          if (sub[`order_${data.order}`] == undefined) {


            sub2 = { ...sub, [`order_${data.order}`]: data.abcd };


          }


        } else {
          sub2 = { [`order_${data.order}`]: data.abcd }




        }









        if (document["race"] != undefined) {



          if (document["race"] == "yes") {

            if (!now.isSameOrAfter(time1)) { return res.status(500).send('Submitting Before exam Started?nice1.'); }

            if (now.isSameOrBefore(time2)) {
              const result = await Acs0.findByIdAndUpdate(
                data.exam_paper,
                {
                  ["submitedd"]: sub2,
                  date_ended: moment().tz('Asia/dhaka').format('h:m:s a,D/M/YY'),
                  date_ended_obj: { year: now.year(), month: now.month() + 1, day: now.date(), hour: now.hour(), min: now.minute(), sec: now.second() }
                },
                { new: true }
              );
            } else {
              // Yellow submit.
              const result = await Acs0.findByIdAndUpdate(
                data.exam_paper,
                {
                  ["submitedd"]: sub2,
                  date_ended: moment().tz('Asia/dhaka').format('h:m:s a,D/M/YY'),
                  date_ended_obj: { year: now.year(), month: now.month() + 1, day: now.date(), hour: now.hour(), min: now.minute(), sec: now.second() }
                },
                { new: true }
              );
            }
          } else {
            const result = await Acs0.findByIdAndUpdate(
              data.exam_paper,
              {
                ["submitedd"]: sub2,
                date_ended: moment().tz('Asia/dhaka').format('h:m:s a,D/M/YY'),
                date_ended_obj: { year: now.year(), month: now.month() + 1, day: now.date(), hour: now.hour(), min: now.minute(), sec: now.second() }
              },
              { new: true }
            );

          }




        } else {
          const result = await Acs0.findByIdAndUpdate(
            data.exam_paper,
            {
              ["submitedd"]: sub2,
              date_ended: moment().tz('Asia/dhaka').format('h:m:s a,D/M/YY'),
              date_ended_obj: { year: now.year(), month: now.month() + 1, day: now.date(), hour: now.hour(), min: now.minute(), sec: now.second() }
            },
            { new: true }
          );




        }



      }





      res.status(200).json({ message: '', received: data });
    }








  } else if (ge.length == 0) {
    res.status(404).json({ message: 'account not found', received: data });
  }
  else {
    res.status(500).send({ message: "Same Named Ac ,count:" + ge.length });
  }




});

app.post('/q_update_time_and_rest', async (req, res) => {
  const data = req.body;
  console.log('Received data:', data);



 


  let startt_datee = moment.tz({
    year: data.start_obj.year,
    month: Number(data.start_obj.month) - 1,
    day: data.start_obj.day,
    hour: data.start_obj.hour,
    minute: data.start_obj.min
  }, 'Asia/Dhaka');

  let formattedDate_start = startt_datee.format('h:mm a, DD/MM/YY');

  let endd_datee = moment.tz({
    year: data.end_obj.year,
    month: Number(data.end_obj.month) - 1,
    day: data.end_obj.day,
    hour: data.end_obj.hour,
    minute: data.end_obj.min
  }, 'Asia/Dhaka');

  let formattedDate_end = endd_datee.format('h:mm a, DD/MM/YY');

  let obj0={};
  const result = /^\d+$/.test(data.mark);
  if (result) {
    obj0.per_mark=data.mark
  }  
  const result22 = /^\d+$/.test(data.duration);
  if (result22) {
    obj0.duration=data.duration
    obj0.published='yes'
  }  

  const result2 = /^[\d.]+$/.test(data.neg);
  if (result2) {
    obj0.neg_mark=data.neg
  }

  let rtn = await verify_cname(data.cname);
  if (rtn.found == "yes") {

    let rtn2 = await update_doc_byid(`${data.cname}__tests`, data.id, {
      ["start_obj"]: data["start_obj"],
      ["end_obj"]: data["end_obj"],
      ["start"]: formattedDate_start,
      ["end"]: formattedDate_end,...obj0
    });
    if (rtn2.found == "yes") {

      console.log(rtn2);
      console.log("updated time");

      console.log(formattedDate_start, formattedDate_end);

      res.status(200).json({ data: data });



    }

  }



































 


})
app.post('/ac_get_all', async (req, res) => {
  const data = req.body;
  console.log('Received data:', data);
  let name = data.name

  let ge = 55;
  const doc = await test_ac_collec.findOne({ cuid: data.cuid })
    .sort({ _id: -1 })
    .exec();


  if (doc == null) { return res.status(404).json({ message: 'cuid doesnt exist', received: data }); }





  let test_name = doc.name + "__tests"

  const acsSchema = new mongoose.Schema({}, { strict: false });
  const Acs = mongoose.models[test_name] || mongoose.model(test_name, acsSchema);




  let count = await Acs.countDocuments();

  const docs = await Acs.find({});



  res.status(200).json({ cname: doc.name, count: count, docs: docs, message: '', received: data });



});

app.post('/ac_public_get_all', async (req, res) => {
  const data = req.body;
  console.log('Received data:', data);



  const doc = await test_ac_collec.findOne({ name: data.cname })
    .sort({ _id: -1 })
    .exec();
  console.log(doc);



  if (doc == null) { return res.status(404).json({ message: '  cname doesnt exist', received: data }); }





  let test_name = doc.name + "__tests"

  const acsSchema = new mongoose.Schema({}, { strict: false });
  const Acs = mongoose.models[test_name] || mongoose.model(test_name, acsSchema);






  const docs = await Acs.find({ published: 'yes' });



  res.status(200).json({ cname: doc.name, docs: docs });



});



app.post('/ac_find_by_id', async (req, res) => {
  const data = req.body;
  console.log('Received data:', data);
  let name = data.name

  let ge = await test_ac_collec.find({ name: name }, { _id: 0, ram: 0, device: 0, platform: 0, __v: 0 })
    .sort({ _id: -1 });




  if (ge.length == 1) {


    let test_name = data.name + "__tests"


    const acsSchema = new mongoose.Schema({}, { strict: false });
    const Acs = mongoose.models[test_name] || mongoose.model(test_name, acsSchema);



    const document = await Acs.findById(data.id);
    console.log(document);





    res.status(200).json({ doc: document, message: '', received: data });

  } else if (ge.length == 0) {
    res.status(404).json({ message: 'account not found', received: data });
  }
  else {
    res.status(500).send({ message: "Same Named Ac ,count:" + ge.length });
  }




});



app.post('/ac_test', async (req, res) => {
  const data = req.body;
  console.log('Received data:', data);
  let name = data.name

  let ge = await test_ac_collec.find({ name: name }, { _id: 0, ram: 0, device: 0, platform: 0, __v: 0 })
    .sort({ _id: -1 });




  if (ge.length == 1) {


    let test_name = data.name + "__tests"


    const acsSchema = new mongoose.Schema({}, { strict: false });
    const Acs = mongoose.models[test_name] || mongoose.model(test_name, acsSchema);



    const document = await Acs.findById(data.id);
    console.log(document.data);

    let dataWithoutAns = document.data.map(({ ans, ...rest }) => rest);

    console.log(dataWithoutAns);

    let document1 = { ...document, data: dataWithoutAns }





    console.log("-----------------------5555-----------------------------------------------------------------");



    if (document.published != undefined) {


      if (document.published == "yes") {
        res.status(200).json({ doc: document1, message: 'k', received: data });

      } else {
        res.status(404).json({ message: ' not published', received: data });
      }

    } else {
      res.status(404).json({ message: ' not published', received: data });
    }





  } else if (ge.length == 0) {
    res.status(404).json({ message: 'account not found', received: data });
  }
  else {
    res.status(500).send({ message: "Same Named Ac ,count:" + ge.length });
  }




});











app.post('/ac_publish', async (req, res) => {
  const data = req.body;
  console.log('Received data:', data);
  let name = data.name

  let ge = await test_ac_collec.find({ name: name }, { _id: 0, ram: 0, device: 0, platform: 0, __v: 0 })
    .sort({ _id: -1 });




  if (ge.length == 1) {


    let test_name = data.name + "__tests"


    const acsSchema = new mongoose.Schema({}, { strict: false });
    const Acs = mongoose.models[test_name] || mongoose.model(test_name, acsSchema);






    const result = await Acs.findByIdAndUpdate(
      data.id,
      { ["published"]: data.public },
      { new: true }
    );












    if (result.published == data.public) {
      res.status(200).json({ message: '', received: data });

    } else {
      res.status(500).send({ message: "Same Named Ac ,count:" + ge.length });
    }







  } else if (ge.length == 0) {
    res.status(404).json({ message: 'account not found', received: data });
  }
  else {
    res.status(500).send({ message: "Same Named Ac ,count:" + ge.length });
  }




});









app.post('/q_add', async (req, res) => {
  const data = req.body;
  console.log('Received data:', data);


  let test_name = data.edtech_name + "__tests"

  const acsSchema = new mongoose.Schema({}, { strict: false });
  const Acs = mongoose.models[test_name] || mongoose.model(test_name, acsSchema);

  let count = await Acs.countDocuments();
  console.log(`Total documents in ${test_name}: ${count}`);


  if (data.idd == undefined) {

 

    let a = [
      {
        "order": 1,
        "question": data.Q,
        "a": data.a,
        "b": data.b,
        "c": data.c,
        "d": data.d,
        ans: data.ans
      }
    ]


    const savedDocument = {
      data: a,
      book: "math1",
      chapter: "gg",
      cycle: "gg",
      start: "gg",
      end: "gg",
      neg_mark: "gg",
      per_mark: "gg",
      duration: "gg",
      titlee: `exam_${count + 1}`,
      date: moment().tz('Asia/dhaka').format('h:m a,D/M/YY'),
      ip: req.ip
    }
    const createdDoc = await Acs.create(savedDocument);




    console.log('New document ID:', createdDoc.id);

    res.status(200).json({ count_updated: 1, doc_idd: createdDoc.id, message: 'Data received successfully', received: data });
  }
  else {
    console.log(666666);
    console.log(data);


    try {
 

      const document = await Acs.findById(data.idd);
      console.log(document);


      let a = [...document.data,
      {
        "order": document.data.length + 1,
        "question": data.Q,
        "a": data.a,
        "b": data.b,
        "c": data.c,
        "d": data.d,
        ans: data.ans
      }
      ]



      const updatedDocument = await Acs.findByIdAndUpdate(
        data.idd,
        { $set: { data: a } },
        { new: true }

      );

      console.log('Updated document:', updatedDocument);
      res.status(200).json({ count_updated: updatedDocument.data.length, message: 'Data pushed successfully', received: data });
    } catch (error) {
      console.error('Error updating document:', error);
      res.status(500).send({ message: "Internal server error: " + error.message });
    }


  }


  // res.status(200).json({ message: 'Data received successfully', received: data });

});


app.post('/q_dlt', async (req, res) => {
  const data = req.body;
  console.log('Received data:', data.valuee);




  let test_name = data.edtech_name + "__tests"

  const acsSchema = new mongoose.Schema({}, { strict: false });
  const Acs = mongoose.models[test_name] || mongoose.model(test_name, acsSchema);
  const document = await Acs.findById(data.id);

  let orderToModify = data.order;
  let old_data = document.data;


  let dataa = old_data.map(itemu => {
    if (itemu.order == orderToModify) {
      return { ...itemu, dlt: "yes" };
    }
    return itemu;
  }
  );

  console.log(dataa);



 



  const updatedDocument = await Acs.findByIdAndUpdate(
    data.id,
    { $set: { data: dataa } },
    { new: true }

  );

  console.log('Updated document:', updatedDocument);
  res.status(200).json({ count_updated: updatedDocument.data.length, message: 'obj removed from arr successfully', received: data });
 


 




});











const handleOtp = async (req, res, next) => {
  try {
    const number = req.body.num;
    let test = /^\d{11}$/.test(number);

    if (!test) {
      return res.status(500).json({ error: 'Phone number is not valid' });
    }

    const now = moment().tz('Asia/Dhaka');

    // moment().tz('Asia/dhaka').format('h:m:s a,D/M/YY')

    // { year: now.year(), month: now.month() + 1, day: now.date(), hour: now.hour(), min: now.minute(), sec: now.second() }

    // Generate a random 4-digit OTP
    let otp = '';
    for (let i = 0; i < 4; i++) {
      otp += Math.floor(Math.random() * 10);
    }

    // Find the document by phone number
    const doc = await otp_center.findOne({ unum: number })
      .sort({ _id: -1 })
      .exec();
    console.log(doc);

    if (doc != null) {
      let arr;
      // Update the existing OTP

      if (doc.otps == undefined) {
        arr = [otp]
      } else {
        arr = [...doc.otps, otp]
      }

      let update_status = await update_doc_byid("otp__centers", doc.id, {
        otps: arr,
        last_otp_sent: moment().tz('Asia/dhaka').format('h:m:s a,D/M/YY'),

        last_otp_sent_obj: {
          year: now.year(), month: now.month() + 1, day: now.date(), hour: now.hour(),
          min: now.minute(),
          sec: now.second()
        }
      })
      console.log(update_status);
      if (update_status.found != "yes") { return res.status(500).json({ error: 'genareted otp failed to push in arr' }); }


    } else {
      // Create a new document for the OTP

      let count = await otp_center.countDocuments();

      const doc = await otp_center.create({
        unum: number,
        uname: `user_${5053 + count}`,
        otps: [otp],

        last_otp_sent: moment().tz('Asia/dhaka').format('h:m:s a,D/M/YY'),
        last_otp_sent_obj: { year: now.year(), month: now.month() + 1, day: now.date(), hour: now.hour(), min: now.minute(), sec: now.second() }
        ,

        ip: req.ip
      });


      console.log(doc);


    }

    req.otp = otp;

    next();
  } catch (error) {
    next(error);
  }
};



app.post('/gen_otp', handleOtp, async (req, res) => {
  const data = req.body;








  try {
    // const { number } = req.body;
    const otp = req.otp;

    // // Send OTP via API
    // const apiResponse = await axios.post('https://api.example.com/sendOtp', {
    //   number,
    //   otp
    // });

    // if (apiResponse.status === 200) {
    //   return res.status(200).json({ message: 'OTP sent successfully' });
    // } else {
    //   return res.status(500).json({ error: 'Failed to send OTP' });
    // }




   try {
      const res6 = await fetch(`http://bulksmsbd.net/api/smsapi?api_key=uk0KnxYS1HSuilRi7CfB&type=text&number=${data.num}&senderid=8809617613445&message=OTP ${otp}`); // Make the HTTP request
      let txt=JSON.parse(await res6.text())
      if (res6.status === 200) { // Check if status code is 200
     
        console.log(txt.response_code);
        if(txt.response_code==202){
          res.status(200).json({   received: data });
        }else{
          res.status(500).json({ error: 'Failed to send OTP' ,code:txt.response_code,txt:txt});
 
        }
        
      
    } else {
        console.log(`Received Status Code: ${res6.status}`); // Log other statuses
        res.status(500).json({ error: 'Failed to send OTP' ,code:res6.status});
    }

     
  } catch (err) {
      console.error(`Error: ${err.message}`); // Handles any errors
      res.status(500).json({ error: 'Failed to send OTP' ,err:err});
  }










    
    //  res.status(200).json({ otp: otp, received: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }

















})


app.post('/verify_otp', async (req, res) => {
  const data = req.body;

  const doc = await otp_center.findOne({ unum: data.num })
    .sort({ _id: -1 })
    .exec();
  console.log(doc);


  if (doc.otps.includes(data.otp)) {
    let update_status = await update_doc_byid("otp__centers", doc.id, { otps: [] })


    res.status(200).json({ doc: doc, received: data });
  } else {
    res.status(400).json({ error: 'Wrong OTP' });
  }



})







// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});




















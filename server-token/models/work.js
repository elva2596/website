const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// {
//   title_cn:"",
//   title_en:"",
//   create_time:"",
//   coverUrl:"",
//   works:[
//     {
//       name_cn:"",
//       name_en:"",
//       desc_cn:"",
//       desc_en:"",
//       width:"",
//       length:"",
//       height:"",
//       imageUrl:'',
//       count:"一"
//     },
//   ]
// }
const workSchema = new Schema({
    title_cn:String,
    title_en:String,
    create_time:String,
    coverUrl:String,
    works:[
      {
        name_cn:String,
        name_en:String,
        desc_cn:String,
        desc_en:String,
        size:String,
        imageUrl:String,
        width:String,
        length:String,
        height:String,
        count:String
      }
    ]
})
const WorkModel = mongoose.model("Work",workSchema);
module.exports = WorkModel

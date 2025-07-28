
// const db = require('./db');


// exports.createProduct = async(req, res) => 
// {
// const { name, id, image, desc, brand, price, qua, features, category, review} = req.body;

// if(!name || !id || !image || !desc || !brand || !price || !qua || !features || !category || !review){
//   return res.status(400).json({
//     error:"All Fields are required!"
//   })
// }

// try
// { 
// await db.query("INSERT INTO product (P_Id, P_Name, P_Image, P_Description, P_Brand, P_Quantity, P_Price, P_Category, P_Features, P_Reviews) values (?,?,?,?,?,?,?,?,?,?)",
// [id,name,image,desc,brand,qua,price,category,features,review], (err, result) => {
    
//     if(err) { console.log(err); }

//     else    { res.send("values Inserted"); }})
// }
// catch(err)
// { console.error(err);
//   res.status(500).send('Internal server error');}}



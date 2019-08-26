const express= require('express');
const router=express.Router();

const Item=require('../../models/item');

//@route    GET api/items
//@desc     GET all items
//@access   PUBLIC
router.get('/',(req,res)=>{
    Item.find()
        .sort({date:-1})
        .then(items=>res.json(items))
});

//@route    POST api/items
//@desc     create a item
//@access   PUBLIC
router.post('/',(req,res)=>{
    const newItem= new Item({
        name:req.body.name
    });
    newItem
        .save()
        .then(item=>{res.json(item)})
        .catch(err=>{console.log(err)});
});

//@route    DELETE api/item
//@desc     delete an item
//@access   PUBLIC
router.delete('/:id',(req,res)=>{
   Item
        .findById(req.params.id)
            .then(item=>item.remove().then(()=>res.json({success:true})))
            .catch(err=>res.status(404).json({success:false}));
})

module.exports=router;
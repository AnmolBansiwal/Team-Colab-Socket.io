const router= require("express").Router();

const MessageService= require("./message.service");
router.get("/messages/:chatId",
    async(req,res)=>{
try{
    const messages= await MessageService.getChatMessage(
    req.params.chatId        
    );
    res.json({
        success: true,
        data: messages
    });
}catch(err){
    res.status(500).josn({
        success: false,
        message: err.message
    });
}
}
);
module.exports= router;
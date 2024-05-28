const shortid=require("shortid");
const URL=require('../models/url');

async function handleGenerateNewShortUrl(req,res){
    const {url}=req.body;
    if(!url){
        return res.status(400).json({error:'url is required to shorten it'});
    }
      
    const result= await URL.findOne({redirectURL:url});
    if(result){
      return res.status(200).json({
        message:"this url already have a shorten key",
        key:result.shortId,
      });
    }
  const shortID=shortid();
  await URL.create({
    shortId:shortID,
    redirectURL:url,
    visitedHistory:[],

  })
  return res.json({id: shortID});
}



async function handleGetAnalytics(req,res){
      const shortId=req.params.shortId;
     const result= await URL.findOne({shortId});
     if(!result){
      return res.status(200).json({
        message:"this key doesnot associated with any of the url",
        key:shortId,
      });
     }
      return res.json ({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
      });
}

async function handleRedirectedUrl(req, res) {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true } // to return the updated document
    );

    if (!entry) {
      return res.status(404).send('URL not found');
    }

    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.error('Error handling redirection:', error);
    return res.status(500).send('Internal Server Error');
  }
}

module.exports={
    handleGenerateNewShortUrl,
    handleGetAnalytics,
    handleRedirectedUrl,
}
const express=require('express');
const router =express.Router();
const {handleGenerateNewShortUrl, handleGetAnalytics, handleRedirectedUrl}=require('../controller/url');

router.post("/",handleGenerateNewShortUrl);
router.get('/analytics/:shortId',handleGetAnalytics);
router.get('/:shortId',handleRedirectedUrl);


module.exports=router;


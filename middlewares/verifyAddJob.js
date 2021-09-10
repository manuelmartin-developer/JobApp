
isEmptyAddJob = (req, res, next) => {
    const title = req.body.title;
    const company = req.body.company;
    const location = req.body.location;
    const date = req.body.date;
    const image = req.body.img;
    const url = req.body.url;

    if(title ==='' || company === '' || location === '' || date === '' || image === '' || url === ''){
        res.sendStatus(400)
        return;
    }
    next();
};
const verifyAddJob = {
    isEmptyAddJob
  };
  module.exports = verifyAddJob;
exports.contact = async function(req, res){
    res.render("contact");
};
exports.work = async function(req, res) {
    res.render("work");
};
exports.about = async function(req, res) {
    res.render("about");
};
exports.index = async function(req, res) {
    res.render("index");
};
exports.post_contact = require('./smtp'); 
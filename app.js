const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// view engine setup

var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);


require("./passport");


app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


// passport session
app.use(session({
    secret : '9hpu17OIlENG19coSuVAPV8JbwPOMDHx',
    resave : false,
    saveUninitialized: true,
	store: new MySQLStore({
        host: "3.138.173.228",
        user: "shane",
        password: "Tkfkdgody!2",
        database: "blog_project",
    })
}));



app.use(passport.initialize()); //passport 초기화
app.use(passport.session()); // possport 사용 시 세션 활용
app.use((req, res, next) => {

    res.locals.loggedUser = req.user || null;
    next();
});


// login
var archiveRouter = require("./routes/archive");
const naver_login = require("./routes/naver_login");
const naver_callback = require("./routes/naver_callback");
const kakao_login = require("./routes/kakao_login");
const kakao_callback = require("./routes/kakao_callback");
const google_login = require("./routes/google_login");
const google_callback = require("./routes/google_callback");




app.get("/", function (req, res) {
    res.render("index");
});
app.get("/blog-details", function (req, res) {
    res.render("blog-details");
});
app.get("/elements", function (req, res) {
    res.render("elements");
});
app.get("/archive", function (req, res) {
    res.render("archive");
});
app.get("/blog_edit_db", function (req, res) {
    res.render("blog_edit_db");
});

app.get("/login", function (req, res) {
    res.render("login");
});
app.get("/sigh_up", function (req, res) {
    res.render("sigh_up");
});
app.get("/admin_page", function (req, res) {
    res.render("admin_page");
});
app.get("/community", function (req, res) {
    res.render("community");
});
app.get("/community_edit_db", function (req, res) {
    res.render("community_edit_db");
});
app.get("/community_details", function (req, res) {
    res.render("community_details");
});
//routes
//js
var category = require("./routes/category");
var contact = require("./routes/contact");
var detail = require("./routes/detail");
var insert = require("./routes/insert");
var content = require("./routes/content");
var blog_detail = require("./routes/blog_detail")
var blog_edit = require("./routes/blog_edit")
var archiveRouter = require("./routes/archive");
var sign_up = require("./routes/sign_up");
var page_count = require("./routes/page_count");
var comment_insert = require("./routes/comment_insert");
var comment = require("./routes/comment");
var update = require("./routes/update");
var research = require("./routes/research");
var heart = require("./routes/heart");
var top_list = require("./routes/top_list");
var logout = require("./routes/logout");
var admin_update = require("./routes/admin_update");
var admin_delete = require("./routes/admin_delete");
var admin = require("./routes/admin")
var community = require("./routes/community")
var community_insert = require("./routes/community_insert")
var community_list = require("./routes/community_list")
var community_blog = require("./routes/community_blog")
var community_content = require("./routes/community_content")
var community_heart = require("./routes/community_heart")
var community_update = require("./routes/community_update")
var community_edit = require("./routes/community_edit")
var community_delete = require("./routes/community_delete")

// ejs
app.use("/admin", admin);
app.use("/detail", detail)
app.use("/category", category);
app.use("/insert", insert);
app.use("/contact", contact);
app.use("/blog", blog_detail);
app.use("/content", content)
app.use("/blog_edit", blog_edit)
app.use("/archive", archiveRouter);
app.use("/sign_up", sign_up);
app.use("/comment_insert", comment_insert);
app.use("/page_count", page_count);
app.use("/comment", comment);
app.use("/update", update);
app.use("/research", research);
app.use("/heart", heart);
app.use("/top_list", top_list);
app.use("/logout", logout);
app.use("/community", community);
app.use("/community_insert", community_insert);
app.use("/community_list", community_list);
app.use("/community_blog", community_blog);
app.use("/community_content", community_content);
app.use("/community_heart", community_heart);
app.use("/community_update", community_update);
app.use("/community_edit", community_edit);
app.use("/community_delete", community_delete);

//login
app.use("/archive", archiveRouter);
app.use("/auth/naver", naver_login);
app.use("/auth/naver/callback", naver_callback);
app.use("/auth/kakao", kakao_login);
app.use("/auth/kakao/callback", kakao_callback);
app.use("/auth/google", google_login);
app.use("/auth/google/callback", google_callback);



app.use("/admin_update", admin_update);
app.use("/admin_delete", admin_delete);

app.listen("4000", () => {
    console.log("server start 4000");
});

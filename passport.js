const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require("./connection");
const pbkdf2Password = require("pbkdf2-password");
const hasher = pbkdf2Password();

// used to serialize the user for the session
passport.serializeUser(function (user, done) { // 로그인 성공 시 콜백 함수 호출
    done(null, user.user_id); // 접속한 사용자의 식별 값이, session store에 user.user_id로 저장
});

// used to deserialize the user
passport.deserializeUser(
    function (user_id, done) { // 로그인 성공한 사용자가 웹 페이지 이동할 때 마다 콜백 함수 호출
        // user_id 인자에는 serializeUser 메소드에서 보낸 user.user_id 값이 담김
        db.query(
            'SELECT * FROM member WHERE user_id=?',
            [user_id],
            function (err, results) {
                if (err) 
                    done(err);
                if (!results[0]) 
                    done(err);
                var user = results[0];
                console.log("user", user)
                done(null, user);
            }
        );
    }
);

passport.use(new LocalStrategy({ // Local 저장 방식을 통한 인증 구현
    usernameField: 'user_id',
    passwordField: 'password'
}, function (user_id, password, done) {
    db.query(
        'SELECT * FROM member WHERE user_id=?',
        [user_id],
        function (err, results) {
            if (err) 
                return done(err); // 입력한 유저정보가 mysql 내 존재하지 않는 경우 1
            if (!results[0]) 
                return done(err); // 입력한 유저정보가 mysql 내 존재하지 않는 경우 2
            var user = results[0]; // 적절한 유저정보가 존재하는 경우
            return hasher({
                password: password,
                salt: user.salt
            }, function (err, pass, salt, hash) {
                if (hash === user.password) { // 사용자의 비밀번호가 올바른지 확인
                    console.log('LocalStrategy', user);
                    done(null, user); // user 라는 값을 passport.serializeUser의 첫번째 인자로 전송
                } else 
                    done(null, false);
                }
            );
        }
    );
}));

passport.use(new NaverStrategy({
    clientID: "0Zkc8T10FZTjy2EUig1U",
    clientSecret: "1g_zd_1DQ3",
    callbackURL: "http://localhost:4000/auth/naver/callback"
}, function (accessToken, refreshToken, profile, done) {
    const {
        _json: {
            id,
            email
        }
    } = profile;
    const user = {
        naver_id: id,
        user_id: email
    };
    db.query(
        'SELECT * FROM member where user_id = ?',
        [email],
        function (err, result) {
            if (err) {
                return done(err);
            }
            if (!result[0]) {
                db.query('INSERT INTO member SET ?', user, function (err, result) {
                    if (err) {
                        return done(err);
                    } else {
                        console.log('NaverStrategy', user);
                        return done(null, user);
                    }
                });
            } else if (!result.naver_id) {
                db.query('UPDATE member SET naver_id = ? WHERE user_id = ?', [
                    id, email
                ], function (err, result) {
                    if (err) {
                        return done(err);
                    } else {
                        console.log('NaverStrategy', user);
                        return done(null, user);
                    }
                });
            } else {
                console.log('NaverStrategy', user);
                return done(null, user);
            }
        }
    );
}));

passport.use(new KakaoStrategy(
    {
        clientID: "41fa224f890e143dfeb946dcd9e7b5eb", clientSecret: "BtIPlTZ83qQwKeYwv2GolKPHdHhJt36g", // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
        callbackURL:"http://welcometoitworld.tk/auth/kakao/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        const {
            _json: {
                id,
                kakao_account: {
                    email_needs_agreement,
                    email
                }
            }
        } = profile;
        if (!email_needs_agreement) {
            const user = {
                kakao_id: id,
                user_id: email
            };
            db.query(
                'SELECT * FROM member where user_id = ?',
                [email],
                function (err, result) {
                    if (err) {
                        return done(err);
                    }
                    if (!result[0]) {
                        db.query('INSERT INTO member SET ?', user, function (err, result) {
                            if (err) {
                                return done(err);
                            } else {
                                console.log('KakaoStrategy', user);
                                return done(null, user);
                            }
                        });
                    } else if (!result.kakao_id) {
                        db.query('UPDATE member SET kakao_id = ? WHERE user_id = ?', [
                            id, email
                        ], function (err, result) {
                            if (err) {
                                return done(err);
                            } else {
                                console.log('KakaoStrategy', user);
                                return done(null, user);
                            }
                        });
                    } else {
                        console.log('KakaoStrategy', user);
                        return done(null, user);
                    }
                }
            );
        } else {
            const user = {
                kakao_id: id,
                user_id: "kakao_guest_" + id
            };
            db.query(
                'SELECT * FROM member where user_id = ?',
                [user.user_id],
                function (err, result) {
                    if (err) {
                        return done(err);
                    }
                    if (!result[0]) {
                        db.query('INSERT INTO member SET ?', user, function (err, result) {
                            if (err) {
                                return done(err);
                            } else {
                                console.log('KakaoStrategy', user);
                                return done(null, user);
                            }
                        });
                    } else {
                        console.log('KakaoStrategy', user);
                        return done(null, user);
                    }
                }
            );
        }
    }
));

passport.use(new GoogleStrategy(
    {
        clientID: "451626296477-qqsg15ipjp1mj8b3vnsbiikp26hjpjrm.apps.googleusercontent.com",
        clientSecret: "HlEHrcruwQcLKxNMDKbJ4ibm",
        callbackURL: "http://localhost:4000/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        const {
            _json: {
                sub,
                email
            }
        } = profile;
        const user = {
            google_id: sub,
            user_id: email
        };
        db.query(
            'SELECT * FROM member where user_id = ?',
            [email],
            function (err, result) {
                if (err) {
                    return done(err);
                }
                if (!result[0]) {
                    db.query('INSERT INTO member SET ?', user, function (err, result) {
                        if (err) {
                            return done(err);
                        } else {
                            console.log('GoogleStrategy', user);
                            return done(null, user);
                        }
                    });
                } else if (!result.naver_id) {
                    db.query('UPDATE member SET google_id = ? WHERE user_id = ?', [
                        sub, email
                    ], function (err, result) {
                        if (err) {
                            return done(err);
                        } else {
                            console.log('GoogleStrategy', user);
                            return done(null, user);
                        }
                    });
                } else {
                    console.log('GoogleStrategy', user);
                    return done(null, user);
                }
            }
        );
    }
));
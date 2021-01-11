var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors =require('cors')
let bodyParser = require('body-parser')

//require rountes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRouter = require('./routes/student');
var memberRouter = require('./routes/member');
var registerRouter = require('./routes/register');
var createJobRouter = require('./routes/createJob');
var getJobRouter = require('./routes/job');
var getJobDRouter = require('./routes/jobDetail');
// delete rounte
var deleteRouter = require('./routes/delete');
var deleteMemberRouter = require('./routes/deleteMember');
//
var openStageRouter = require('./routes/openStage');
var onStageRouter = require('./routes/onStage');
var loadStageRouter = require('./routes/loadStage');
var insertStageRouter = require('./routes/insertStage');
var loginRouter = require('./routes/login');
var memberRouter = require('./routes/member');
var closeStageRouter = require('./routes/closeStage');
var loadCloseRouter = require('./routes/loadClose');
var loadJobORouter = require('./routes/loadJobO');
var loadDptRouter = require('./routes/loadDpt');
var loadCompRouter = require('./routes/loadComp');


var checkerMemberRouter = require('./routes/checkerMember');
var updateMemberRouter = require('./routes/updateMember');

var getJobD1Router = require('./routes/getJob');
var getCarRouter = require('./routes/getCar');
var getInsRouter = require('./routes/getIns');
var getCusRouter = require('./routes/getCus');
var getDamRouter = require('./routes/getDam');


var checkerIdRouter = require('./routes/checkerId');
var chJobRouter = require('./routes/chJob');
var chCarRouter = require('./routes/chCar');
var chCustRouter = require('./routes/chCust');
var chInsRouter = require('./routes/chIns');
var chStageRouter = require('./routes/chStage');

//router store
var ProductsRouter = require('./routes/loadProduct');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  bodyParser.json({
    limit: '500mb',
  })
);
app.use(
  bodyParser.urlencoded({
    limit: '500mb',
    extended: true,
    parameterLimit: 100000000000000,
  })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/student',studentRouter)
app.use('/api/member',memberRouter)
app.use('/api/register',registerRouter)
app.use('/api/createJob',createJobRouter)
app.use('/api/getJob',getJobRouter)
app.use('/api/getJobDe',getJobDRouter)
app.use('/api/delete',deleteRouter)
app.use('/api/oStage',openStageRouter)
app.use('/api/onStage',onStageRouter)
app.use('/api/loadStage',loadStageRouter)
app.use('/api/insertStage',insertStageRouter)
app.use('/api/login',loginRouter)
app.use('/api/checkerMember',checkerMemberRouter)
app.use('/api/member',memberRouter)
app.use('/api/closeStage',closeStageRouter)
app.use('/api/loadJobO',loadJobORouter)
app.use('/api/loadClose',loadCloseRouter)
app.use('/api/loadDpt',loadDptRouter)
app.use('/api/loadComp',loadCompRouter)

app.use('/api/checkerId',checkerIdRouter)

app.use('/api/getJobD1',getJobD1Router)
app.use('/api/getCar',getCarRouter)
app.use('/api/getIns',getInsRouter)
app.use('/api/getCus',getCusRouter)
app.use('/api/getDam',getDamRouter)

app.use('/api/chJob',chJobRouter)
app.use('/api/chCar',chCarRouter)
app.use('/api/chCust',chCustRouter)
app.use('/api/chIns',chInsRouter)
app.use('/api/chStage',chStageRouter)

app.use('/api/deleteMember',deleteMemberRouter)
app.use('/api/updateMember',updateMemberRouter)


//store
app.use('/api/Products',ProductsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

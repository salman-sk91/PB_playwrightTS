'use strict';
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const data = require('./server');

var runStatus = 'Not running';
var app = data.app;


var controller = {

    runtest: function(req, res){
        let allParams = req.query.params;
        var counter =0;
        runStatus='Test Running';
        console.log('Actual RUN: npm run ')

        var result = spawn('npm run test' , {
            stdio: 'pipe',
            shell: true,
        });

        result.on('error',(code)=>{
            console.log(`child process exited with code ${code}`);
            runStatus='FAILED';
        });

        result.on('exit',(code)=>{
            console.log(`Exit: child process exited with code ${code}`);
            if(code===0){
                console.log('From runtest exit: code === 0')
                runStatus='DONE';
                console.log('Run status now: '+runStatus);
            }else{
                runStatus='FAILED';
                console.log('Run status now: '+runStatus);
            }
        });
        result.stdout.on('data',(data)=>{
            counter++;
            if(counter%100 ==0){
                console.log(counter);
            }
        });

        console.log(runStatus);
        res.status(200).send(runStatus);
    },

    getstatus: function(req,res){
        res.status(200).send(runStatus);
    }
};

module.exports = controller;

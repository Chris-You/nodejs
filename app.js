const mssql = require("mssql");


const sqlConfig = {
     password: 'dev_test',
     database: 'Mvc5',
     stream: false,
     options: {
       trustServerCertificate: true,
       enableArithAbort: true,
       encrypt: true
     },
     pool: {
       max: 1,
       min: 0,
     },
     port: 28007,
     user: 'dev_test',
     server: '211.206.227.140',
   }

const client = new mssql.ConnectionPool(sqlConfig)
let runInterval = null
//console.log(sql)

async function run () {
     const pool = await client.connect()
     const request = pool.request()
     console.time('query')
     const clientId = 12
     const startDate = '2018-01-01'
     const endDate = '2020-06-18'
     await request.input('clientId', mssql.Int, clientId)
       .input('startDate', mssql.DateTime, new Date(startDate))
       .input('endDate', mssql.DateTime, new Date(endDate))
       .query(`SELECT * from movies`)
     console.timeEnd('query')
     // console.log(result)
     return client.close()
   }
   
   run()
'use strict';

function kiosk (locName, minCust, maxCust, avgCupCust, avgBeanCust) {
  this.locName = locName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCupCust = avgCupCust;
  this.avgBeanCust = avgBeanCust;
  this.hrlyCust = [];
  this.hrlyCups = [];
  this.hrlyCupBean = [];
  this.hrlyBeanLbs = [];
  this.allBeanHrly = this.hrlyCupBean + this.hrlyBeanLbs;
  this.dailyLbs = 0;
};

kiosk.prototype.calculateHourlyCust = function() {
  for (var i = 0; i < hours.length; i++) {
    this.hrlyCust.push(Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust));
  }
};

kiosk.prototype.calculateHourlyCups = function() {
  for (var i = 0; i < hours.length; i++) {
    var cups = this.avgCupCust * this.hrlyCust[i];
    this.hrlyCups.push(cups);
    this.hrlyCupBean.push(cups / 20);
    this.dailyLbs += (cups / 20);
  }
};

kiosk.prototype.calculateHourlyBeansByLbs = function() {
  for (var i = 0; i < hours.length; i++) {
    var beans = this.avgBeanCust * this.hrlyCust[i];
    this.hrlyBeanLbs.push(beans);
    this.dailyLbs += beans;
  }
};

kiosk.prototype.render = function () {
  this.calculateHourlyCust();
  this.calculateHourlyCups();
  this.calculateHourlyBeansByLbs();

  var ulEl = document.createElement('ul');
  ulEl.appendChild(document.createTextNode(this.locName));
  var sectionEl = document.getElementById('kiosk-data').appendChild(ulEl);

  for (var i = 0; i < hours.length; i++) {
        var liEl = document.createElement('li');
        liEl.textContent = hours[i] + ": " + (this.hrlyCupBean[i] + this.hrlyBeanLbs[i]).toFixed(1) + ' lbs [' + this.hrlyCust[i] + ' customers, ' + this.hrlyCups[i].toFixed(1) + ' cups (' +this.hrlyCupBean[i].toFixed(1) + ' lbs), ' + this.hrlyBeanLbs[i].toFixed(1) + ' lbs to-go';
        ulEl.appendChild(liEl);
      }
      liEl = document.createElement('li')
      liEl.textContent = 'Total Daily Pounds at this location: ' + this.dailyLbs.toFixed(1);
      ulEl.appendChild(liEl);
}
var hours = ['6am', '7am', '8am', '9am','10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
var pikePlace = new kiosk ('Pike Place', 14, 55, 1.2, 3.7);
var capHill  = new kiosk ('Capitol Hill', 32, 48, 3.2, 0.4);
var seaLib = new kiosk ('Seattle Public Library', 49, 75, 2.6, 0.2);
var soLakeUnion = new kiosk ('South Lake Union', 35, 88, 1.3, 3.7);
var seaTac = new kiosk ('Sea-Tac Airport', 68, 124, 1.1, 2.7);
var internetSales = new kiosk ('Internet Sales', 3, 6, 0, 6.7);
var allKiosks = [pikePlace, capHill, seaLib, soLakeUnion, seaTac, internetSales];
var allKioskSales = 0;
for (var i = 0; i < hours.length; i++) {
  allKiosks[i].render();
  allKioskSales += allKiosks.dailyLbs;
}
var h1El = document.createElement('h1');
h1El.textContent = 'We are selling ' + allKioskSales.toFixed(1) + ' pounds of coffee every day.  That is a ' + (allKioskSales / 2000).toFixed(2) + ' tons of coffee everday.';
document.body.appendChild(h1El)






//'use strict';
//
//var hours = ['6am', '7am', '8am', '9am','10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
//
//var pikePlace = {
//  name: 'Pike Place',
//  minCust: 14,
//  maxCust: 55,
//  avgCupCust: 1.2,
//  avgBeanCust: 3.7,
//  hrlyCust: [],
//  hrlyCups: [],
//  hrlyCupBean: [],
//  hrlyBeanLbs:[],
//  allBeanHrly: this.hrlyCupBean + this.hrlyBeanLbs,
//  dailyLbs: 0,
//
//  hrlyCustomers: function() {
//    for (var i = 0; i < hours.length; i++) {
//      this.hrlyCust.push(Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust));
//    }
//  },
//
//  generateHrlyCups: function() {
//    for (var i = 0; i < hours.length; i++) {
//      var cups = this.avgCupCust * this.hrlyCust[i];
//      this.hrlyCups.push(cups);
//      this.hrlyCupBean.push(cups / 20);
//      this.dailyLbs += (cups / 20);
//    }
//  },
//
//  generateHrlyBeansByLbs: function() {
//    for (var i = 0; i < hours.length; i++) {
//      var beans = this.avgBeanCust * this.hrlyCust[i];
//      this.hrlyBeanLbs.push(beans);
//      this.dailyLbs += beans;
//    }
//  },
//
//  render: function() {
//    this.hrlyCustomers();
//    this.generateHrlyCups();
//    this.generateHrlyBeansByLbs();
//
//    var ulEl = document.createElement('ul');
//    ulEl.appendChild(document.createTextNode(this.name));
//    var sectionEl = document.getElementById('kiosk-data').appendChild(ulEl);
//
//    for (var i = 0; i < hours.length; i++) {
//      var liEl = document.createElement('li');
//      liEl.textContent = hours[i] + ": " + (this.hrlyCupBean[i] + this.hrlyBeanLbs[i]).toFixed(1) + ' lbs [' + this.hrlyCust[i] + ' customers, ' + this.hrlyCups[i].toFixed(1) + ' cups (' +this.hrlyCupBean[i].toFixed(1) + ' lbs), ' + this.hrlyBeanLbs[i].toFixed(1) + ' lbs to-go';
//      //liEl.textContent = hours[i] + ": " + (this.hourlyCupsBeans[i] + this.hourlyBeansByLb[i]).toFixed(1) + ' lbs [' + this.hourlyCust[i] + ' customers, ' + this.hourlyCups[i].toFixed(1) + ' cups (' + this.hourlyCupsBeans[i].toFixed(1) + ' lbs), ' + this.hourlyBeansByLb[i].toFixed(1) + ' lbs to-go]';
//      ulEl.appendChild(liEl);
//    }
//    liEl = document.createElement('li')
//    liEl.textContent = 'Total Daily Pounds at this location: ' + this.dailyLbs.toFixed(1);
//    ulEl.appendChild(liEl);
//  }
//}
//
//var capHill = {
//  name: 'Capitol Hill',
//  minCust: 31,
//  maxCust: 48,
//  avgCupCust: 3.2,
//  avgBeanCust: 0.4,
//  hrlyCust: [],
//  hrlyCups: [],
//  hrlyCupBean: [],
//  hrlyBeanLbs:[],
//  allBeanHrly: this.hrlyCupBean + this.hrlyBeanLbs,
//  dailyLbs: 0,
//
//  hrlyCustomers: function() {
//    for (var i = 0; i < hours.length; i++) {
//      this.hrlyCust.push(Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust));
//    }
//  },
//
//  generateHrlyCups: function() {
//    for (var i = 0; i < hours.length; i++) {
//      var cups = this.avgCupCust * this.hrlyCust[i];
//      this.hrlyCups.push(cups);
//      this.hrlyCupBean.push(cups / 20);
//      this.dailyLbs += (cups / 20);
//    }
//  },
//
//  generateHrlyBeansByLbs: function() {
//    for (var i = 0; i < hours.length; i++) {
//      var beans = this.avgBeanCust * this.hrlyCust[i];
//      this.hrlyBeanLbs.push(beans);
//      this.dailyLbs += beans;
//    }
//  },
//
//  render: function() {
//    this.hrlyCustomers();
//    this.generateHrlyCups();
//    this.generateHrlyBeansByLbs();
//
//    var ulEl = document.createElement('ul');
//    ulEl.appendChild(document.createTextNode(this.name));
//    var sectionEl = document.getElementById('kiosk-data').appendChild(ulEl);
//
//    for (var i = 0; i < hours.length; i++) {
//      var liEl = document.createElement('li');
//      liEl.textContent = hours[i] + ": " + (this.hrlyCupBean[i] + this.hrlyBeanLbs[i]).toFixed(1) + ' lbs [' + this.hrlyCust[i] + ' customers, ' + this.hrlyCups[i].toFixed(1) + ' cups (' +this.hrlyCupBean[i].toFixed(1) + ' lbs), ' + this.hrlyBeanLbs[i].toFixed(1) + ' lbs to-go';
//      ulEl.appendChild(liEl);
//    }
//    liEl = document.createElement('li')
//    liEl.textContent = 'Total Daily Pounds at this location: ' + this.dailyLbs.toFixed(1);
//    ulEl.appendChild(liEl);
//  }
//}
//
//var seaLib = {
//  name: 'Seattle Public Library',
//  minCust: 49,
//  maxCust: 75,
//  avgCupCust: 2.6,
//  avgBeanCust: 0.2,
//  hrlyCust: [],
//  hrlyCups: [],
//  hrlyCupBean: [],
//  hrlyBeanLbs:[],
//  allBeanHrly: this.hrlyCupBean + this.hrlyBeanLbs,
//  dailyLbs: 0,
//
//  hrlyCustomers: function() {
//    for (var i = 0; i < hours.length; i++) {
//      this.hrlyCust.push(Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust));
//    }
//  },
//
//  generateHrlyCups: function() {
//    for (var i = 0; i < hours.length; i++) {
//      var cups = this.avgCupCust * this.hrlyCust[i];
//      this.hrlyCups.push(cups);
//      this.hrlyCupBean.push(cups / 20);
//      this.dailyLbs += (cups / 20);
//    }
//  },
//
//  generateHrlyBeansByLbs: function() {
//    for (var i = 0; i < hours.length; i++) {
//      var beans = this.avgBeanCust * this.hrlyCust[i];
//      this.hrlyBeanLbs.push(beans);
//      this.dailyLbs += beans;
//    }
//  },
//
//  render: function() {
//    this.hrlyCustomers();
//    this.generateHrlyCups();
//    this.generateHrlyBeansByLbs();
//
//    var ulEl = document.createElement('ul');
//    ulEl.appendChild(document.createTextNode(this.name));
//    var sectionEl = document.getElementById('kiosk-data').appendChild(ulEl);
//
//    for (var i = 0; i < hours.length; i++) {
//      var liEl = document.createElement('li');
//      liEl.textContent = hours[i] + ": " + (this.hrlyCupBean[i] + this.hrlyBeanLbs[i]).toFixed(1) + ' lbs [' + this.hrlyCust[i] + ' customers, ' + this.hrlyCups[i].toFixed(1) + ' cups (' +this.hrlyCupBean[i].toFixed(1) + ' lbs), ' + this.hrlyBeanLbs[i].toFixed(1) + ' lbs to-go';
//      ulEl.appendChild(liEl);
//    }
//    liEl = document.createElement('li')
//    liEl.textContent = 'Total Daily Pounds at this location: ' + this.dailyLbs.toFixed(1);
//    ulEl.appendChild(liEl);
//  }
//}
//
//var soLakeUnion = {
//  name: 'South Lake Union',
//  minCust: 35,
//  maxCust: 88,
//  avgCupCust: 1.3,
//  avgBeanCust: 3.7,
//  hrlyCust: [],
//  hrlyCups: [],
//  hrlyCupBean: [],
//  hrlyBeanLbs:[],
//  allBeanHrly: this.hrlyCupBean + this.hrlyBeanLbs,
//  dailyLbs: 0,
//
//  hrlyCustomers: function() {
//    for (var i = 0; i < hours.length; i++) {
//      this.hrlyCust.push(Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust));
//    }
//  },
//
//  generateHrlyCups: function() {
//    for (var i = 0; i < hours.length; i++) {
//      var cups = this.avgCupCust * this.hrlyCust[i];
//      this.hrlyCups.push(cups);
//      this.hrlyCupBean.push(cups / 20);
//      this.dailyLbs += (cups / 20);
//    }
//  },
//
//  generateHrlyBeansByLbs: function() {
//    for (var i = 0; i < hours.length; i++) {
//      var beans = this.avgBeanCust * this.hrlyCust[i];
//      this.hrlyBeanLbs.push(beans);
//      this.dailyLbs += beans;
//    }
//  },
//
//  render: function() {
//    this.hrlyCustomers();
//    this.generateHrlyCups();
//    this.generateHrlyBeansByLbs();
//
//    var ulEl = document.createElement('ul');
//    ulEl.appendChild(document.createTextNode(this.name));
//    var sectionEl = document.getElementById('kiosk-data').appendChild(ulEl);
//
//    for (var i = 0; i < hours.length; i++) {
//      var liEl = document.createElement('li');
//      liEl.textContent = hours[i] + ": " + (this.hrlyCupBean[i] + this.hrlyBeanLbs[i]).toFixed(1) + ' lbs [' + this.hrlyCust[i] + ' customers, ' + this.hrlyCups[i].toFixed(1) + ' cups (' +this.hrlyCupBean[i].toFixed(1) + ' lbs), ' + this.hrlyBeanLbs[i].toFixed(1) + ' lbs to-go';
//      ulEl.appendChild(liEl);
//    }
//    liEl = document.createElement('li')
//    liEl.textContent = 'Total Daily Pounds at this location: ' + this.dailyLbs.toFixed(1);
//    ulEl.appendChild(liEl);
//  }
//}
//
//var seaTac = {
//  name: 'Sea-Tac International Airport',
//  minCust: 68,
//  maxCust: 124,
//  avgCupCust: 1.1,
//  avgBeanCust: 2.7,
//  hrlyCust: [],
//  hrlyCups: [],
//  hrlyCupBean: [],
//  hrlyBeanLbs:[],
//  allBeanHrly: this.hrlyCupBean + this.hrlyBeanLbs,
//  dailyLbs: 0,
//
//  hrlyCustomers: function() {
//    for (var i = 0; i < hours.length; i++) {
//      this.hrlyCust.push(Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust));
//    }
//  },
//
//  generateHrlyCups: function() {
//    for (var i = 0; i < hours.length; i++) {
//      var cups = this.avgCupCust * this.hrlyCust[i];
//      this.hrlyCups.push(cups);
//      this.hrlyCupBean.push(cups / 20);
//      this.dailyLbs += (cups / 20);
//    }
//  },
//
//  generateHrlyBeansByLbs: function() {
//    for (var i = 0; i < hours.length; i++) {
//      var beans = this.avgBeanCust * this.hrlyCust[i];
//      this.hrlyBeanLbs.push(beans);
//      this.dailyLbs += beans;
//    }
//  },
//
//  render: function() {
//    this.hrlyCustomers();
//    this.generateHrlyCups();
//    this.generateHrlyBeansByLbs();
//
//    var ulEl = document.createElement('ul');
//    ulEl.appendChild(document.createTextNode(this.name));
//    var sectionEl = document.getElementById('kiosk-data').appendChild(ulEl);
//
//    for (var i = 0; i < hours.length; i++) {
//      var liEl = document.createElement('li');
//      liEl.textContent = hours[i] + ": " + (this.hrlyCupBean[i] + this.hrlyBeanLbs[i]).toFixed(1) + ' lbs [' + this.hrlyCust[i] + ' customers, ' + this.hrlyCups[i].toFixed(1) + ' cups (' +this.hrlyCupBean[i].toFixed(1) + ' lbs), ' + this.hrlyBeanLbs[i].toFixed(1) + ' lbs to-go';
//      ulEl.appendChild(liEl);
//    }
//    liEl = document.createElement('li')
//    liEl.textContent = 'Total Daily Pounds at this location: ' + this.dailyLbs.toFixed(1);
//    ulEl.appendChild(liEl);
//  }
//}
//
//var internetSales = {
//  name: 'Sales For campfirecoffee.com',
//  minCust: 3,
//  maxCust: 6,
//  avgCupCust: 0,
//  avgBeanCust: 6.7,
//  hrlyCust: [],
//  hrlyCups: [],
//  hrlyCupBean: [],
//  hrlyBeanLbs:[],
//  allBeanHrly: this.hrlyCupBean + this.hrlyBeanLbs,
//  dailyLbs: 0,
//
//  hrlyCustomers: function() {
//    for (var i = 0; i < hours.length; i++) {
//      this.hrlyCust.push(Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust));
//    }
//  },
//
//  generateHrlyCups: function() {
//    for (var i = 0; i < hours.length; i++) {
//      var cups = this.avgCupCust * this.hrlyCust[i];
//      this.hrlyCups.push(cups);
//      this.hrlyCupBean.push(cups / 20);
//      this.dailyLbs += (cups / 20);
//    }
//  },
//
//  generateHrlyBeansByLbs: function() {
//    for (var i = 0; i < hours.length; i++) {
//      var beans = this.avgBeanCust * this.hrlyCust[i];
//      this.hrlyBeanLbs.push(beans);
//      this.dailyLbs += beans;
//    }
//  },
//
//  render: function() {
//    this.hrlyCustomers();
//    this.generateHrlyCups();
//    this.generateHrlyBeansByLbs();
//
//    var ulEl = document.createElement('ul');
//    ulEl.appendChild(document.createTextNode(this.name));
//    var sectionEl = document.getElementById('kiosk-data').appendChild(ulEl);
//
//    for (var i = 0; i < hours.length; i++) {
//      var liEl = document.createElement('li');
//      liEl.textContent = hours[i] + ": " + (this.hrlyCupBean[i] + this.hrlyBeanLbs[i]).toFixed(1) + ' lbs [' + this.hrlyCust[i] + ' customers, ' + this.hrlyCups[i].toFixed(1) + ' cups (' +this.hrlyCupBean[i].toFixed(1) + ' lbs), ' + this.hrlyBeanLbs[i].toFixed(1) + ' lbs to-go';
//      ulEl.appendChild(liEl);
//    }
//    liEl = document.createElement('li')
//    liEl.textContent = 'Total Daily Pounds at this location: ' + this.dailyLbs.toFixed(1);
//    ulEl.appendChild(liEl);
//  }
//}


//shows on the data on webpage
//var allKioskSales = 0;

//var kiosks = [pikePlace, capHill, seaLib, soLakeUnrion, internetSales];
//for (var i = 0; i < kiosks.length; i++) {
//  kiosks[i].render();
//  allKioskSales += kiosks[i].dailyLbs;
//}
//
//var h1El = document.createElement('h1');
//h1El.textContent = 'We are selling ' + allKioskSales.toFixed(1) + ' pounds of coffee every day.  That is a ' + (allKioskSales / 2000).toFixed(2) + ' tons of coffee everday.';
//document.body.appendChild(h1El)
//
//
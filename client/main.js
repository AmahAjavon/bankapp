'use strict';

$(function() {

  var depDataRef = new Firebase('https://bank-app.firebaseio.com/deposits');
  var withDataRef = new Firebase('https://bank-app.firebaseio.com/withdrawals');
  var balDataRef = new Firebase('https://bank-app.firebaseio.com/balances');
  var debtDataRef = new Firebase('https://bank-app.firebaseio.com/debts');
  var balance = 0;
  $('#deposits').click(function() {
    var amount = $('#amount').val();
    var date = new Date().toDateString();
    depDataRef.push({amount: amount, date: date});
    balance += parseInt(amount);
    balDataRef.update({balance: balance});
  });

  $('#withdrawals').click(function() {
    var amount = $('#amount').val();
    var date = new Date().toDateString();
    withDataRef.push({amount: amount, date: date});
    balance -= parseInt(amount);
    var debts = 0;
    if (balance < 0) {
      debts = -50;
      balance += debts;
      debtDataRef.push({debts: debts, date: date});
    }
    balDataRef.update({balance: balance});
  });

  balDataRef.on('value', function(data) {
     var balTask = data.val();
     console.log(balTask);
     $('#balance').html('Balance is $' + balTask.balance);
  })

  depDataRef.on('child_added', function(data) {
    var depositTask = data.val();
    display(depositTask.amount, depositTask.date, 'dep');
  });

  withDataRef.on('child_added', function(data) {
    var withdrawTask = data.val();
    display(withdrawTask.amount, withdrawTask.date, 'with');
  });

  debtDataRef.on('child_added', function(data) {
    var debtTask = data.val();
    display(debtTask.debts, debtTask.date, 'debts');
  });

  function display(amount, date, id) {
    var $td = $('<li>');
    $td.text('$' + amount + ' on: ' + date);
    $('#'+id).append($td);


  }
})

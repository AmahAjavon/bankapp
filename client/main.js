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
    $('#balance').html('Balance is $' + balance);
    balDataRef.update({balances: balance});

  });

  $('#withdrawals').click(function() {
    var amount = $('#amount').val();
    var date = new Date().toDateString();
    withDataRef.push({amount: amount, date: date});
    balance -= parseInt(amount);
    $('#balance').html('Balance is $' + balance);
    balDataRef.update({balances: balance});
    var debts = -50;
    if (balance < 0) {
      balance -= 50;
      var $debt = $('<li>');
      $debt.addClass('.debt');
      $debt.text('Fee: $' + debts + ' on: ' + date);
      $('#debts').append($debt);
      debtDataRef.push({debts: debts});
      debtDataRef.update({debts: debts});
    }
  });

  depDataRef.on('child_added', function(data) {
    var depositTask = data.val();
    displayDepTask(depositTask.amount, depositTask.date);
  });

  withDataRef.on('child_added', function(data) {
    var withdrawTask = data.val();
    displayWithTask(withdrawTask.amount, withdrawTask.date);

  });

  // balDataRef.on('child_added', function(data) {
  //   var balanceTask = data.val();
  //   displayBalTask(balanceTask.balance);
  //
  // });
  //
  // debtDataRef.on('child_added', function(data) {
  //   var debtTask = data.val();
  //   displayDebtTask(debtTask.debts, debtTask.date);
  //
  // });

  function displayDepTask(amount, date) {
    var $td = $('<li>');
    $td.addClass('.dep');
    $td.text('$' + amount + ' on: ' + date);
    $('#dep').append($td);
  }

  function displayWithTask(amount, date) {
    var $td2 = $('<li>');
    $td2.addClass('.with');
    $td2.text('$' + amount + ' on: ' + date);
    $('#wit').append($td2);

  }

  // function displayBalTask(balance) {
  //
  //
  // }
  //
  // function displayDebtTask(debts, date) {
  //
  //
  // }



})

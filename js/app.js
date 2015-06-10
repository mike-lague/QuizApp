$(document).ready(function() {
  
  $('#doit').click(function(event) {
    var limitstr = $("#newlimit").val();
    var limit = getFizzBuzzLimit(limitstr);
    if (limit) {
      printFizzBuzz(limit);
    } else {
      alert("'" + limitstr + "'" + " is not a good limit.\n" +
            "Please enter a positive decimal whole number.");
      $("#newlimit").val("");
    }
    
  });

});

function printFizzBuzz(limit) {
  // console.log("Called FizzBuzz");
  var output = "";
  for (i = 1; i <= limit; i++) {
    output += "<pre>" + fizzBuzz(i) + "<\pre>";
  }
  $('#solution').html(output);
}

function fizzBuzz(i) {
  
  var output = "";

  if (i % 3 == 0) {
    output += "fizz";
  }
  if (i % 5 == 0) {
    output += "buzz";
  }
  if (!output) {
    output += i;
  }
  
  return (output);
}

function getFizzBuzzLimit(lstr) {
  var n = parseInt(lstr, 10);
  if (n > 0 && lstr % 1 == 0) {
    return n;
  } else {
    return NaN;
  }
}

String.prototype.setCharAt = function(index, char) {
  return this.substr(0, index) + char + this.substr(index + 1);
}

function randomXToY(minVal, maxVal)
{
  var randVal = minVal + (Math.random() * (maxVal - minVal));
  return Math.round(randVal);
}

function maskString(str) {
  var strLen = str.length;
  var numToMask = Math.min(strLen * 3 / 5, strLen - 2);
  for (var i = 0; i < numToMask;) {
    var pos = randomXToY(1, strLen - 2);
    if (str.charAt(pos) != '*') {
      str = str.setCharAt(pos, '*');
      i++;
    }
  }
  return str;
}

function maskEmail(email) {
  var atIndex = email.indexOf('@');
  var namePart = email.substr(0, atIndex);
  var domainIndex = email.lastIndexOf('.');
  var providerPart = email.substr(atIndex + 1, domainIndex - atIndex - 1);
  return maskString(namePart) + '@' + maskString(providerPart) + email.substr(domainIndex);
}

(function (document, $) {
  var hatData = [];
  var restData = [];

  $.each(
    participants/*.sort(
      function(a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB) //sort string ascending
          return -1;
        if (nameA > nameB)
          return 1;
        return 0; //default return value (no sorting)
      }
    )*/,
    function (index, data) {
      var tableData = [
          data.name,
          maskEmail(data.email),
          data.generalSurvey,
          data.sessionSurvey
        ];
      if (!data.generalSurvey || data.sessionSurvey < 1) {
        restData.push(tableData);
      } else {
        hatData.push(tableData);
      }
    }
  );

  document.hatTable = $("#hat-table").DataTable({
    data: hatData
  });

  document.restTable = $("#rest-table").DataTable({
    data: restData
  });
}) (document, $);

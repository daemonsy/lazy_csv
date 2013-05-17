/*The MIT License (MIT)

Copyright (c) 2013 Damon Aw

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.*/

(function( $ ) {

  $.extend($.fn, {
    tableToCSV: function() {
      this.on("click", function(e) {
        target = $(e.currentTarget)
        table = $(target.data("table"));
        if(table.length > 0) {
          target.attr("href", readTable(table));
        }
      });
    }

  });

  function readTable(table) {
    results = [];
    rows = $(table).find("tr");
    for (var i = 0; i < rows.length; i++) {
      csv_row = [];
      rows.eq(i).find("td,th").each(function(index, element) {
        csv_row.push(parseTextForCSV(element.textContent || element.innerText));
      });
      results.push(csv_row.join(","));
    }
    return "data:text/csv;base64;charset=utf-8," + btoa(unescape(encodeURIComponent(results.join("\r\n"))));
  }

  function parseTextForCSV(text) {
    return "\"" + text.trim().replace(/"/g, '""').replace(/(\r\n|\n|\r)/gm,"") + "\""
  }


})( jQuery );
window.onload = function () {
    var selects = document.querySelectorAll("select");

    selects.forEach(function (select) {
      var options = Array.prototype.slice.call(
        select.querySelectorAll("option")
      );

      options.sort(function (a, b) {
        if (a.text > b.text) return 1;
        if (a.text < b.text) return -1;
        return 0;
      });

      select.innerHTML = "";
      options.forEach(function (option) {
        select.appendChild(option);
      });
    });
  };
  $("#input, #select1, #select2").on("input change", function () {
    var select1 = $("#select1").val();
    var select2 = $("#select2").val();
    if (select1 === select2) {
      if (this.id === "select1") {
        $("#select2").prop(
          "selectedIndex",
          $("#select2 option").length -
            $("#select1").prop("selectedIndex") -
            1
        );
      } else {
        $("#select1").prop(
          "selectedIndex",
          $("#select1 option").length -
            $("#select2").prop("selectedIndex") -
            1
        );
      }
    }

    Token = "8079|TnR8QjMvbIIjV60G5ob0fwbVtbuTniiV";
    select1 = $("#select1").val();
    select2 = $("#select2").val();

    if ($("#input").val() == "") {
      input = 1;
    } else {
      input = $("#input").val();
    }

    var url =
      "https://api.invertexto.com/v1/currency/" +
      select1 +
      "_" +
      select2 +
      "?token=" +
      Token;

    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      success: function (data) {
        var dados = data[select1 + "_" + select2];
        var price = dados.price;
        var rate = input / price;
        var select2Text = $("#select2 option:selected").text();

        $(".result").text(price + " " + select2Text);

        $(".rate").text(
          input + " " + select2 + " = " + rate.toFixed(8) + " " + select1
        );
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Erro: " + textStatus + ", " + errorThrown);
      },
    });
  });
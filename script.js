let information = {};
    let btn = document.getElementById('submit');
    btn.onclick = function (event) {
      event.preventDefault();

      information.sec_gmd_line = {};
      information.cross_ref = {};
      information.grantors = [];

      let sec_gmd_lineIds = ["comment", "lot", "block", "unit", "subdivision", "land_lot", "district"];
      let cross_refIds = ["instrument", "instrument_type", "url_text", "book_number", "page_number", "url"]
      let otherIds = ["county", "county_good_from", "date_filed", "grantor", "name_selected", "page", "query_made", "searched", "sec_gmd", , "url"];

      sec_gmd_lineIds.forEach((id) => {
        information["sec_gmd_line"][id] = document.getElementById(id).value;
      });
      cross_refIds.forEach((id) => {
        if (document.getElementById(id) == null) {
          information["cross_ref"][id] = ""
        } else {
          information["cross_ref"][id] = document.getElementById(id).value;
        }

      });
      otherIds.forEach((id) => {
        information[id] = document.getElementById(id).value;
      });

      let allGrantors = document.getElementById("grantorHolder").getElementsByTagName("li");

      for (let i = 0, len = allGrantors.length; i < len; i++) {
        let currGrantor = allGrantors[i].textContent.split("x")[0].trim();
        information.grantors.push(currGrantor);
        
      }

      console.log(information);



    };

    let addGrantor = document.getElementById("add_grantor");
    addGrantor.onclick = function (event) {

      event.preventDefault();

      let grantors = document.getElementById("grantorHolder");
      // Create a <li> node
      let newNode = document.createElement("li");
      let grantorId = document.getElementById("grantor").value;
      if (grantorId == "") {
        alert("Please input a grantor name");
        return;
      }
      newNode.setAttribute("id", grantorId);

      let text = document.createTextNode(grantorId);
      document.getElementById("grantor").value = "";
      newNode.appendChild(text);

      let removeBtn = document.createElement("a");
      let btnText = document.createTextNode("  x  ");
      removeBtn.appendChild(btnText);
      removeBtn.setAttribute("val", grantorId);
      removeBtn.setAttribute("class", "grantorRemover");

      newNode.appendChild(removeBtn);


      grantors.appendChild(newNode);
    }

    document.addEventListener("click", (event) => {
      // Make sure we are clicking a with text x
      const isClickable = event.target.nodeName === "A" && event.target.getAttribute("class") == "grantorRemover";
      if (isClickable) {
        let toRemove = event.target.getAttribute("val");
        document.getElementById(toRemove).remove();
      }
    });

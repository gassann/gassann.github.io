function calc() {
	var price1,price2,price3;
	var month,day;
	var plusprice = 0;
	var mtsix = 0;
	var atoa = 0;
	var holidayprice = 0;
	var plan;
	calcPlan();
	calcRank();
	calcIsFromApart();
	calcdoniti();
    var total = price1 + price2　+ mtsix + atoa + holidayprice;
    totalShow();

    function calcPlan() {
		var plans = document.getElementsByName("plan");
	    for(var i = 0;i < plans.length;i++){
	        var tmp = plans[i];
	        if (tmp.checked){
	            plan =tmp.value;
	            if(plan == "A"){
	            	price1 = 1500
	            }else if(plan == "B"){
	            	price1 = 3000
	            }else if(plan == "C"){
	            	price1 = 4500
	            }else{
	            	
	            }
	        }
	    }
	}

	function calcRank() {
		var rankprice = 0;
		var tmp = document.form1.frank.selectedIndex;
		var frank = tmp + 1;
		var tmp2 = document.form1.torank.selectedIndex;
		var torank = tmp2 + 1;

		oversix();

		if (plan == "A") {
			rankprice = 300;
		}else if(plan == "B" || plan == "C"){
			rankprice = 500;
		}else{
			
		}
		checkMonth();
		price2 = (frank + torank)*rankprice;

		function oversix() {
			if (frank >= 6 || torank >= 6) {
				mtsix += 500;
			}
		}
		function checkMonth() {
			var tmp = document.getElementById("demo001").value;
			month = tmp.substr(5,2);
			if (month == "03" || month == "04") {
				if (plan == "A") {
					rankprice = 500;
				}else if(plan == "B"){
					rankprice = 800;
				}else{
					//Cのときの料金は？
				}
			}
		}

	}

	function calcIsFromApart() {
		var tmps = document.getElementsByName("route");
	    for(var i = 0;i < tmps.length;i++){
	        var tmp = tmps[i];
	        if (tmp.checked){
	            if (tmp.value == "aa") {
	            	atoa += 500;
	            }
	        }
	    }
	}

	function calcdoniti() {
		var tmp = document.getElementById("demo001").value;
		var nen = tmp.substr(0,4);
		var tuki = tmp.substr(5,2);
		var niti  = tmp.substr(8,2);
		var userdate = new Date(nen,tuki-1,niti);
		var wday = userdate.getDay();
		if (wday == 0 || wday == 6) {
			if (!(month == "03" || month == "04")) {
				if (plan =="A") {
					holidayprice += 500;
				}else if (plan == "B" || plan == "C") {
					holidayprice += 1000;
				}
			}
		}
	}

	function totalShow() {
		document.getElementById("kingaku").textContent = null;
		var titles = ["基本料金","階数料金","合計"];
		var prices = [price1,price2,total];
		if (mtsix > 0) {
			titles.splice(titles.length-1,0,"6階以上");
			prices.splice(prices.length-1,0,mtsix);
		}else if (atoa > 0) {
			titles.splice(titles.length-1,0,"アパートからアパート");
			prices.splice(prices.length-1,0,atoa);
		}else if (holidayprice > 0) {
			titles.splice(titles.length-1,0,"土日料金");
			prices.splice(prices.length-1,0,holidayprice);
		}
		for (var i = 0; i < titles.length; i++) {
			var tr = document.createElement('tr');
		    var th = document.createElement('th');
		    var td = document.createElement('td');
		    var text = document.createTextNode(titles[i]);
	    	var text2 = document.createTextNode(prices[i] + "円");
	    	document.getElementById("kingaku").appendChild(tr).appendChild(th).appendChild(text);
	    	document.getElementById("kingaku").appendChild(tr).appendChild(td).appendChild(text2);
		}
	}

}

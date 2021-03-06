var url = "http://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsByKeywords";
    url += "&SERVICE-VERSION=1.0.0";
    url += "&SECURITY-APPNAME=DonovanL-Personal-PRD-c5d74fc8f-6fb03d7d";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=NV";
    url += "&callback=_cb_findItemsByKeywords";
    url += "&REST-PAYLOAD";
    // This is the keywords input that we will want to put the watson info into
    url += "&keywords=(hammock,wine)";
    url += "&paginationInput.entriesPerPage=5";

// Parse the response and build an HTML table to display search results
	function _cb_findItemsByKeywords(root) {

		var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
		var html = [];
		html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
		  for (var i = 0; i < items.length; ++i) {
		    var item     = items[i];
		    var title    = item.title;
		    var pic      = item.galleryURL;
		    var viewitem = item.viewItemURL;
			    if (null != title && null != viewitem) {
			      html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' +
			      '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td></tr>');
			    }
		  }
		html.push('</tbody></table>');
		document.getElementById("results").innerHTML = html.join("");
	}


s = document.createElement('script');
s.src = url;
document.body.appendChild(s);

_cb_findItemsByKeywords();

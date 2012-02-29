function colaCreateTooltip() {
//	<div style="height:60px; max-width:200px; color:#000; background:#FFF; padding:10px; -moz-border-radius:5px;-webkit-border-radius:5px; -webkit-box-shadow:2px 2px rgba(1,1,1,0.4); -moz-box-shadow:2px 2px rgba(1,1,1,0.4); text-align:left; overflow:hidden;">
//	  <img style="max-width:50px; float:left;" src="http://www.syndetics.com/index.aspx?isbn=1565922824/LC.GIF&client=claplib&type=xw12&upc=&oclc=&" />
//	  <div style="font-size:12px;display:block;padding-bottom:0.5em;margin-left:60px;">
//	    <h3><a name="url" href="http://catalog.colapl.org/uhtbin/cgisirsi/x/0/0/5?search_type=search&searchdata1=1565922824&library=ALL&sort_by=PBYRM">Reserve Book Now</a></h3>
//	  </div>
//	</div>
	
    var colaTooltip = jQuery('<div id="cola-tooltip" style="height:60px; max-width:200px; color:#000; background:#FFF; padding:10px; -moz-border-radius:5px;-webkit-border-radius:5px; -webkit-box-shadow:2px 2px rgba(1,1,1,0.4); -moz-box-shadow:2px 2px rgba(1,1,1,0.4); text-align:left; overflow:hidden; position: absolute; z-index: 1000; display:none;"><div>');
    var imgDiv = jQuery('<img style="max-width:50px; float:left;" src="" />');
    colaTooltip.append(imgDiv)
    var tooltipHeader = jQuery('<div style="font-size:12px;display:block;padding-bottom:0.5em;margin-left:60px;"><h3><a name="url" href="" target="_blank">Reserve Book Now</a></h3></div>');
    colaTooltip.append(tooltipHeader)

    colaTooltip.mouseout(function(ev) {
    	// the mouseout event seems to be semi-unstable embedded
    	//colaTooltip.hide();
    });
    
    jQuery('body').append(colaTooltip);
};

// add a mouseover to each of the amazon links
function colaEventHandlers() {
	var anchors = document.links;
	

	for (var i= 0; i < anchors.length; i++) {
		// check each of the links for anchor text that has a 
		// valid ISBN number (i.e. is a book) 
		//TODO use bn.com and other book store links
		//TODO create better ISBN regex (with 9 or 10 digits, dashes, etc)
		//TODO make sure the ISBN is normalized into a 10 digit colapub ISBN  
		var matched = anchors[i].href.match(/amazon\.com.*(\d{10})/)
		if (matched != null && matched.length == 2) {
			var isbn = matched[1];
			// add the isbn to the anchor
			jQuery.data(anchors[i],"isbn", isbn)
			
			jQuery(anchors[i]).mouseover(function(ev) {
				jQuery(anchors[i]).css('opacity','0.2');
				// since the mouseout handlers are so wonky in jquery 1.2 check the offset before re-showing the div
				if (jQuery("#cola-tooltip").css('display') == 'none' || 
				   (Math.abs(parseInt(jQuery('#cola-tooltip').css('top'))-ev.pageY) > 40) ||
				   (Math.abs(parseInt(jQuery('#cola-tooltip').css('left'))-ev.pageX) > 100)) {
					jQuery('#cola-tooltip').css({'top':ev.pageY-10,'left':ev.pageX-5}).show();
				}
				colaFillTooltip(jQuery.data(this,"isbn"));
		    }).mouseout(function(ev) {
		    	jQuery(anchors[i]).css("opacity",'1.0');
		    });
			
		}
	}
}

function colaFillTooltip(isbn) {
	//TODO use image webservice
	// image http://www.syndetics.com/index.aspx?client=claplib&type=xw12&upc=&oclc=&isbn=1565922824/LC.GIF
	//TODO:
	// use isbndb for better flavor text (e.g. title, desc, etc.)
	jQuery("#cola-tooltip img").attr("src","http://catalog.colapl.org/WebCat_Images/English/Other/MiscD/LOGO.jpg");
	var colaURL = "http://catalog.colapl.org/uhtbin/cgisirsi/x/0/0/5?search_type=search&library=ALL&searchdata1="+isbn;
	jQuery("#cola-tooltip a").attr('href', colaURL)
}


colaCreateTooltip();
colaEventHandlers();


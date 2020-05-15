
Array.prototype.slice.call(document.querySelectorAll('.s-result-item')).map((itemNode) => {
	img = itemNode.getElementsByTagName('img')[0];  if(!img) return;
	name = img.alt; image = img.src;
	offscreens = itemNode.getElementsByClassName('a-offscreen');
	selling = offscreens[0] ? offscreens[0].innerText.toString().replace(/[^0-9.]/g,'') : 0;
	price = offscreens[1] ? offscreens[1].innerText.toString().replace(/[^0-9.]/g,'') : (selling || 0);
	exportText = `${name}\t \t${price}\t${selling}\t40\t${image}`;
	return exportText;
}).join("\n")


Array.prototype.slice.call(document.querySelectorAll('.octopus-pc-item-v3')).map((itemNode) => {
	let {title,image,price,strikePrice} = JSON.parse(itemNode.getElementsByClassName('a-declarative')[0].dataset.octopusQuickLook);
	myprice = (strikePrice||0).toString().replace(/[^0-9.]/g,'');
	selling = (price || 0).toString().replace(/[^0-9.]/g,'');
	exportText = `${title}\t \t${myprice}\t${selling}\t40\t${image}`;
	return exportText;
}).join("\n")

Array.prototype.slice.call(document.querySelectorAll('.s-result-item')).map((itemNode) => {
	img = itemNode.getElementsByTagName('img')[0]; if(!img) return;
	name = img.alt; image = img.src;  if(!img) return;
	selling = itemNode.getElementsByClassName('s-price')[0] ? itemNode.getElementsByClassName('s-price')[0].innerText : 0;
	selling = (selling || 0).toString().replace(/[^0-9.]/g,'');
	price = itemNode.getElementsByClassName('a-text-strike')[0] ? itemNode.getElementsByClassName('a-text-strike')[0].innerText : 0;
	price = (price||0).toString().replace(/[^0-9.]/g,'');
	exportText = `${name}\t \t${price}\t${selling}\t40\t${image}`;
	return exportText;
}).join("\n")